import { pick as _pick } from 'lodash-es'

export default {
  name: 'basicConfig',
  titleKey: 'editor.basicConfiguration',
  title: '基础配置',
  type: 'CheckboxGroup',
  key: 'basicConfig',
  options: [
    {
      labelKey: 'editor.requiredField',
      label: '必填',
      key: 'isRequired'
    },
    {
      labelKey: 'editor.showType',
      label: '显示类型',
      key: 'showType'
    },
    {
      labelKey: 'editor.showIndex',
      label: '显示序号',
      key: 'showIndex'
    },
    {
      labelKey: 'editor.showSpliter',
      label: '显示分割线',
      key: 'showSpliter',
      tipKey: 'editor.showSpliterTip',
      tip: '题目下方分割线，仅在移动端展示。'
    }
  ],
  valueGetter({ moduleConfig }) {
    return _pick(
      moduleConfig,
      this.options.map((item) => item.key)
    )
  }
}
