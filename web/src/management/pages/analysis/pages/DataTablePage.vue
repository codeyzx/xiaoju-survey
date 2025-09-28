<template>
  <div class="data-table-page">
    <template v-if="tableData.total">
      <div class="menus">
        <el-button type="primary" :loading="isDownloading" @click="onDownload">{{ t('analysis.exportAllData')
        }}</el-button>
        <el-switch class="desensitize-switch" :model-value="isShowOriginData"
          :active-text="t('analysis.showOriginalData')" @input="onIsShowOriginChange">
        </el-switch>
      </div>
    </template>

    <template v-if="tableData.total">
      <DataTable :main-table-loading :table-data />
      <el-pagination background layout="prev, pager, next" popper-class="analysis-pagination" :total="tableData.total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </template>
    <div v-else>
      <EmptyIndex :data="noDataConfig" />
    </div>

    <el-dialog v-model="downloadDialogVisible" :title="t('analysis.exportConfirm')" width="500" style="padding: 40px">
      <el-form :model="downloadForm" label-width="100px" label-position="left">
        <el-form-item :label="t('analysis.exportContent')">
          <el-radio-group v-model="downloadForm.isMasked">
            <el-radio :value="true">{{ t('analysis.maskedData') }}</el-radio>
            <el-radio :value="false">{{ t('analysis.originalData') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="download-tips">
          <div>{{ t('analysis.exportNote') }}</div>
          <div>
            <p>{{ t('analysis.maskedDataTip') }}</p>
            <p>{{ t('analysis.originalDataTip') }}</p>
          </div>
        </div>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="downloadDialogVisible = false">{{ t('analysis.cancel') }}</el-button>
          <el-button type="primary" @click="confirmDownload()">{{ t('analysis.confirm') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'
import EmptyIndex from '@/management/components/EmptyIndex.vue'
import { getRecycleList } from '@/management/api/analysis'
import DataTable from '../components/DataTable.vue'
import { createDownloadTask, getDownloadTask } from '@/management/api/download'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const noDataConfig = computed(() => ({
  title: t('analysis.noDataTitle'),
  desc: t('analysis.noDataDesc'),
  img: '/imgs/icons/analysis-empty.webp'
}))

const dataTableState = reactive({
  mainTableLoading: false,
  tableData: {
    total: 0,
    listHead: [],
    listBody: []
  },
  currentPage: 1,
  isShowOriginData: false,
  tmpIsShowOriginData: false,
  isDownloading: false,
  downloadDialogVisible: false,
  downloadForm: {
    isMasked: true
  }
})

const { mainTableLoading, tableData, isShowOriginData, downloadDialogVisible, isDownloading } =
  toRefs(dataTableState)
const downloadForm = dataTableState.downloadForm

const route = useRoute()

// Make headerTranslations reactive to language changes
const headerTranslations = computed(() => ({
  '姓名': t('analysis.name'),
  '提交时间': t('analysis.submissionTime'), 
  '答题耗时（秒）': t('analysis.responseTime')
}))

const formatHead = (listHead) => {
  const head = []
  const translations = headerTranslations.value

  listHead.forEach((headItem) => {
    const translatedTitle = translations[headItem.title] || headItem.title
    
    head.push({
      field: headItem.field,
      title: translatedTitle
    })

    if (headItem.othersCode?.length) {
      headItem.othersCode.forEach((item) => {
        head.push({
          field: item.code,
          title: `${translatedTitle}-${item.option}`
        })
      })
    }
  })

  return head
}

const onIsShowOriginChange = async (data) => {
  if (dataTableState.mainTableLoading) {
    return
  }
  dataTableState.tmpIsShowOriginData = data
  await init()
  dataTableState.isShowOriginData = data
}

const handleCurrentChange = async (page) => {
  if (dataTableState.mainTableLoading) {
    return
  }
  dataTableState.currentPage = page
  await init()
}

const init = async () => {
  if (!route.params.id) {
    ElMessage.error(t('analysis.noSurveyParams'))
    return
  }
  dataTableState.mainTableLoading = true
  try {
    const res = await getRecycleList({
      page: dataTableState.currentPage,
      surveyId: route.params.id,
      isMasked: !dataTableState.tmpIsShowOriginData // 发起请求的时候，isShowOriginData还没改变，暂存了一个字段
    })

    if (res.code === 200) {
      const listHead = formatHead(res.data.listHead)
      dataTableState.tableData = { ...res.data, listHead }
      dataTableState.mainTableLoading = false
    }
  } catch (error) {
    ElMessage.error(t('analysis.queryDataFailed'))
  }
}
onMounted(() => {
  init()
})

// Watch for language changes and re-format table headers
watch(locale, () => {
  if (dataTableState.tableData.listHead && dataTableState.tableData.listHead.length > 0) {
    // Re-fetch and format data when language changes
    init()
  }
})
const onDownload = async () => {
  dataTableState.downloadDialogVisible = true
}

const confirmDownload = async () => {
  if (isDownloading.value) {
    return
  }
  try {
    isDownloading.value = true
    const createRes = await createDownloadTask({
      surveyId: route.params.id,
      isMasked: downloadForm.isMasked
    })
    dataTableState.downloadDialogVisible = false
    if (createRes.code !== 200) {
      ElMessage.error(t('analysis.exportFailed'))
    }
    ElMessage.success(t('analysis.exportProcessing'))
    try {
      const taskInfo = await checkIsTaskFinished(createRes.data.taskId)
      if (taskInfo.url) {
        window.open(taskInfo.url)
        ElMessage.success(t('analysis.exportSuccess'))
      }
    } catch (error) {
      ElMessage.error(t('analysis.exportFailed'))
    }
  } catch (error) {
    ElMessage.error(t('analysis.exportFailed'))
  } finally {
    isDownloading.value = false
  }
}

const checkIsTaskFinished = (taskId) => {
  return new Promise((resolve, reject) => {
    const run = () => {
      getDownloadTask(taskId).then((res) => {
        if (res.code === 200 && res.data) {
          const status = res.data.status
          if (status === 'new' || status === 'computing') {
            setTimeout(() => {
              run()
            }, 5000)
          } else {
            resolve(res.data)
          }
        } else {
          reject('导出失败')
        }
      })
    }
    run()
  })
}
</script>

<style lang="scss" scoped>
.data-table-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.download-tips {
  display: flex;
  color: #ec4e29;
}

.menus {
  margin-bottom: 20px;
}

:deep(.el-pagination) {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.data-list {
  margin-bottom: 20px;
}

.desensitize-switch {
  float: right;
}
</style>
