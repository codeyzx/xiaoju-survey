export default {
  // 通用
  common: {
    confirm: '确定',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    create: '创建',
    submit: '提交',
    reset: '重置',
    search: '搜索',
    loading: '加载中...',
    noData: '暂无数据',
    success: '成功',
    error: '错误',
    warning: '警告',
    info: '信息',
    close: '关闭',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    finish: '完成',
    copy: '复制',
    download: '下载',
    upload: '上传',
    preview: '预览',
    publish: '发布',
    unpublish: '取消发布',
    view: '查看',
    more: '更多',
    settings: '设置',
    help: '帮助',
    about: '关于',
    logout: '退出登录',
    language: '语言'
  },

  // 登录页面
  login: {
    title: '您好，请登录',
    account: '账号',
    password: '密码',
    captcha: '验证码',
    loginBtn: '登录',
    registerBtn: '注册',
    accountPlaceholder: '请输入账号',
    passwordPlaceholder: '请输入密码',
    captchaPlaceholder: '请输入验证码',
    accountRequired: '请输入账号',
    passwordRequired: '请输入密码',
    captchaRequired: '请输入验证码',
    accountLength: '长度在 3 到 10 个字符',
    passwordLength: '长度在 6 到 16 个字符',
    passwordFormat: '只能输入数字、字母、特殊字符',
    loginSuccess: '登录成功',
    loginFailed: '登录失败',
    registerSuccess: '注册成功',
    registerFailed: '注册失败',
    getCaptchaFailed: '获取验证码失败',
    refreshCaptcha: '点击刷新验证码',
    knownText: '我知道了'
  },

  // 导航栏
  nav: {
    home: '首页',
    survey: '问卷',
    template: '模板',
    data: '数据',
    analysis: '分析',
    settings: '设置',
    workspace: '工作空间',
    profile: '个人资料'
  },

  // 问卷列表
  surveyList: {
    title: '问卷列表',
    createSurvey: '创建问卷',
    createSpace: '创建团队空间',
    createGroup: '创建分组',
    spaceManagement: '团队管理',
    mySpace: '我的空间',
    myGroup: '我的分组',
    allSurveys: '全部问卷',
    publishedSurveys: '已发布',
    draftSurveys: '草稿',
    completedSurveys: '已完成',
    searchPlaceholder: '搜索问卷名称',
    noSurveys: '暂无问卷',
    surveyName: '问卷名称',
    status: '状态',
    createTime: '创建时间',
    updateTime: '更新时间',
    responseCount: '回收数量',
    actions: '操作',
    draft: '草稿',
    published: '已发布',
    completed: '已完成',
    paused: '已暂停',
    selectCreateMethod: '请选择创建方式'
  },

  // 问卷编辑器
  editor: {
    title: '问卷编辑器',
    surveyTitle: '问卷标题',
    surveyDesc: '问卷描述',
    addQuestion: '添加题目',
    deleteQuestion: '删除题目',
    copyQuestion: '复制题目',
    moveUp: '上移',
    moveDown: '下移',
    questionTitle: '题目标题',
    questionType: '题目类型',
    required: '必填',
    optional: '选填',
    singleChoice: '单选题',
    multiChoice: '多选题',
    textInput: '文本输入',
    textArea: '多行文本',
    number: '数字输入',
    date: '日期选择',
    time: '时间选择',
    rating: '评分题',
    nps: 'NPS评分',
    matrix: '矩阵题',
    file: '文件上传',
    addOption: '添加选项',
    optionText: '选项文本',
    otherOption: '其他选项',
    saveSuccess: '保存成功',
    saveFailed: '保存失败',
    preview: '预览问卷',
    publish: '发布问卷',
    settings: '问卷设置',
    createBlank: '空白创建',
    textImport: '文本导入',
    aiGenerate: 'AI生成',
    excelImport: 'Excel导入',
    selectCreateMethod: '请选择创建方式',
    collaborate: '协作'
  },

  // 问卷设置
  surveySettings: {
    title: '问卷设置',
    basic: '基础设置',
    advanced: '高级设置',
    theme: '主题设置',
    security: '安全设置',
    surveyTitle: '问卷标题',
    surveyDesc: '问卷描述',
    startTime: '开始时间',
    endTime: '结束时间',
    maxResponses: '最大回收数量',
    allowAnonymous: '允许匿名提交',
    requireLogin: '需要登录',
    oneResponsePerUser: '每人限提交一次',
    showProgress: '显示进度条',
    allowEdit: '允许修改答案',
    showResult: '显示统计结果',
    customTheme: '自定义主题',
    backgroundColor: '背景色',
    textColor: '文字颜色',
    buttonColor: '按钮颜色'
  },

  // 数据分析
  analysis: {
    title: '数据分析',
    overview: '概览',
    responses: '回收情况',
    statistics: '统计分析',
    export: '导出数据',
    totalResponses: '总回收数',
    validResponses: '有效回收数',
    invalidResponses: '无效回收数',
    responseRate: '回收率',
    averageTime: '平均用时',
    exportExcel: '导出Excel',
    exportCSV: '导出CSV',
    exportPDF: '导出PDF',
    timeRange: '时间范围',
    today: '今天',
    yesterday: '昨天',
    thisWeek: '本周',
    lastWeek: '上周',
    thisMonth: '本月',
    lastMonth: '上月',
    custom: '自定义'
  },

  // 错误消息
  error: {
    networkError: '网络连接失败',
    serverError: '服务器错误',
    permissionDenied: '权限不足',
    notFound: '页面不存在',
    timeout: '请求超时',
    unknown: '未知错误',
    validationFailed: '数据验证失败',
    uploadFailed: '上传失败',
    downloadFailed: '下载失败',
    saveFailed: '保存失败',
    deleteFailed: '删除失败',
    sessionInvalid: 'sessionId有误',
    surveyIdNotFound: '未获取到问卷id'
  },

  // 成功消息
  success: {
    saved: '保存成功',
    deleted: '删除成功',
    created: '创建成功',
    updated: '更新成功',
    published: '发布成功',
    unpublished: '取消发布成功',
    copied: '复制成功',
    uploaded: '上传成功',
    downloaded: '下载成功',
    imported: '导入成功',
    exported: '导出成功'
  },

  // 确认消息
  confirm: {
    delete: '确定要删除吗？',
    publish: '确定要发布吗？',
    unpublish: '确定要取消发布吗？',
    save: '确定要保存吗？',
    reset: '确定要重置吗？',
    discard: '确定要放弃更改吗？',
    leave: '确定要离开页面吗？未保存的更改将丢失。'
  },

  // 时间格式
  time: {
    justNow: '刚刚',
    minutesAgo: '{n} 分钟前',
    hoursAgo: '{n} 小时前',
    daysAgo: '{n} 天前',
    monthsAgo: '{n} 个月前',
    yearsAgo: '{n} 年前'
  },

  // 表单验证
  validation: {
    required: '此项为必填项',
    minLength: '最少输入 {min} 个字符',
    maxLength: '最多输入 {max} 个字符',
    email: '请输入有效的邮箱地址',
    phone: '请输入有效的手机号码',
    url: '请输入有效的网址',
    number: '请输入有效的数字',
    integer: '请输入整数',
    positive: '请输入正数',
    min: '数值不能小于 {min}',
    max: '数值不能大于 {max}',
    between: '数值必须在 {min} 到 {max} 之间'
  },

  // Survey submission
  submission: {
    submitSuccess: '提交成功',
    resetForm: '重新填写',
    submitFailed: '提交失败',
    pleaseSelectOption: '请选择选项',
    pleaseInputText: '请输入文本',
    getSurveyFailed: '获取问卷失败',
    verifyFailed: '验证失败',
    verify: '验证'
  },

  // Form placeholders
  form: {
    enterPassword: '请输入访问密码',
    enterUsername: '请输入用户名',
    enterPhone: '请输入手机号',
    enterEmail: '请输入邮箱',
    enterVerificationCode: '请输入6位字符串类型访问密码',
    continueFillContent: '是否继续上次填写的内容？',
    continueSubmitContent: '是否继续上次提交的内容？'
  }
}
