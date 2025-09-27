<template>
  <button class="tool-root" @click.stop="onClick" :aria-label="label" type="button">
    <span class="tool-root-btn-text" :style="{ width: width + 'px', color: color }">{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'ToolModule',
  props: {
    value: String,
    label: String,
    type: String,
    width: Number,
    color: String
  },
  methods: {
    onClick() {
      this.$emit('call', {
        key: this.value,
        name: this.label
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-root {
  display: inline-block;
  font-size: 0;
  line-height: 0;
  flex: 1;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:focus {
    outline: 2px solid #d87900;
    outline-offset: 2px;
  }

  &:hover {
    background-color: #f5f5f5;
  }

  .icon-list-more {
    color: $primary-color;
    font-size: 20px;
    position: relative;
    top: 3px;
  }

  span {
    font-size: 14px;
    color: $primary-color;
    display: inline-block;
    text-align: center;
    line-height: 16px;
    cursor: pointer;
    // font-weight: 500;
  }
}
</style>
