import type { Component, Ref, VNode } from 'vue'

export type TeleportComponentData = {
  Comp: VNode | Component
  instance?: unknown
  resolveInstance: () => void
  props?: Record<string, unknown> | Ref<Record<string, unknown>>
}
