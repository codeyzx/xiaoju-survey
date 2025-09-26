/**
 * in: include, selected, any
 * eq: equal, selected, all
 * nin: not include, not selected, any
 * neq: not equal, not selected, all, can implement "filled"
 */
export enum Operator {
  Include = 'in',
  Equal = 'eq',
  NotEqual = 'neq',
  NotInclude = 'nin'
}

export enum PrefixID {
  Rule = 'r',
  Condition = 'c'
}

export enum Scope {
  Question = 'question',
  Option = 'option'
}

export type FieldTypes = string | string[]

// 定义事实对象类型
export type Fact = {
  [key: string]: any
}
