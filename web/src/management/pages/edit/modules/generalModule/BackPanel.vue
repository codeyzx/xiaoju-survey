<template>
  <div class="back-btn" @click="handleNavigateHome">
    <i class="iconfont icon-fanhui"></i>
    <span>{{ t('common.back') }}</span>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const handleNavigateHome = () => {
  router.push({
    name: 'survey'
  })
}
</script>
<style lang="scss" scoped>
.back-btn {
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  .iconfont {
    margin-right: 5px;
  }
}
</style>
