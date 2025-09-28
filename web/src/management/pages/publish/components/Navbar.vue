<template>
  <div class="navbar">
    <div class="left-group">
      <BackPanel></BackPanel>
      <TitlePanel :style="{ marginLeft: '30px' }" :title="title"></TitlePanel>
    </div>
    <div class="right-group">
      <LanguageSelector class="language-selector" />
    </div>
  </div>
</template>    
<script lang="ts" setup>
import { defineProps } from 'vue'
import BackPanel from '../../edit/modules/generalModule/BackPanel.vue'
import TitlePanel from '../../edit/modules/generalModule/TitlePanel.vue'
import LanguageSelector from '@/common/components/LanguageSelector.vue'

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>
<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 56px;
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .left-group {
    margin-left: 20px;
  }
  .right-group {
    margin-right: 20px;
    
    .language-selector {
      margin-right: 10px;
    }
  }
}
</style>