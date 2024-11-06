# vue3-teleport-mount

类似Vue3内置组件`<Teleport>`，通过函数式渲染组件到指定位置，解决函数式渲染组件时，组件无法获取到祖先组件`provide`值的问题

[English](https://github.com/Planck-Ho/vue3-teleport-mount/blob/main/README.md) | **中文**


## 安装

```bash
npm install vue3-teleport-mount
# Or use pnpm
pnpm install vue3-teleport-mount
```

## 使用
1. 注册插件`TeleportPlugin`

```ts
import { TeleportPlugin } from 'vue3-teleport-mount'

const app = createApp(App)
app.use(TeleportPlugin)
```

2. 设置“传送”出口`<TeleportView />`

```xml
<script setup>
import { TeleportView } from 'vue3-teleport-mount'
</script>

<template>
  <el-config-provider namespace="my-el">
    <TeleportView />
  </el-config-provider>
</template>
```

## 示例

```xml
<script setup lang="tsx">
import { useTeleport } from 'vue3-teleport-mount'

const { mount, unmount, getInstance } = useTeleport(
  defineAsyncComponent(() => import('./MyComponent.vue')), // 通过defineAsyncComponent引入组件，优化性能
)

const show = async () => {
  const res = await mount({
    title: '标题', // 传递组件的props
  })
  res?.sayHi() // 调用组件方法
}
</script>

<template>
  <el-button @click="show">
    显示
  </el-button>
  <el-button @click="unmount">
    卸载
  </el-button>
</template>
```

## 类型定义

### useTeleport

```ts
function useTeleport<T extends Component>(
  Comp: T,
  to?: string | symbol
): {
  getTeleportInstance: () => InstanceType<T> | undefined
  mount: (props?: unknown) => Promise<InstanceType<T> | undefined>
  unmount: () => void
}
```

### TeleportView

- props

```ts
interface TeleportViewProps {
  /**
   * 容器名称
   * 默认值：default
   */
  name?: string | symbol
}
```

- 示例

```xml
<!-- 设置容器名称为默认值：default -->
<TeleportView />
<!-- 设置容器名称为：my-name -->
<TeleportView name="my-name" />
```

```xml
<script setup lang="tsx">
import { useTeleport } from 'vue3-teleport-mount'
import MyComponent from './MyComponent.vue'
import MyComponent2 from './MyComponent2.vue'

const { mount } = useTeleport(MyComponent) // "传送"到 <TeleportView/>
const { mount: mount2 } = useTeleport(MyComponent2, 'my-name') // "传送"到 <TeleportView name="my-name" />


</script>

<template>
  <el-button @click="mount">
    显示组件1
  </el-button>
  <el-button @click="mount2">
    显示组件2
  </el-button>

</template>
```
