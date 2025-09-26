<template>
    <el-dropdown trigger="click" @command="handleCommand" class="language-selector" aria-label="Language selector"
        role="listbox">
        <span class="el-dropdown-link selector-btn" tabindex="0" aria-haspopup="listbox" aria-expanded="false">
            <el-icon class="globe-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2" />
                    <path
                        d="M10 1C13.866 1 17 4.13401 17 8C17 11.866 13.866 15 10 15C6.13401 15 3 11.866 3 8C3 4.13401 6.13401 1 10 1Z"
                        stroke="currentColor" stroke-width="1.5" />
                </svg>
            </el-icon>
            <span class="flag" aria-hidden="true">{{ currentLanguage.flag }}</span>
            <span class="name">{{ currentLanguage.name }}</span>
            <el-icon class="el-icon--right" aria-hidden="true">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="lang in supportedLocales" :key="lang.code" :command="lang.code"
                    :class="{ 'is-active': currentLocale === lang.code }" role="option"
                    :aria-selected="currentLocale === lang.code">
                    <span class="flag" aria-hidden="true">{{ lang.flag }}</span>
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

    .selector-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: var(--el-bg-color);
        border-radius: 24px;
        padding: 6px 16px;
        color: var(--el-text-color-regular);
        font-size: 15px;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        transition: box-shadow 0.2s, background 0.2s, color 0.2s;
        outline: none;
        border: 2px solid transparent;

        &:hover,
        &:focus {
            color: var(--el-color-primary);
            background: var(--el-color-info-light-9);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
            border-color: var(--el-color-primary);
        }

        &:focus {
            outline: 2px solid var(--el-color-primary);
        }

        .globe-icon {
            margin-right: 4px;
            color: var(--el-color-primary);
            vertical-align: middle;
        }

        .flag {
            font-size: 18px;
            margin-right: 4px;
        }

        .name {
            margin-right: 2px;
        }
    }
}

:deep(.el-dropdown-menu__item) {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    padding: 8px 18px;

    .flag {
        font-size: 18px;
        margin-right: 6px;
    }

    &.is-active {
        color: var(--el-color-primary);
        font-weight: 600;
        background: var(--el-color-info-light-8);
        border-radius: 8px;
    }

    &:focus {
        outline: 2px solid var(--el-color-primary);
    }
}
</style>