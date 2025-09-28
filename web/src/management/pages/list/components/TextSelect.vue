<template>
  <div class="text-select-root">
    <label :for="selectId" class="visually-hidden">{{ translatedLabel }}</label>
    <el-select v-model="selectValue" :empty-values="[null, undefined]" :placeholder="translatedLabel" :id="selectId"
      :aria-label="translatedLabel">
      <el-option v-for="item in translatedOptions" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  options: {
    type: Object,
    required: true
  }
})
const emit = defineEmits('change')

const translatedLabel = computed(() => t(props.options.label))

const translatedOptions = computed(() =>
  props.options.value.map(item => ({
    ...item,
    label: t(item.label)
  }))
)

const selectId = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`)

const selectValue = computed({
  get() {
    return props.value
  },
  set(val) {
    emit('change', val)
  }
})
</script>

<style lang="scss" scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.el-select {
  width: 105px;
  line-height: 35px;
  margin-right: 20px;

  :deep(.el-select__wrapper) {
    box-shadow: none;
    height: 35px;
    //   line-height: 35px;
  }

  :deep(.el-icon-arrow-up:before) {
    position: relative;
    top: -2px;
  }
}
</style>
