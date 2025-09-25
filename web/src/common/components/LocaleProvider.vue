<template>
    <el-config-provider :locale="elementLocale">
        <slot />
    </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { useElementPlusLocale } from '@/common/composables/useElementLocale'

const { elementLocale } = useElementPlusLocale()
</script>