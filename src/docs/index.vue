<template>
  <div class="body">
    <Menu :router="true" class="ElMenu-demo" mode="horizontal">
      <ElMenuItem index="LoadServerData">异步加载示例</ElMenuItem>
      <ElMenuItem index="NavTree">NavTree</ElMenuItem>
      <ElMenuItem index="LoadLocalData">简单列表示例</ElMenuItem>
      <ElMenuItem index="autoLine">自动换行示例</ElMenuItem>
      <ElMenuItem index="border">边框示例</ElMenuItem>
      <ElMenuItem index="SubmitAllChange">批量提交示例</ElMenuItem>
      <ElMenuItem index="mCheckBoxTest">mCheckBoxTest</ElMenuItem>
      <ElMenuItem index="TreeNodeTest">TreeNodeTest</ElMenuItem>
      <ElMenuItem index="mExpandTest">mExpandTest</ElMenuItem>
      <Submenu index="2">
        <template slot="title">我的工作台</template>
        <ElMenuItem index="2-1">选项1</ElMenuItem>
        <ElMenuItem index="2-2">选项2</ElMenuItem>
        <Submenu index="2-4">
          <template slot="title">选项4</template>
          <ElMenuItem index="2-4-1">选项1</ElMenuItem>
          <ElMenuItem index="2-4-2">选项2</ElMenuItem>
          <ElMenuItem index="2-4-3">选项3</ElMenuItem>
        </Submenu>
      </Submenu>
    </Menu>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { Menu, MenuItem, Submenu } from 'element-ui'

export default {
  name: 'index',
  components: {Menu, 'ElMenuItem': MenuItem, Submenu},
  mounted () { }
}
</script>
<style lang="scss" scoped>
  .body {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
