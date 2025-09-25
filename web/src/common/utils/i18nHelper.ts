/**
 * Utility to help extract Chinese text from Vue files for i18n
 * This file helps identify hardcoded Chinese text that needs translation
 */

// Common Chinese text patterns that should be translated
export const chineseTextPatterns = [
  // Template literals and string literals
  /'[\u4e00-\u9fff][^']*'/g,
  /"[\u4e00-\u9fff][^"]*"/g,
  /`[\u4e00-\u9fff][^`]*`/g,

  // Vue template text content
  />[\s]*[\u4e00-\u9fff][^<]*/g,

  // Object property values
  /:\s*['"`][\u4e00-\u9fff][^'"`]*['"`]/g,

  // Function call arguments
  /\([\s]*['"`][\u4e00-\u9fff][^'"`]*['"`][\s]*\)/g
]

// Common translation key mappings
export const commonTranslations: Record<string, string> = {
  // Buttons
  确定: 'common.confirm',
  取消: 'common.cancel',
  保存: 'common.save',
  删除: 'common.delete',
  编辑: 'common.edit',
  添加: 'common.add',
  创建: 'common.create',
  提交: 'common.submit',
  重置: 'common.reset',
  搜索: 'common.search',
  预览: 'common.preview',
  发布: 'common.publish',
  返回: 'common.back',
  下一步: 'common.next',
  上一步: 'common.previous',
  完成: 'common.finish',
  复制: 'common.copy',
  下载: 'common.download',
  上传: 'common.upload',
  关闭: 'common.close',
  更多: 'common.more',
  设置: 'common.settings',
  帮助: 'common.help',
  退出: 'common.logout',

  // Status
  '加载中...': 'common.loading',
  暂无数据: 'common.noData',
  成功: 'common.success',
  错误: 'common.error',
  警告: 'common.warning',
  信息: 'common.info',

  // Survey related
  问卷: 'nav.survey',
  问卷列表: 'surveyList.title',
  创建问卷: 'surveyList.createSurvey',
  问卷标题: 'editor.surveyTitle',
  问卷描述: 'editor.surveyDesc',
  添加题目: 'editor.addQuestion',
  删除题目: 'editor.deleteQuestion',
  复制题目: 'editor.copyQuestion',

  // Login
  '您好，请登录': 'login.title',
  账号: 'login.account',
  密码: 'login.password',
  验证码: 'login.captcha',
  登录: 'login.loginBtn',
  注册: 'login.registerBtn',

  // Navigation
  首页: 'nav.home',
  模板: 'nav.template',
  数据: 'nav.data',
  分析: 'nav.analysis',
  工作空间: 'nav.workspace',

  // Time
  刚刚: 'time.justNow',
  分钟前: 'time.minutesAgo',
  小时前: 'time.hoursAgo',
  天前: 'time.daysAgo',
  个月前: 'time.monthsAgo',
  年前: 'time.yearsAgo'
}

/**
 * Extract Chinese text from a Vue file content
 */
export function extractChineseText(content: string): string[] {
  const chineseTexts = new Set<string>()

  chineseTextPatterns.forEach((pattern) => {
    const matches = content.match(pattern)
    if (matches) {
      matches.forEach((match) => {
        // Clean up the match to get just the Chinese text
        const cleaned = match
          .replace(/^['"`>:\s(]+/, '')
          .replace(/['"`<\s)]+$/, '')
          .trim()

        if (cleaned && /[\u4e00-\u9fff]/.test(cleaned)) {
          chineseTexts.add(cleaned)
        }
      })
    }
  })

  return Array.from(chineseTexts).sort()
}

/**
 * Generate replacement suggestions for Chinese text
 */
export function generateReplacements(chineseTexts: string[]): Record<string, string> {
  const replacements: Record<string, string> = {}

  chineseTexts.forEach((text) => {
    if (commonTranslations[text]) {
      replacements[text] = `$t('${commonTranslations[text]}')`
    } else {
      // Generate a suggested key based on the content
      const key = generateTranslationKey(text)
      replacements[text] = `$t('${key}')`
    }
  })

  return replacements
}

/**
 * Generate a translation key from Chinese text
 */
function generateTranslationKey(text: string): string {
  // Simple key generation - could be improved
  const cleanText = text
    .replace(/[^\u4e00-\u9fff\w\s]/g, '')
    .trim()
    .substring(0, 20)

  // Convert to camelCase-like key
  const pinyin = convertToPinyin(cleanText) // This would need a pinyin library
  return `custom.${pinyin || 'text'}`
}

/**
 * Placeholder for pinyin conversion - would need actual implementation
 */
function convertToPinyin(text: string): string {
  // This is a placeholder - in real implementation, you'd use a library like pinyin
  return text.replace(/[\u4e00-\u9fff]/g, 'text')
}

export default {
  extractChineseText,
  generateReplacements,
  commonTranslations,
  chineseTextPatterns
}
