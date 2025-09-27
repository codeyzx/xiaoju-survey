<template>
  <div v-if="data.length" class="separate-statis-page">
    <StatisticsItem v-for="StatisticsData in data" :key="StatisticsData.field" :StatisticsData />
  </div>
  <div v-else>
    <EmptyIndex :data="noDataConfig" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'
import EmptyIndex from '@/management/components/EmptyIndex.vue'
import { getStatisticList } from '@/management/api/analysis'
import StatisticsItem from '../components/StatisticsItem.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()

const noDataConfig = computed(() => ({
  title: t('analysis.noDataTitle'),
  desc: t('analysis.noDataDesc'),
  img: '/imgs/icons/analysis-empty.webp'
}))

const data = ref([])

const initData = async () => {
  try {
    const res = await getStatisticList({
      surveyId: route.params.id
    })
    if (res.code === 200) {
      data.value = res?.data || []
    } else {
      ElMessage.error(res?.errmsg)
    }
  } catch (error) {
    ElMessage.error(error?.message || '查询回收数据失败，请重试')
  }
}

onMounted(initData)
</script>

<style lang="scss" scoped>
.separate-statis-page {
  height: 100%;
  background: #fff;
  padding: 0 24px;
  overflow-y: auto;
}
</style>
