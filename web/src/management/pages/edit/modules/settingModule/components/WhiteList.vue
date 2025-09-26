<template>
  <div class="white-list-wrap">
    <el-button class="create-btn" type="primary" @click="whiteVisible = true">{{ t('survey.addToWhitelist')
    }}</el-button>
    <el-button v-if="whitelist.length > 0" class="create-btn" color="#4A4C5B" @click="delAllList">
      {{ t('common.deleteAll') }}
    </el-button>
    <el-table class="table-wrap" :empty-text="t('common.noData')" :data="whitelist" height="240" style="width: 426px">
      <el-table-column :label="t('survey.whitelist')" width="350">
        <template #default="scope">
          <div>{{ whitelist[scope.$index] }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="t('common.operation')" width="74">
        <template #default="scope">
          <div @click="delRowItem(scope.$index)" class="flex cursor">
            <i-ep-delete :size="16" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="whiteVisible" :title="t('survey.addWhitelist')" width="600" @closed="handleClose">
      <div>
        <el-form-item label-position="top" :label="t('survey.typeSelection')" label-width="auto">
          <el-radio-group v-model="memberType" @change="handleTypeChange">
            <el-radio value="MOBILE">{{ t('survey.mobilePhone') }}</el-radio>
            <el-radio value="EMAIL">{{ t('survey.email') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-position="top" class="flex-column" :label="t('survey.whitelistEntry')" label-width="auto">
          <el-input v-model="whiteTextarea" :placeholder="t('survey.multipleSeparator')" rows="7" resize="none"
            type="textarea" />
        </el-form-item>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="whiteVisible = false">{{ t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleChange">{{ t('common.confirm') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { FORM_CHANGE_EVENT_KEY } from '@/materials/setters/constant'
import { ElMessage } from 'element-plus'
import { regexpMap } from '@/common/regexpMap.ts'

const { t } = useI18n()

const props = defineProps({
  formConfig: Object
})
const emit = defineEmits([FORM_CHANGE_EVENT_KEY])

const whitelist = ref(props.formConfig.value[0] || [])
const memberType = ref(props.formConfig.value[1] || 'MOBILE')
const whiteVisible = ref(false)
const whiteTextarea = ref(whitelist.value.join(','))

const regularMap = {
  MOBILE: regexpMap.m,
  EMAIL: regexpMap.e
}

const checkValRule = (list) => {
  let status = false
  if (list.length > 100) {
    ElMessage.error(t('survey.maxWhitelistItems', { max: 100 }))
    return true
  }
  const pattern = regularMap[memberType.value]
  if (!pattern) return false

  for (let i = 0; i < list.length; i++) {
    if (!pattern.test(list[i])) {
      status = true
      ElMessage.error(t('survey.invalidFormat'))
      break
    }
  }

  return status
}

const handleTypeChange = () => {
  whiteTextarea.value = ''
}

const handleChange = () => {
  const keys = props.formConfig.keys
  const list = whiteTextarea.value ? whiteTextarea.value.split(',') : []
  if (checkValRule(list)) return

  emit(FORM_CHANGE_EVENT_KEY, { key: keys[0], value: list })
  emit(FORM_CHANGE_EVENT_KEY, { key: keys[1], value: memberType.value })
  whiteVisible.value = false
}

const handleClose = () => {
  nextTick(() => {
    whitelist.value = props.formConfig.value[0] || []
    whiteTextarea.value = whitelist.value.join(',')
    memberType.value = props.formConfig.value[1] || 'MOBILE'
  })
}

const delRowItem = (index) => {
  whitelist.value.splice(index, 1)
  whiteTextarea.value = whitelist.value.join(',')
  const keys = props.formConfig.keys
  emit(FORM_CHANGE_EVENT_KEY, { key: keys[0], value: whitelist.value })
}

const delAllList = () => {
  whitelist.value = []
  whiteTextarea.value = ''
  handleChange()
}
</script>
<style lang="scss" scoped>
.white-list-wrap {
  .flex-column {
    flex-direction: column;
  }

  :deep(th) {
    padding: 4px 0;
    background: #f6f7f9;
  }

  :deep(td) {
    padding: 6px 0;
  }

  .table-wrap {
    margin-top: 16px;
    border: 1px solid #ebeef5;
    border-radius: 2px;
    overflow-x: hidden;
  }

  .cursor {
    cursor: pointer;
  }

  .flex {
    display: flex;
  }
}
</style>
