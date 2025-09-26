<template>
  <div class="tableview-root">
    <div class="filter-wrap">
      <h2>{{ $t('surveyList.recycleBin') }}</h2>
      <div class="search">
        <TextSearch :placeholder="$t('surveyForm.enterSurveyTitle')" :value="searchVal" @search="onSearchText" />
      </div>
    </div>
    <div class="list-wrapper" v-if="total">
      <el-table v-if="total" ref="multipleListTable" class="list-table" :data="dataList"
        :empty-text="$t('common.noData')" row-key="_id" header-row-class-name="tableview-header"
        row-class-name="tableview-row" cell-class-name="tableview-cell" style="width: 100%" v-loading="loading"
        @row-click="onRowClick">
        <el-table-column column-key="space" width="20" />

        <el-table-column v-for="field in fieldList" :key="field.key" :label="field.title" :column-key="field.key"
          :width="field.width" :min-width="field.width || field.minWidth" class-name="link">
          <template #default="scope">
            <template v-if="field.comp">
              <component :is="currentComponent(field.comp)" type="table" :value="unref(scope.row)" />
            </template>
            <template v-else>
              <span class="cell-span">{{ formatField(field.key, scope.row[field.key]) }}</span>
            </template>
          </template>
        </el-table-column>

        <el-table-column :label="$t('surveyList.actions')" :width="230" class-name="table-options" fixed="right">
          <template #default="scope">
            <ToolBar :data="scope.row" type="list" :tools="getToolConfig" :tool-width="50" @click="handleClick" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="list-pagination" v-if="total">
      <el-pagination background layout="prev, pager, next" :total="total" v-model:current-page="currentPage"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <div v-else>
      <EmptyIndex :data="emptyData" />
    </div>

    <ModifyDialog :type="modifyType" :visible="showModify" :question-info="questionInfo" :group-all-list="groupAllList"
      :menu-type="menuType" @on-close-codify="onCloseModify" />
    <CooperModify :modifyId="cooperId" :visible="cooperModify" @on-close-codify="onCooperClose" />
  </div>
</template>

<script setup>
import { ref, computed, unref } from 'vue'
import { useRouter } from 'vue-router'
import { get, map } from 'lodash-es'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import moment from 'moment'

import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'

import EmptyIndex from '@/management/components/EmptyIndex.vue'
import CooperModify from '@/management/components/CooperModify/ModifyDialog.vue'
import { CODE_MAP } from '@/management/api/base'
import { QOP_MAP } from '@/management/utils/constant.ts'
import { deleteSurvey, pausingSurvey, recoverSurvey, completeDeleteSurvey } from '@/management/api/survey'
import { useWorkSpaceStore } from '@/management/stores/workSpace'
import { useSurveyListStore } from '@/management/stores/surveyList'
import ModifyDialog from './ModifyDialog.vue'
import TagModule from './TagModule.vue'
import StateModule from './StateModule.vue'
import ToolBar from './ToolBar.vue'
import TextSearch from './TextSearch.vue'

import {
  recycleBinFieldConfig,
  noListDataConfig,
  noSearchDataConfig
} from '@/management/config/listConfig'

const surveyListStore = useSurveyListStore()
const workSpaceStore = useWorkSpaceStore()
const { workSpaceId, groupAllList, menuType } = storeToRefs(workSpaceStore)
const router = useRouter()
const { t, locale } = useI18n()
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['refresh'])
const fields = ['type', 'title', 'remark', 'state', 'createdAt', 'updatedAt', 'deletedAt', 'owner']
const showModify = ref(false)
const modifyType = ref('')
const questionInfo = ref({})
const currentPage = ref(1)
const { searchVal, buttonValueMap } = storeToRefs(surveyListStore)

const currentComponent = computed(() => {
  return (componentName) => {
    switch (componentName) {
      case 'TagModule':
        return TagModule
      case 'StateModule':
        return StateModule
      default:
        return null
    }
  }
})

const fieldList = computed(() => {
  // Access locale to ensure reactivity on language change
  locale.value // This ensures the computed reacts to locale changes
  return map(fields, (f) => {
    const config = get(recycleBinFieldConfig, f, null)
    if (config) {
      return {
        ...config,
        title: t(config.title)
      }
    }
    return null
  }).filter(field => field !== null)
})

const emptyData = computed(() => {
  // Access locale to ensure reactivity on language change
  locale.value // This ensures the computed reacts to locale changes
  const config = searchVal.value ? noSearchDataConfig : noListDataConfig
  return {
    ...config,
    title: t(config.title),
    desc: t(config.desc)
  }
})
const data = computed(() => {
  return props.data
})
const total = computed(() => {
  return props.total
})
const dataList = computed(() => {
  return data.value.map((item) => {
    return {
      ...item,
      'curStatus.date': item.curStatus ? item.curStatus.date : '',
      'subStatus.date': item.subStatus ? item.subStatus.date : ''
    }
  })
})

const formatField = (key, value) => {
  if (key === 'deletedAt' && value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }
  return value
}

const order = computed(() => {
  const formatOrder = Object.entries(buttonValueMap.value)
    .filter(([, effectValue]) => effectValue)
    .reduce((prev, item) => {
      const [effectKey, effectValue] = item
      prev.push({ field: effectKey, value: effectValue })
      return prev
    }, [])
  return JSON.stringify(formatOrder)
})

const onRefresh = async () => {
  let params = {
    curPage: currentPage.value,
    order: order.value
  }
  if (workSpaceId.value) {
    params.workspaceId = workSpaceId.value
  }
  emit('refresh', params)
}

