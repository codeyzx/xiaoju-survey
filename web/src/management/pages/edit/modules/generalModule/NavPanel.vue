<template>
  <div class="content">
    <template v-for="route in routes" :key="route.key">
      <router-link
        :to="{ name: route.router }"
        replace
        v-slot="{ href, navigate, isActive, isExactActive }"
        custom
      >
        <div
          :class="[
            'navbar-btn',
            (isActive && ['skinsettings', 'edit'].includes(route.key)) || isExactActive
              ? 'router-link-exact-active'
              : ''
          ]"
        >
          <a :href="href" @click="navigate">
            <i class="iconfont" :class="[route.icon]"></i>
            <span>{{ $t(route.text) }}</span></a
          >
        </div>
      </router-link>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const routes = [
  {
    icon: 'icon-wenjuanbianji',
    text: 'nav.surveyEdit',
    router: 'QuestionEditIndex',
    key: 'edit',
    next: true
  },
  {
    icon: 'icon-wenjuanshezhi',
    text: 'nav.surveySettings',
    router: 'QuestionEditSetting',
    key: 'settings',
    next: true
  },
  {
    icon: 'icon-yangshishezhi',
    text: 'nav.skinSettings',
    router: 'QuestionSkinSetting',
    key: 'skinsettings',
    next: true
  }
]
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;

  .navbar-btn {
    position: relative;
    color: #92949d;
    padding: 0 20px;
    cursor: pointer;
    a {
      color: inherit;
    }
    &.router-link-exact-active {
      color: $font-color-title;

      &::before {
        content: '';
        position: absolute;
        width: 90px;
        height: 3px;
        background-color: $primary-color;
        bottom: -16px;
        left: 20px;
        z-index: 99;
      }
    }

    // &.router-link-exact-active {
    //   color: #4a4c5b;
    // }
    .iconfont {
      margin-right: 12px;
    }
  }
}
</style>
