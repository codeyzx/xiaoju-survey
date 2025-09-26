<template>
  <div class="wrapper">
    <el-select-v2 v-model="value" filterable class="search-name" remote :remote-method="remoteMethod" clearable
      :options="selectOptions" :loading="loading" :placeholder="t('common.enterAccountSearch')"
      @change="handleSelect" />
    <MemberList :members="members" :options="computedOptions" @change="handleMemberChange" :multiple="multiple">
    </MemberList>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import MemberList from './MemberList.vue'
import { getUserList } from '@/management/api/space'
import {
  type IMember,
  type ListItem,
  type UserRole,
  roleLabels
} from '@/management/utils/workSpace'
import { CODE_MAP } from '@/management/api/base'
import { useUserStore } from '@/management/stores/user'

const { t } = useI18n()
const userStore = useUserStore()
const props = withDefaults(
  defineProps<{
    members?: IMember[]
    options?: ListItem[]
    multiple?: boolean
  }>(),
  {
    members: () => [],
    multiple: false
  }
)
const emit = defineEmits(['select', 'change'])

const value = ref('')
const selectOptions = ref<ListItem[]>([])
const loading = ref(false)

const computedOptions = computed(() => {
  if (props.options && props.options.length > 0) {
    return props.options
  } else {
    return Object.keys(roleLabels).map((key) => ({
      label: t(roleLabels[key as UserRole]),
      value: key
    }))
  }
})

const remoteMethod = async (q: string) => {
  const query = q.trim()
  if (query !== '') {
    loading.value = true
    const res: any = await getUserList(query)
    if (res.code === CODE_MAP.SUCCESS) {
      selectOptions.value = res.data.map((item: any) => {
        // 不可以选中自己
        const currentUser = item.username === userStore.userInfo?.username
        return {
          value: item.userId,
          label: item.username,
          disabled: props.members.map((item) => item.userId).includes(item.userId) || currentUser
        }
      })
      loading.value = false
    }
  } else {
    selectOptions.value = []
  }
}
const handleSelect = (val: string) => {
  value.value = ''
  emit('select', val, selectOptions.value?.find((item) => item.value === val)?.label)
}
const handleMemberChange = (val: any) => {
  emit('change', val)
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
</style>