const getToolConfig = computed(() => {
  // Access locale to ensure reactivity on language change
  locale.value // This ensures the computed reacts to locale changes
  let funcList = []
  funcList.push({
    key: 'recover',
    label: t('surveyList.recover')
  },
    {
      key: 'complete_delete',
      label: t('surveyList.completeDelete'),
      width: 70,
      color: 'red'
    })
  const order = ['recover', 'complete_delete']
  const result = funcList.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key))

  return result
})
const handleClick = (key, data) => {
  switch (key) {
    case 'recover':
      onRecover(data)
      return
    case 'complete_delete':
      onCompleteDelete(data)
      return
    case QOP_MAP.EDIT:
      onModify(data, QOP_MAP.EDIT)
      return
    case QOP_MAP.COPY:
      onModify(data, QOP_MAP.COPY)
      return
    case 'analysis':
      router.push({
        name: 'analysisPage',
        params: {
          id: data._id
        }
      })
      return
    case 'release':
      router.push({
        name: 'publish',
        params: {
          id: data._id
        }
      })
      return
    case 'delete':
      onDelete(data)
      return
    case 'cooper':
      onCooper(data)
      return
    case 'pausing':
      onPausing(data)
      return
    default:
      return
  }
}
const onDelete = async (row) => {
  try {
    await ElMessageBox.confirm(t('common.confirmDelete'), t('common.promptTitle'), {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    })
  } catch (error) {
    return
  }

  const res = await deleteSurvey(row._id)
  if (res.code === CODE_MAP.SUCCESS) {
    ElMessage.success(t('surveyList.deleteSuccess'))
    onRefresh()
    workSpaceStore.getGroupList()
    workSpaceStore.getSpaceList()
  } else {
    ElMessage.error(res.errmsg || t('surveyList.deleteFailed'))
  }
}

const onRecover = async (row) => {
  const res = await recoverSurvey(row._id)
  if (res.code === CODE_MAP.SUCCESS) {
    ElMessage.success(t('surveyList.recoverSuccess'))
    onRefresh()
    workSpaceStore.getGroupList()
    workSpaceStore.getSpaceList()
    workSpaceStore.getRecycleBinCount()
  } else {
    ElMessage.error(res.errmsg || t('surveyList.recoverFailed'))
  }
}

const onCompleteDelete = async (row) => {
  try {
    await ElMessageBox.confirm(t('surveyList.confirmCompleteDelete'), t('common.warning'), {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    })
  } catch (error) {
    return
  }

  const res = await completeDeleteSurvey(row._id)
  if (res.code === CODE_MAP.SUCCESS) {
    ElMessage.success(t('surveyList.deleteSuccess'))
    onRefresh()
    workSpaceStore.getGroupList()
    workSpaceStore.getSpaceList()
    workSpaceStore.getRecycleBinCount()
  } else {
    ElMessage.error(res.errmsg || t('surveyList.deleteFailed'))
  }
}

const onPausing = async (row) => {
  try {
    await ElMessageBox.confirm(t('surveyList.confirmPause'), t('common.warning'), {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    })
  } catch (error) {
    console.log(t('surveyList.cancelPause'))
    return
  }
  const res = await pausingSurvey(row._id)
  if (res.code === CODE_MAP.SUCCESS) {
    ElMessage.success(t('surveyList.pauseSuccess'))
    onRefresh()
  } else {
    ElMessage.error(res.errmsg || t('surveyList.pauseFailed'))
  }
}
const handleCurrentChange = (current) => {
  currentPage.value = current
  onRefresh()
}
const onModify = (data, type = QOP_MAP.EDIT) => {
  showModify.value = true
  modifyType.value = type
  questionInfo.value = data
}
const onCloseModify = (type) => {
  showModify.value = false
  questionInfo.value = {}
  if (type === 'update') {
    onRefresh()
    workSpaceStore.getGroupList()
    workSpaceStore.getSpaceList()
  }
}
const onRowClick = async () => {

  try {
    await ElMessageBox.alert(t('surveyList.surveyDeleted'), t('common.info'), {
      confirmButtonText: t('surveyList.backToList'),
      type: 'warning'
    })
  } catch (error) {
    return
  }
}
const onSearchText = (e) => {
  searchVal.value = e
  currentPage.value = 1
  onRefresh()
}

const cooperModify = ref(false)
const cooperId = ref('')
const onCooper = async (row) => {
  cooperId.value = row._id
  cooperModify.value = true
}
const onCooperClose = () => {
  cooperModify.value = false
}
const resetCurrentPage = () => {
  currentPage.value = 1
  onRefresh()
}

defineExpose({
  resetCurrentPage
})
</script>

<style lang="scss" scoped>
.tableview-root {
  .filter-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .select {
      display: flex;
    }

    .search {
      display: flex;
    }
  }

  .list-wrapper {
    padding: 10px 20px;
    background: #fff;

    .list-table {
      min-height: 620px;
    }
  }

  .list-pagination {
    margin-top: 20px;

    :deep(.el-pagination) {
      display: flex;
      justify-content: flex-end;
    }
  }

  :deep(.el-table__header) {
    .tableview-header .el-table__cell {
      .cell {
        height: 24px;
        color: #4a4c5b;
        font-size: 14px;
      }
    }
  }

  :deep(.tableview-row) {
    .tableview-cell {
      padding: 5px 0;

      &.link {
        cursor: pointer;
      }

      .cell .cell-span {
        font-size: 14px;
      }
    }
  }
}

.el-select-dropdown__wrap {
  background: #eee;
}

.el-select-dropdown__item.hover {
  background: #fff;
}
</style>
