# vue3-teleport-mount

**English** | [中文](https://github.com/Planck-Ho/vue3-teleport-mount/blob/main/README.zh-CN.md)

## Feature Description

Similar to the built-in Vue3 component `<Teleport>`, it renders components functionally to a specified location, solving the problem that when rendering components functionally, the components cannot obtain the `provide` values of their ancestor components.

## Installation

### 1. Register the Plugin `TeleportPlugin`

```ts
import { TeleportPlugin } from 'vue3-teleport-mount'

const app = createApp(App)
app.use(TeleportPlugin)
```

### 2. Set the "Teleport" Outlet `<TeleportView />`

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

## Example

```xml
<script setup lang="tsx">
import { useTeleport } from 'vue3-teleport-mount'

const { mount, unmount, getInstance } = useTeleport(
  defineAsyncComponent(() => import('./MyComponent.vue')), // Import the component via defineAsyncComponent to optimize performance.
)

const show = async () => {
  const res = await mount({
    title: 'Title', // Pass the props of the component.
  })
  res?.sayHi() // Call the component method.
}
</script>

<template>
  <el-button @click="show">
    Show
  </el-button>
  <el-button @click="unmount">
    Unmount
  </el-button>
</template>
```

## Type Definitions

### useTeleport

```ts
function useTeleport<T extends Component>(
  Comp: T,
  to?: string | symbol
): {
  getTeleportInstance: () => InstanceType<T> | undefined;
  mount: (props?: unknown) => Promise<InstanceType<T> | undefined;
  unmount: () => void;
}
```

### TeleportView

- Props

```ts
interface TeleportViewProps {
  /**
   * Container Name
   * Default Value: default
   */
  name?: string | symbol
}
```

- Example

```xml
<!-- Set the container name to the default value: default -->
<TeleportView />
<!-- Set the container name to: my-name -->
<TeleportView name="my-name" />
```

```xml
<script setup lang="tsx">
import { useTeleport } from 'vue3-teleport-mount'
import MyComponent from './MyComponent.vue'
import MyComponent2 from './MyComponent2.vue'

const { mount } = useTeleport(MyComponent) // "Teleport" to <TeleportView/>
const { mount: mount2 } = useTeleport(MyComponent2, 'my-name') // "Teleport" to <TeleportView name="my-name" />


</script>

<template>
  <el-button @click="mount">
    Show Component 1
  </el-button>
  <el-button @click="mount2">
    Show Component 2
  </el-button>

</template>
```
