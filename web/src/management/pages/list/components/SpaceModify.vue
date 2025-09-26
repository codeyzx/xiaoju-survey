<template>
  <el-dialog class="base-dialog-root" :model-value="visible" width="40%" :title="formTitle" @close="onClose">
    <el-form class="base-form-root" ref="ruleForm" :model="formModel" :rules="rules" label-position="top" size="large"
      @submit.prevent :disabled="formDisabled">
      <el-form-item :label="$t('surveyList.spaceName')" prop="name">
        <el-input v-model="formModel.name" />
      </el-form-item>
      <el-form-item :label="$t('surveyList.spaceDescriptionLabel')">
        <el-input v-model="formModel.description" />
      </el-form-item>
      <el-form-item :label="$t('surveyList.addMembers')" prop="members">
        <MemberSelect :members="formModel.members" @select="handleMemberSelect" @change="handleMembersChange" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onClose" v-if="!formDisabled">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" class="save-btn" @click="onConfirm" v-if="!formDisabled">
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, shallowRef, onMounted } from 'vue'
import { pick as _pick } from 'lodash-es'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'
import { useI18n } from 'vue-i18n'

import { QOP_MAP } from '@/management/utils/constant'
import { type IMember, type IWorkspace, UserRole } from '@/management/utils/workSpace'
import { useWorkSpaceStore } from '@/management/stores/workSpace'

import MemberSelect from '@/management/components/CooperModify/MemberSelect.vue'

const workSpaceStore = useWorkSpaceStore()
const emit = defineEmits(['on-close-codify', 'onFocus', 'change', 'blur', 'updateData'])
const props = defineProps({
  type: String,
  width: String,
  visible: Boolean
})
const ruleForm = shallowRef<any>(null)
const { t: $t } = useI18n()

const formTitle = computed(() => {
  return props.type === QOP_MAP.ADD ? $t('surveyList.createSpaceTitle') : $t('surveyList.manageSpaceTitle')
})
const formModel = ref<Required<IWorkspace>>({
  _id: '',
  name: '',
  description: '',
  members: [] as IMember[]
})
const rules = {
  name: [{ required: true, message: $t('surveyList.enterSpaceName'), trigger: 'blur' }],
  members: [
    {
      trigger: 'change',
      validator: (rule: any, value: IMember[], callback: Function) => {
        if (props.type === QOP_MAP.EDIT) {
          if (value.filter((item: IMember) => item.role === UserRole.Admin).length === 0) {
            callback($t('surveyList.setAdmin'))
          }
        }
        callback()
      }
    }
  ]
}
const spaceDetail = computed(() => {
  return workSpaceStore.spaceDetail
})
const formDisabled = computed(() => {
  return spaceDetail.value?._id
    ? workSpaceStore.workSpaceList.find((item: any) => item._id === spaceDetail.value?._id)
      ?.currentUserRole !== UserRole.Admin
    : false
})

onMounted(() => {
  if (props.type === QOP_MAP.EDIT) {
    formModel.value = _pick(spaceDetail.value as any, ['_id', 'name', 'description', 'members'])
  }
})
const onClose = () => {
  formModel.value = {
    _id: '',
    name: '',
    description: '',
    members: [] as IMember[]
  }
  // 清空空间详情
  workSpaceStore.setSpaceDetail(null)
  emit('on-close-codify')
}

const onConfirm = async () => {
  ruleForm.value?.validate(async (valid: boolean) => {
    if (valid) {
      if (props.type === QOP_MAP.ADD) {
        try {
          await handleAdd()
          emit('on-close-codify', 'update')
        } catch (err) {
          ElMessage.error('createSpace status err' + err)
        }
      } else {
        try {
          await handleUpdate()
          emit('updateData', formModel.value)
          emit('on-close-codify', 'update')
        } catch (err) {
          ElMessage.error('createSpace status err' + err)
        }
      }
    } else {
      return false
    }
  })
}

const handleMemberSelect = (val: string, label: string) => {
  formModel.value.members.push({ userId: val, username: label, role: UserRole.Member })
}
const handleMembersChange = (val: IMember[]) => {
  formModel.value.members = val
}
const handleUpdate = async () => {
  await workSpaceStore.updateSpace(formModel.value)
}
const handleAdd = async () => {
  await workSpaceStore.addSpace(formModel.value)
}
</script>

<style lang="scss" scoped>
.base-form-root {
  padding: 20px;
}
</style>
