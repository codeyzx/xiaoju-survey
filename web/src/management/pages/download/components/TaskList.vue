<template>
  <div v-loading="loading" class="list-wrapper">
    <el-table v-if="total" ref="multipleListTable" class="list-table" :data="dataList" empty-text="暂无数据" row-key="_id"
      header-row-class-name="tableview-header" row-class-name="tableview-row" cell-class-name="tableview-cell"
      style="width: 100%" v-loading="loading">
      <el-table-column v-for="field in fieldList" :key="field.key" :prop="field.key" :label="field.title"
        :width="field.width" :class-name="field.key" :formatter="field.formatter">
      </el-table-column>
      <el-table-column :label="t('common.operation')" width="200">
        <template v-slot="{ row }">
          <span v-if="row?.status === 'succeed'" class="text-btn download-btn" @click="handleDownload(row)">
            {{ t('common.download') }}
          </span>
          <span class="text-btn delete-btn" @click="openDeleteDialog(row)"> {{ t('common.delete') }} </span>
        </template>
      </el-table-column>
    </el-table>
    <div v-else>
      <EmptyIndex :data="emptyData" />
    </div>
    <div class="list-pagination" v-if="total">
      <el-pagination background layout="prev, pager, next" :total="total" size="small" :page-size="pageSize"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { get, map } from 'lodash-es'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import EmptyIndex from '@/management/components/EmptyIndex.vue'
import { noDownloadTaskConfig } from '@/management/config/listConfig'

import { deleteDownloadTask, getDownloadTaskList } from '@/management/api/download'
import { CODE_MAP } from '@/management/api/base'

const { t } = useI18n()

const loading = ref(false)
const pageSize = ref(10)
const total = ref(0)
const dataList: Array<any> = reactive([])

const emptyData = computed(() => ({
  ...noDownloadTaskConfig,
  title: t(noDownloadTaskConfig.title),
  desc: t(noDownloadTaskConfig.desc)
}))

onMounted(() => {
  getList({ pageIndex: 1 })
})
const getList = async ({ pageIndex }: { pageIndex: number }) => {
  if (!pageIndex) {
    pageIndex = 1
  }
  const params = {
    pageSize: pageSize.value,
    pageIndex
  }

  const res: Record<string, any> = await getDownloadTaskList(params)
  if (res.code === CODE_MAP.SUCCESS) {
    total.value = res.data.total
    const list = res.data.list as any
    dataList.splice(0, dataList.length, ...list)
  }
  loading.value = false
}

const statusTextMap: Record<string, string> = {
  waiting: t('common.waiting'),
  computing: t('common.computing'),
  succeed: t('common.completed'),
  failed: t('common.exportFailed')
}

let currentDelRow: Record<string, any> = {}
// 下载文件
const handleDownload = async (row: any) => {
  if (row.url) {
    window.open(row.url)
  } else {
    ElMessageBox.alert(t('common.fileNotExist'))
  }
}
// 删除文件
const openDeleteDialog = async (row: any) => {
  try {
    await ElMessageBox.confirm(t('common.confirmDelete'), t('common.promptTitle'), {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    })
    currentDelRow = row
    confirmDelete()
  } catch (error) {
    console.log('取消删除')
  }
}

// 确认删除文件
const confirmDelete = async () => {
  try {
    const res: Record<string, any> = await deleteDownloadTask(currentDelRow.taskId)
    if (res.code !== CODE_MAP.SUCCESS) {
      ElMessage.error(res.errmsg)
    } else {
      ElMessage.success('删除成功')
      await getList({ pageIndex: 1 })
    }
  } catch (error) {
    ElMessage.error('删除失败，请刷新重试')
  }
}

const fields = ['filename', 'fileSize', 'createdAt', 'status']

const fieldList = computed(() => {
  return map(fields, (f) => {
    return get(downloadListConfig, f)
  })
})

const downloadListConfig = {
  filename: {
    title: t('common.fileName'),
    key: 'filename',
    width: 340,
    tip: true
  },
  fileSize: {
    title: t('common.estimatedSize'),
    key: 'fileSize',
    width: 140
  },
  createdAt: {
    title: t('common.downloadTime'),
    key: 'createdAt',
    width: 240
  },
  status: {
    title: t('common.status'),
    key: 'status',
    formatter(row: Record<string, any>, column: Record<string, any>) {
      return statusTextMap[get(row, column.rawColumnKey)]
    }
  }
}

const handleCurrentChange = (val: number) => {
  getList({ pageIndex: val })
}
</script>

<style lang="scss" scoped>
.question-list-root {
  height: 100%;
  background-color: #f6f7f9;

  .list-wrapper {
    width: 90%;
    min-width: 1080px;
    padding: 10px 20px;
    background: #fff;
    margin: 0 auto;

    .list-table {
      .cell {
        text-align: center;
      }

      .text-btn {
        font-size: 14px;
        cursor: pointer;
        margin-left: 20px;

        &:first-child {
          margin-left: 0;
        }
      }

      .download-btn {
        color: $primary-color;
      }

      .delete-btn {
        color: red;
      }
    }

    .small-text {
      color: red;
    }

    .list-pagination {
      margin-top: 20px;

      :deep(.el-pagination) {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
