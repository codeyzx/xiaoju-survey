<template>
  <div class="separate-item">
    <div class="separate-item-title">
      <el-popover
        placement="top"
        width="400"
        trigger="hover"
        :disabled="!titlePoppverShow"
        :content="translateQuestionTitle(StatisticsData.title)"
      >
        <template #reference>
          <p ref="titleRef" class="text" v-html="translateQuestionTitle(StatisticsData.title)"></p>
        </template>
      </el-popover>
      <p v-if="questionTypeDesc" class="type">{{ questionTypeDesc }}</p>
    </div>
    <div class="separate-item-content">
      <div class="chart-wrapper">
        <div ref="chartRef" class="chart"></div>
        <div v-if="chartTypeList.length > 1" class="chart-type-list">
          <el-segmented v-model="chartType" :options="chartTypeList" size="small">
            <template #default="{ item }">
              <i class="iconfont" :class="`icon-${item}`"></i>
            </template>
          </el-segmented>
        </div>
      </div>
      <div class="table-wrapper">
        <data-table :table-data :table-min-height />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed, watch, onMounted, onUnmounted, ref } from 'vue'
import { cloneDeep as _cloneDeep } from 'lodash-es'
import {
  summaryType,
  summaryItemConfig
} from '@/management/config/analysisConfig'
import useCharts from '@/management/hooks/useCharts'
import useStatisticsItemChart from '@/management/hooks/useStatisticsItemChart'
import { cleanRichText } from '@/common/xss'
import { menuItems } from '@/management/config/questionMenuConfig'
import DataTable from './DataTable.vue'
import useResizeObserver from '@/management/hooks/useResizeObserver'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 翻译选项文本的辅助函数
const translateOptionText = (text) => {
  // 匹配类似 "选项1", "选项2" 等模式
  const match = text.match(/^选项(\d+)$/)
  if (match) {
    const optionNumber = match[1]
    const optionKey = `analysis.option${optionNumber}`
    return t(optionKey)
  }
  return cleanRichText(text)
}

// 翻译问题标题的辅助函数
const translateQuestionTitle = (title) => {
  // 匹配常见的默认标题模式
  if (title === '标题S' || title === '标题' || title.startsWith('标题')) {
    return t('common.title', 'Title')
  }
  if (title === '单选题' || title === '单选题按钮') {
    return t('questionTypes.singleChoice', '单选题')
  }
  if (title === '多选题' || title === '多选题按钮') {
    return t('questionTypes.multipleChoice', '多选题')
  }
  if (title === '问题') {
    return t('common.title', 'Question')
  }
  // 匹配 "标题" + 数字 的模式
  const titleWithNumber = title.match(/^标题(\d+)$/)
  if (titleWithNumber) {
    return t('common.title') + ' ' + titleWithNumber[1]
  }
  return cleanRichText(title)
}

const separateItemListHead = computed(() => [
  {
    title: t('analysis.option'),
    field: 'text'
  },
  {
    title: t('analysis.count'),
    field: 'count'
  },
  {
    title: t('analysis.percentage'),
    field: 'percent'
  }
])

const props = defineProps({
  StatisticsData: {
    type: Object,
    required: true
  }
})

const questionType = computed(() => {
  return props?.StatisticsData?.type
})

const questionTypeDesc = computed(() => {
  const originalTitle = menuItems?.[questionType.value]?.title || ''
  
  // 翻译问题类型描述
  const translations = {
    '单行输入框': t('questionTypes.textInput', '单行输入框'),
    '多行输入框': t('questionTypes.textareaInput', '多行输入框'),
    '单项选择': t('questionTypes.singleChoice', '单项选择'),
    '多项选择': t('questionTypes.multipleChoice', '多项选择'),
    '图片单选': t('questionTypes.imageSingleChoice', '图片单选'),
    '图片多选': t('questionTypes.imageMultipleChoice', '图片多选'),
    '下拉选择': t('questionTypes.dropdown', '下拉选择'),
    '级联选择': t('questionTypes.cascader', '级联选择'),
    '是否题': t('questionTypes.binaryChoice', '是否题'),
    'NPS评分': t('questionTypes.npsScore', 'NPS评分'),
    '评分题': t('questionTypes.rating', '评分题'),
    '投票题': t('questionTypes.vote', '投票题')
  }
  
  return translations[originalTitle] || originalTitle
})

