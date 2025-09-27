<template>
  <el-form class="new-form" label-position="right" ref="ruleForm" :model="form" label-width="100px" :rules="rules">
    <el-form-item prop="title" :label="t('surveyForm.surveyName')">
      <el-input v-model="form.title" :class="form.title ? 'nonempty' : 'empty'"
        :placeholder="t('surveyForm.enterSurveyTitle')" />
      <p class="form-item-tip">{{ t('surveyForm.titleTip') }}</p>
    </el-form-item>
    <el-form-item prop="remark" :label="t('surveyForm.surveyRemark')">
      <el-input v-model="form.remark" :class="form.remark ? 'nonempty' : 'empty'"
        :placeholder="t('surveyForm.enterRemark')" />
      <p class="form-item-tip">{{ t('surveyForm.remarkTip') }}</p>
    </el-form-item>
    <el-form-item prop="surveyType" :label="t('surveyForm.surveyType')">
      <el-radio-group v-model="form.surveyType">
        <el-radio v-for="item in surveyTypeList" :value="item.type" :key="item.type">{{ item.title }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="groupId" :label="t('surveyForm.group')" v-if="menuType === MenuType.PersonalGroup">
      <el-select v-model="form.groupId" :placeholder="t('surveyForm.ungrouped')" clearable>
        <el-option v-for="item in groupAllList" :key="item?._id" :label="item?.name" :value="item?._id" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="onCancel" :disabled="loading">{{ t('common.cancel') }}</el-button>
      <el-button type="primary" @click="onConfirm" :loading="loading">{{ t('common.confirm') }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { computed, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n'
import { MenuType, GroupState } from '@/management/utils/workSpace'
import { useWorkSpaceStore } from '@/management/stores/workSpace'
import { storeToRefs } from 'pinia';
import { SURVEY_TYPE_LIST } from '../pages/create/types';

const emit = defineEmits<{
  cancel: []
  confirm: [formData: any, callback: (success: boolean) => void]
}>()

const props = defineProps({
  groupId: {
    type: String,
    default: ''
  }
})

const ruleForm = ref<any>(null)
const loading = ref(false)

const workSpaceStore = useWorkSpaceStore()
workSpaceStore.getGroupList()
const { groupAllList, menuType } = storeToRefs(workSpaceStore)

const surveyTypeList = computed(() => SURVEY_TYPE_LIST)

const { t } = useI18n()

const state = reactive({
  rules: {
    title: [{ required: true, message: t('surveyList.validationTitleRequired'), trigger: 'blur' }]
  },
  form: {
    title: t('createForm.defaultTitle'),
    remark: t('createForm.defaultTitle'),
    surveyType: 'normal',
    groupId: props.groupId === GroupState.All || props.groupId === GroupState.Not ? '' : props.groupId
  }
})
const { rules, form } = toRefs(state)

const onCancel = () => {
  emit('cancel')
}

const onConfirm = () => {
  ruleForm?.value?.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      emit('confirm', { ...form.value }, () => {
        loading.value = false
      })
    }
  })
}

</script>
<style scoped></style>