<template>
  <el-table :data="channelList" style="width: 100%">
    <el-table-column prop="_id" :label="t('publish.channelId')" width="230" />
    <el-table-column prop="name" :label="t('publish.channelName')" width="180">
      <template #default="scope">
        <div class="channel_name">
          <i :class="['iconfont channel_icon', CHANNEL_TYPE_ICON[scope.row.type as CHANNEL_TYPE]]"></i>
          <span>{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="status" :label="t('publish.status')" width="150">
      <template #default="scope">
        <el-tag :type="scope.row.status === 'recycling' ? 'success' : 'danger'">{{ getStatusText(scope.row.status as
          CHANNEL_STATUS) }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="count" :label="t('publish.collectionCount')" />
    <el-table-column prop="createdAt" :label="t('publish.createdDate')" width="180" />
    <el-table-column prop="currentUse" :label="t('publish.creator')" width="180" />
    <el-table-column prop="updatedAt" :label="t('publish.updatedDate')" width="180">
      <template #default="scope">
        {{ moment(scope.row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}

      </template>
    </el-table-column>
    <el-table-column :label="t('publish.actions')" :width="320" class-name="table-options">
      <template #default="scope">
        <el-button type="primary" text :icon="Edit" @click="() => handleRename(scope.row)">{{ t('publish.rename')
        }}</el-button>
        <el-button type="primary" text v-if="scope.row.status === 'recycling'"
          @click="() => handleClose(scope.row._id)">
          <i class="iconfont icon-icon_guanbi"></i>{{ t('publish.close') }}
        </el-button>
        <el-button type="primary" text v-else @click="() => handleStart(scope.row._id)">
          <i class="iconfont icon-icon_qiyong"></i>{{ t('publish.enable') }}
        </el-button>
        <el-button type="danger" text :icon="Delete" @click="() => handleDelete(scope.row._id)">{{ t('publish.delete')
        }}</el-button>
      </template>

    </el-table-column>
  </el-table>
  <div class="pagination-container">
    <el-pagination layout="prev, pager, next" :total="channelTotal" @current-change="handleCurrentChange" />
  </div>
  <ChannelModify :visible="channelModifyVisible" :channel="curChannel" @confirm="handleRenameConfirm"
    @close="handleRanameClose" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import moment from 'moment'
import { Delete, Edit } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

import { CHANNEL_TYPE_ICON, CHANNEL_TYPE, CHANNEL_STATUS } from '@/management/enums/channel'
import { useChannelStore } from '@/management/stores/channel'
import { useEditStore } from '@/management/stores/edit'

import ChannelModify from './ChannelModify.vue'

const { t } = useI18n()

const channelStore = useChannelStore()
const editStore = useEditStore()

const { channelList, channelTotal } = storeToRefs(channelStore)
const { surveyId } = storeToRefs(editStore)

// Create translated status text mapping
const getStatusText = (status: CHANNEL_STATUS) => {
  switch (status) {
    case CHANNEL_STATUS.RECYCLING:
      return t('publish.collecting')
    case CHANNEL_STATUS.PAUSE:
      return t('publish.paused')
    default:
      return status
  }
}

const handleCurrentChange = (current: number) => {
  channelStore.getChannelList({
    surveyId: surveyId.value,
    curPage: current
  })
}
const handleDelete = (channelId: string) => {
  ElMessageBox.confirm(t('publish.confirmDeleteChannel'), t('publish.tip'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(() => {
    channelStore.deleteChannel({
      channelId
    })
  }).catch(() => {

  })
}
const channelModifyVisible = ref(false)
const curChannelId = ref('')
const curChannel = ref({})

const handleRename = (row: any) => {
  const channelId = row._id
  curChannelId.value = channelId
  curChannel.value = row
  channelModifyVisible.value = true
}
const handleRenameConfirm = (name: string) => {
  channelStore.updateChannel({
    channelId: curChannelId.value,
    name
  })
  channelModifyVisible.value = false
  curChannelId.value = ''
}
const handleRanameClose = () => {
  channelModifyVisible.value = false
  curChannelId.value = ''
}
const handleClose = (channelId: string) => {
  ElMessageBox.confirm(t('publish.confirmCloseChannel'), t('publish.confirmCloseTitle'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(() => {
    channelStore.changeChannelStatus({
      channelId,
      status: CHANNEL_STATUS.PAUSE
    })
  }).catch(() => {

  })
}
const handleStart = async (channelId: string) => {
  await channelStore.changeChannelStatus({
    channelId,
    status: CHANNEL_STATUS.RECYCLING
  })
  ElMessage.success(t('publish.distributionEnabled'))

}
</script>
<style lang="scss" scoped>
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.channel_name {
  display: flex;
  align-items: center;

  .channel_icon {
    font-size: 20px;
    margin-right: 8px;
    color: #92949D;
  }
}
</style>
