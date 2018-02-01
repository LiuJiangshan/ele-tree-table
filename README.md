[查看Demo演示](https://liujiangshan.github.io/Vue-LjsTreeTable-Doc)

####运行此项目:
#####1.安装yarn
#####2.git clone https://github.com/LiuJiangshan/Vue-LjsTreeTable.git
#####3.cd Vue-LjsTreeTable
#####4.yarn install
#####5.yarn run dev
#####6.打开浏览器进入:http://localhost:8080

####使用组件:
#####1.赋值该项目dist文件夹至你的项目node_modules文件夹
#####2.将dist命名为treetable
#####3.在main.js中:
```javascript
import treetable from 'treetable'
...
Vue.use(TreeTable)
...
```
#####4.vue文件:
```javascript
<template>
<div>
  <treetable :datas="datas" :columns="columns"/>
  ...
</div>
</template>

<script>
...
</script>

<style>
...
</style>

```