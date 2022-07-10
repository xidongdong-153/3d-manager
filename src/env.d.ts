/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 引入naive对应的定义类型
import { DialogApiInjection } from 'naive-ui/lib/dialog/src/DialogProvider'
import { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'

declare global {
  interface Window {
    $message: MessageApiInjection
    $dialog: DialogApiInjection
  }
}

// cesium 挂载全局
import { Viewer } from 'cesium'
declare global {
  interface Window {
    viewer: Viewer
  }
}
