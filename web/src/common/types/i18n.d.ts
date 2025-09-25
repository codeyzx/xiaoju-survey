export {}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: string, values?: any) => string
  }
}
