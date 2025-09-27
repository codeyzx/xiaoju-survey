<template>
  <div class="nav">
    <div class="left-group">
      <BackPanel></BackPanel>
      <TitlePanel :style="{ marginLeft: '30px' }" :title="title"></TitlePanel>
    </div>
    <div class="center-group">
      <NavPanel></NavPanel>
    </div>
    <div class="right-group">
      <LanguageSelector class="language-selector" />
      <CooperationPanel>
        <template #content="{ onCooper }">
          <div class="btn" @click="onCooper">
            <i-ep-connection class="view-icon" :size="20" />
            <span class="btn-txt">{{ $t('editor.collaborate') }}</span>
          </div>
        </template>
      </CooperationPanel>
      <PreviewPanel></PreviewPanel>
      <HistoryPanel></HistoryPanel>
      <SavePanel :updateLogicConf="updateLogicConf" :updateWhiteConf="updateWhiteConf" :seize="seize"></SavePanel>
      <PublishPanel :updateLogicConf="updateLogicConf" :updateWhiteConf="updateWhiteConf" :seize="seize"></PublishPanel>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useEditStore } from '@/management/stores/edit'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import 'element-plus/theme-chalk/src/message.scss'

import BackPanel from '../modules/generalModule/BackPanel.vue'
import TitlePanel from '../modules/generalModule/TitlePanel.vue'
import NavPanel from '../modules/generalModule/NavPanel.vue'
import HistoryPanel from '../modules/contentModule/HistoryPanel.vue'
import PreviewPanel from '../modules/contentModule/PreviewPanel.vue'
import SavePanel from '../modules/contentModule/SavePanel.vue'
import PublishPanel from '../modules/contentModule/PublishPanel.vue'
import CooperationPanel from '../modules/contentModule/CooperationPanel.vue'
import LanguageSelector from '@/common/components/LanguageSelector.vue'
import { seizeSession } from '@/management/api/survey'
import { useRoute } from 'vue-router'

const route = useRoute()
const editStore = useEditStore()
const { schema, changeSchema } = editStore
const title = computed(() => (editStore.schema?.metaData as any)?.title || '')
const { t } = useI18n()

const { showLogicEngine, jumpLogicEngine } = storeToRefs(editStore)
// 校验 - 逻辑
const updateLogicConf = () => {
  const { active } = route.query
  let res = {
    validated: true,
    message: ''
  }

  // 如果显示逻辑和跳转逻辑都设置了需要删除一个后才能保存成功
  if (
    (showLogicEngine.value?.rules?.length && active === 'jumpLogic') ||
    (jumpLogicEngine.value.rules?.length && active === 'showLogic')
  ) {
    return {
      validated: false,
      message:
        active === 'jumpLogic'
          ? t('validation.showLogicExistsError')
          : t('validation.jumpLogicExistsError')
    }
  }

  if (
    showLogicEngine.value &&
    showLogicEngine.value.rules &&
    showLogicEngine.value.rules.length !== 0
  ) {
    try {
      showLogicEngine.value.validateSchema()
    } catch (error) {
      res = {
        validated: false,
        message: t('validation.logicConfigEmpty')
      }

      return res
    }

    const showLogicConf = showLogicEngine.value.toJson()
    if (JSON.stringify(schema.logicConf.showLogicConf) !== JSON.stringify(showLogicConf)) {
      // 更新逻辑配置
      changeSchema({ key: 'logicConf', value: { showLogicConf } })
    }

    return res
  }
  const jumpLogicConf = jumpLogicEngine.value.toJson()
  if (JSON.stringify(schema.logicConf.jumpLogicConf) !== JSON.stringify(jumpLogicConf)) {
    changeSchema({ key: 'logicConf', value: { jumpLogicConf } })
  }

  return res
}

// 校验 - 白名单
const updateWhiteConf = () => {
  let res = {
    validated: true,
    message: ''
  }
  const baseConf = (schema?.baseConf as any) || {}
  if (baseConf.passwordSwitch && !baseConf.password) {
    res = {
      validated: false,
      message: t('validation.passwordRequired')
    }
    return res
  }
  if (baseConf.whitelistType != 'ALL' && !baseConf.whitelist?.length) {
    res = {
      validated: false,
      message: t('validation.whitelistRequired')
    }
    return res
  }
  return res
}

// 重新获取sessionid
const seize = async (sessionId: string) => {
  const seizeRes: Record<string, any> = await seizeSession({ sessionId })
  if (seizeRes.code === 200) {
    location.reload()
  } else {
    ElMessage.error(t('validation.permissionDenied'))
  }
}
</script>
<style lang="scss" scoped>
@import url('@/management/styles/edit-btn.scss');

.view-icon {
  font-size: 20px;
  height: 29px;
  line-height: 29px;
}

.nav {
  width: 100%;
  height: 56px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  >div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .center-group {
    height: 100%;
    flex: 1;
    justify-content: center;
    padding-right: 350px; /* Increased padding to prevent overlap with Indonesian language */
  }

  .left-group,
  .right-group {
    position: absolute;
    top: 0;
    height: 100%;
  }
}

.left-group {
  left: 18px;
}

.right-group {
  right: 18px;
}

.language-selector {
  margin-right: 20px;
  z-index: 1000; /* Ensure dropdown appears above other elements */
}

.right-group {
  gap: 8px; /* Add gap between buttons to prevent overlap */
  
  .btn {
    min-width: 45px; /* Allow buttons to be flexible but have minimum width */
    width: auto; /* Allow width to adjust to content */
    max-width: 60px; /* Prevent buttons from getting too wide */
    
    .btn-txt {
      font-size: 11px; /* Slightly smaller font for longer text */
      text-align: center;
      line-height: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
