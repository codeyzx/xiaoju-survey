<template>
  <div class="publish-result-page">
    <LeftMenu class="left" />
    <div class="right">
      <Navbar :title="(schema?.metaData as any)?.title || ''" />
      <div class="content">
        <template v-if="curStatus !== 'new'">
          <div class="preview-container" :style="{ backgroundImage: `url('${backgroundImage}')` }">
            <iframe :src="mainChannel.fullUrl"></iframe>
          </div>
          <div class="container-content">
            <span class="launch-tip">{{ $t('publish.disclaimer') }}</span>
            <h2>{{ $t('publish.surveyLink') }}</h2>
            <div class="main-channel-wrap">
              <ChannelRow
                :disable-delete="true"
                :data="mainChannel"
                :style-wrap="{ marginBottom: '8px' }"
              />
            </div>
          </div>
        </template>
        <EmptyIndex v-else :data="defaultConfig.value" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, toRef } from 'vue'
import { useEditStore } from '@/management/stores/edit'
import { useRoute, useRouter } from 'vue-router'
import { get as _get } from 'lodash-es'
import { useI18n } from 'vue-i18n'

import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'

import EmptyIndex from '@/management/components/EmptyIndex.vue'
import LeftMenu from '@/management/components/LeftMenu.vue'
import ChannelRow from './components/ChannelRow.vue'
import Navbar from './components/Navbar.vue'

const { t } = useI18n()
const backgroundImage = '/imgs/phone-bg.webp'
const defaultConfig = computed(() => ({
  title: t('publish.unpublishedTitle'),
  desc: t('publish.unpublishedDesc'),
  img: '/imgs/icons/unpublished.webp'
}))

const editStore = useEditStore()
const { schema, init, setSurveyId } = editStore
const metaData = toRef(schema, 'metaData')
const curStatus = computed(() => _get(metaData.value, 'curStatus.status', 'new'))
const mainChannel = computed(() => {
  let fullUrl = ''

  if (metaData.value) {
    fullUrl = `${location.origin}/render/${(metaData.value as any).surveyPath}?t=${Date.now()}`
  }

  return { fullUrl }
})

const route = useRoute()
const router = useRouter()
onMounted(async () => {
  setSurveyId(route.params.id as string)

  try {
    await init()
  } catch (err: any) {
    ElMessage.error(err.message)
    setTimeout(() => {
      router.replace({ name: 'survey' })
    }, 1000)
  }
})
</script>
<style lang="scss" scoped>
.publish-result-page {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .left {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }

  .right {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-left: 80px;
    display: flex;
    flex-direction: column;
    background: #f6f7f9;

    .content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px 40px 50px 40px;
    }
  }

  .preview-container {
    width: 390px;
    height: 769px;
    flex-grow: 0;
    flex-shrink: 0;
    overflow: hidden;
    padding: 117px 38px 67px 38px;
    background-position: 0 0;
    background-size: 100% 100%;

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}

.container-content {
  margin-left: 20px;
  background-color: #fff;
  width: 760px;
  padding: 30px 30px 80px;
  border-radius: 2px;

  .launch-tip {
    font-size: 12px;
    color: #fa881a;
  }

  h2 {
    font-family: PingFangSC-Medium;
    margin: 20px 0;
    font-size: 18px;
    color: #4a4c5b;
    letter-spacing: 0;
    line-height: 26px;
  }
}
</style>
