import { menuItems } from './questionMenuConfig'

export const noDataConfig = {
  title: 'analysis.noDataTitle',
  desc: 'analysis.noDataDesc',
  img: '/imgs/icons/analysis-empty.webp'
}

export const separateItemListHead = [
  {
    title: 'analysis.optionColumn',
    field: 'text'
  },
  {
    title: 'analysis.countColumn',
    field: 'count'
  },
  {
    title: 'analysis.percentColumn',
    field: 'percent'
  }
]

// 图表名称需要和./chartConfig.js中保持一致
export const questionChartsConfig = {
  [menuItems['checkbox']['type']]: ['bar'],
  [menuItems['radio-nps']['type']]: ['gauge', 'pie', 'bar'],
  default: ['pie', 'bar']
}

export const analysisTypeMap = {
  dataTable: 'dataTable',
  separateStatistics: 'separateStatistics'
}

export const analysisType = [
  {
    value: analysisTypeMap.dataTable,
    label: 'analysis.dataTable',
    icon: 'icon-shujuliebiao'
  },
  {
    value: analysisTypeMap.separateStatistics,
    label: 'analysis.separateStatistics',
    icon: 'icon-fentitongji'
  }
]

export const summaryType = {
  between: 'between'
}

export const summaryItemConfig = {
  'radio-nps': [
    {
      text: '推荐者',
      field: 'id',
      type: summaryType.between,
      max: 10,
      min: 9
    },
    {
      text: '中立者',
      field: 'id',
      type: summaryType.between,
      max: 8,
      min: 7
    },
    {
      text: '贬损者',
      field: 'id',
      type: summaryType.between,
      max: 6,
      min: 0
    }
  ]
}
