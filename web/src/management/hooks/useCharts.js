import * as echarts from 'echarts/core'
import { BarChart, PieChart, GaugeChart } from 'echarts/charts'
import {
  TooltipComponent,
  TitleComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { getOption } from '@/management/config/chartConfig'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  PieChart,
  GaugeChart,
  CanvasRenderer
])

/**
 * 绘制图表
 * @param {Object} el
 * @param {String} type
 * @param {Array} data
 * @param {Object} translations - 翻译对象
 */
export default (el, type, data, translations = {}) => {
  const chart = echarts.init(el)
  const option = getOption[type](data, translations.submissionCount)

  chart.setOption(option, true)

  const resize = () => {
    chart.resize()
  }

  const changeType = (type, data) => {
    chart.setOption(getOption[type](data, translations.submissionCount), true)
  }

  return { chart, resize, changeType }
}
