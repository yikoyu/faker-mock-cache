type IpcRendererChannel =
  | 'Main'
  | 'UpdateMsg'
  | 'AddCount'
  | 'CheckUpdate'
  | 'DownloadUpdate'
  | 'QuitInstall'
  | 'WaitQuitInstall'

export interface IpcRenderer {
  send: (channel: IpcRendererChannel, data?: unknown) => void
  on: <T = any>(channel: string, fn: (result: T) => void) => void
  receive: <T = any>(channel: IpcRendererChannel) => Promise<T>
  invoke: <T = any>(channel: IpcRendererChannel, data?: unknown) => Promise<T>
}

declare module 'electron-updater' {
  interface UpdateInfo {
    force?: boolean
  }
}

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}
