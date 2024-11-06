import type { ExtractPublicPropTypes, Plugin, Ref } from 'vue'
import { inject, markRaw, onScopeDispose, reactive } from 'vue'
import TeleportView, { TeleportKey } from './view'
import type { TeleportComponentData } from './types'

const TeleportPlugin = {
  install(app) {
    app.provide(TeleportKey, reactive(new Map()))
  },
} as Plugin

function useTeleport<T extends TeleportComponentData['Comp']>(Comp: T, to: string | symbol = 'default') {
  const teleportViewsMap = inject(TeleportKey)
  if (!teleportViewsMap) {
    throw new Error('没有找到teleportViewsMap，请注册插件TeleportPlugin')
  }

  type Instance = T extends abstract new (...args: any) => any ? InstanceType<T> : T

  const teleportComponentData: TeleportComponentData = {
    Comp: markRaw(Comp),
    resolveInstance: () => { },
  }

  const unmount = () => {
    teleportViewsMap?.get(to)?.delete(teleportComponentData)
  }

  const getTeleportInstance = () => {
    return teleportComponentData.instance as (Instance | undefined)
  }

  type Props = ExtractPublicPropTypes<Instance['$props']>

  const mount = async (props?: Props | Ref<Props>) => {
    let views = teleportViewsMap.get(to)
    teleportComponentData.props = props
    if (views?.has(teleportComponentData)) {
      return getTeleportInstance()
    }
    const p = new Promise<Instance | undefined>((resolve) => {
      teleportComponentData.resolveInstance = () => {
        resolve(getTeleportInstance())
      }
    })
    if (views) {
      views.add(teleportComponentData)
    }
    else {
      views = new Set()
      views.add(teleportComponentData)
      teleportViewsMap.set(to, views)
    }

    return p
  }

  onScopeDispose(unmount)

  return {
    getTeleportInstance,
    mount,
    unmount,
  }
}

export {
  TeleportPlugin,
  useTeleport,
  TeleportView,
}
