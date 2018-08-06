### 预览
![avatar](pre.png)
[查看Demo演示](https://liujiangshan.github.io/ljs-tree-table/dist/docs/index.html)：(api使用静态数据模拟)
## 运行此项目:
##### 1.[安装yarn](https://yarnpkg.com/zh-Hans/docs/install)
##### 2.克隆项目
```bash
git clone https://github.com/LiuJiangshan/ljs-tree-table.git
```
##### 3.进入项目目录
```bash
cd LjsTreeTable
```
##### 4.安装依赖库
```bash
yarn
```
##### 5.运行项目
```bash
yarn run dev
```
##### 6.打开浏览器访问:[http://localhost:8080](http://localhost:8080)

## 使用组件:
### 方法1(cdn引用)
##### 1.在index.html中
```javascript
<script type="application/javascript" src="//liujiangshan.github.io/LjsTreeTable/dist/lib/index.js"></script>
```
#### 2.main.js中
```
Vue.component(ljsTreeTable.name,ljsTreeTable)
```
#### 3.Vue文件中(同方法二中第4步)
### 方法2(yarn安装)
```
yarn add liujiangshan/ljs-tree-table
```
##### 3.在main.js中引入该组件:
```javascript
import ljsTreeTable from 'ljs-tree-table'
...
Vue.use(ljsTreeTable)
...
```
##### 4.vue文件:
```javascript
<template>
  <div>
    <ljs-tree-table :datas="datas" :columns="columns"/>
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
## 编译组件
```bash
yarn run build
```
## 编译该项目示例
```bash
yarn run doc
```
## 其他
依赖jquery、jquery-ui(仅在焦点控制时用到)
