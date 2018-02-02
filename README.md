[查看Demo演示](https://liujiangshan.github.io/LjsTreeTable/docs)：由于没有服务端，异步加载无效
## 运行此项目:
##### 1.安装yarn
##### 2.克隆项目
```bash
git clone https://github.com/LiuJiangshan/Vue-LjsTreeTable.git
```
##### 3.进入项目目录
```bash
cd Vue-LjsTreeTable
```
##### 4.安装依赖库
```bash
yarn install
```
##### 5.运行项目
```bash
yarn run dev
```
##### 6.打开浏览器访问:[http://localhost:8080](http://localhost:8080)

## 使用组件:
##### 1.复制该项目dist文件夹至你的项目node_modules文件夹
##### 2.将dist命名为LjsTreeTable
##### 3.在main.js中引入该组件:
```javascript
import LjsTreeTable from 'LjsTreeTable'
...
Vue.use(LjsTreeTable)
...
```
##### 4.vue文件:
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
## 编译自己的LjsTreeTable组件
```bash
yarn run build
```
## 编译该项目示例
```bash
yarn run doc
```
