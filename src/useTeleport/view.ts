import { computed, defineComponent, h, inject, markRaw, unref } from 'vue'
import type { InjectionKey, PropType } from 'vue'
import type { TeleportComponentData } from './types'

export const TeleportKey = Symbol('Teleport') as InjectionKey<Map<string | symbol, Set<TeleportComponentData>>>

export default defineComponent({
  name: 'TeleportView',
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Symbol] as PropType<string | symbol>,
      default: 'default',
    },
  },
  compatConfig: { MODE: 3 },
  setup({ name }) {
    const viewMap = inject(TeleportKey)

    const components = computed(() => [...viewMap?.get(name)?.values() ?? []])

    return () => components.value.map(item => h(item.Comp, {
      ...unref(item.props),
      ref: (el: unknown) => item.instance = el ? markRaw(el) : el,
      onVnodeMounted: () => {
        item.resolveInstance()
      },
    }))
  },
})