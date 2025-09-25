<template>
    <el-dropdown trigger="click" @command="handleCommand" class="language-selector">
        <span class="el-dropdown-link">
            <span class="flag">{{ currentLanguage.flag }}</span>
            <span class="name">{{ currentLanguage.name }}</span>
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="lang in supportedLocales" :key="lang.code" :command="lang.code"
                    :class="{ 'is-active': currentLocale === lang.code }">
                    <span class="flag">{{ lang.flag }}</span>
                    <span class="name">{{ lang.name }}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDown } from '@element-plus/icons-vue'
import { supportedLocales, switchLanguage } from '@/common/locales'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

const currentLanguage = computed(() => {
    return supportedLocales.find(lang => lang.code === currentLocale.value) || supportedLocales[0]
})

const handleCommand = (command: string) => {
    if (command !== currentLocale.value) {
        switchLanguage(command)
        // 重新加载页面以确保所有组件都更新
        // window.location.reload()
    }
}
</script>

<style scoped lang="scss">
.language-selector {
    cursor: pointer;

    .el-dropdown-link {
        display: flex;
        align-items: center;
        color: var(--el-text-color-regular);
        font-size: 14px;

        &:hover {
            color: var(--el-color-primary);
        }

        .flag {
            font-size: 16px;
            margin-right: 6px;
        }

        .name {
            margin-right: 4px;
        }
    }
}

:deep(.el-dropdown-menu__item) {
    display: flex;
    align-items: center;

    .flag {
        font-size: 16px;
        margin-right: 8px;
    }

    &.is-active {
        color: var(--el-color-primary);
        font-weight: 500;
    }
}
</style>