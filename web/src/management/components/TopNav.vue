<template>
  <div class="top-nav">
    <div class="left">
      <img class="logo-img" src="/imgs/Logo.webp" alt="logo" />
      <el-menu router default-active-index="survey" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="survey">
          <router-link :to="{ name: 'survey' }">{{ $t('nav.survey') }}</router-link>
        </el-menu-item>
        <el-menu-item index="download">
          <router-link :to="{ name: 'download' }">{{ $t('analysis.export') }}</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="login-info">
      <LanguageSelector class="language-selector" />
      <img class="login-info-img" src="/imgs/avatar.webp" alt="User Avatar" />
      <span class="logout" @click="handleLogout">{{ $t('common.logout') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/management/stores/user'
import { useRouter } from 'vue-router'
import LanguageSelector from '@/common/components/LanguageSelector.vue'

const router = useRouter()

const userStore = useUserStore()

const handleLogout = () => {
  userStore.logout()
  router.replace({ name: 'login' })
}
</script>

<style lang="scss" scoped>
.top-nav {
  background: #fff;
  color: #4a4c5b;
  padding: 0 20px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);

  .left {
    display: flex;
    align-items: center;
    width: calc(100% - 200px);

    .logo-img {
      width: 90px;
      height: fit-content;
      padding-right: 20px;
    }

    .el-menu {
      width: 100%;
      height: 56px;
      border: none !important;

      :deep(.el-menu-item, .is-active) {
        border: none !important;
        min-height: 44px;
        padding: 8px 16px;
      }

      .router-link-active {
        color: #d87900;
        font-weight: 600;
      }
    }
  }

  .login-info {
    display: flex;
    align-items: center;
    gap: 10px;

    .language-selector {
      margin-right: 10px;
    }

    .login-info-img {
      margin-left: 10px;
      height: 30px;
      margin-top: -6px;
    }

    .logout {
      margin-left: 20px;
      padding: 4px 8px;
      border-radius: 4px;

      &:hover,
      &:focus {
        background-color: rgba(216, 121, 0, 0.1);
        outline: none;
      }

      &:focus {
        box-shadow: 0 0 0 2px #d87900;
      }
    }
  }

  span {
    cursor: pointer;
    color: #d87900;
  }
}
</style>