// 表格数据
const separateItemListBody = computed(() => {
  try {
    const aggregation = _cloneDeep(props?.StatisticsData?.data?.aggregation)
    const submitionCount = props?.StatisticsData?.data?.submitionCount
    const summaryList = summaryItemConfig[questionType.value]
    // 增加聚合信息
    if (summaryList?.length) {
      summaryList.forEach((item, index) => {
        const { type, text, field, max, min } = item
        if (text && field && type === summaryType.between) {
          aggregation.push({
            id: `summary_${index}`,
            text,
            count: aggregation.reduce((n, item) => {
              if (item[field] >= min && item[field] <= max) {
                return n + item.count
              }
              return n
            }, 0)
          })
        }
      })
    }

    return (
      aggregation?.map((item) => {
        const { id, count, text } = item
        const percent = submitionCount ? `${((count / submitionCount) * 100).toFixed(1)}%` : '0%'
        return {
          id,
          count,
          text: translateOptionText(text),
          percent
        }
      }) || []
    )
  } catch (e) {
    console.log(e)
    return []
  }
})

const separateItemState = reactive({
  tableData: {
    total: 0,
    listHead: separateItemListHead,
    listBody: separateItemListBody
  },
  tableMinHeight: '0px'
})

const { tableData, tableMinHeight } = toRefs(separateItemState)

const titlePoppverShow = ref(false)
const titleRef = ref(null)

const titleResize = () => {
  if (titleRef.value?.scrollWidth > titleRef.value?.offsetWidth) {
    titlePoppverShow.value = true
  } else {
    titlePoppverShow.value = false
  }
}

const { chartRef, chartTypeList, chartType, chartData } = useStatisticsItemChart({
  questionType,
  data: props?.StatisticsData?.data,
  translateOptionText
})

onMounted(() => {
  // 需要获取图表dom，所以得在mounted中执行
  const translations = {
    submissionCount: t('analysis.submissionCount')
  }
  
  const { changeType, resize: chartResize } = useCharts(
    chartRef.value,
    chartType.value,
    chartData.value,
    translations
  )

  const { destroy } = useResizeObserver(chartRef.value, () => {
    chartResize()
    titleResize()
  })

  // 图型切换
  watch(chartType, () => {
    changeType(chartType.value, chartData.value)
  })

  // 监听语言变化，重新计算图表数据
  watch(() => t('analysis.submissionCount'), () => {
    const translations = {
      submissionCount: t('analysis.submissionCount')
    }
    changeType(chartType.value, chartData.value)
  })

  // 销毁resizeObserver
  onUnmounted(destroy)
})
</script>

<style lang="scss" scoped>
.separate-item {
  padding: 32px 12px;
  border-bottom: 1px solid #efefef;

  &:nth-last-of-type(1) {
    border-bottom: none;
  }

  &-title {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    margin-bottom: 24px;
    display: flex;
    align-items: center;

    .text {
      max-width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .type {
      font-size: 12px;
      margin-left: 8px;
      color: white;
      background-color: var(--primary-color);
      border-radius: 7px 3px;
      padding: 2px 6px;
    }
  }

  &-content {
    display: flex;
    justify-content: space-between;
    gap: 50px;

    .chart-wrapper {
      position: relative;
      flex: auto;
      width: 50%;
      min-width: 300px;
      height: 320px;
      max-width: 1000px;
      box-shadow: 0 2px 8px -2px rgba(136, 136, 157, 0.2);
      border-radius: 2px;
      padding: 24px;

      .chart-type-list {
        position: absolute;
        left: 0;
        top: 0;

        .iconfont {
          font-size: 12px;
        }
      }

      .chart {
        width: 100%;
        height: 100%;
      }
    }

    .table-wrapper {
      flex: auto;
      width: 50%;
      min-width: 300px;
      max-width: 1000px;
    }
  }

  @media screen and (min-width: 1660px) {
    &-content {
      gap: 80px;

      .chart-wrapper {
        height: 400px;
      }
    }
  }
}
</style>
