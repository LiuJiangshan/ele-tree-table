<a href="LICENSE">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
</a>

### 预览
![avatar](pre.png)
[查看Demo演示](https://ljs-tree-table.netlify.com)：(api使用静态数据模拟)
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
Vue.use(ljsTreeTable)
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
## 安装依赖
```bash
npm install
# OR
yarn install
```
## 运行
```bash
npm run dev
# OR
yarn run dev
```
## 编译examples
```bash
npm run build:example
# OR
yarn run build:example
```
## 编译ljs-tree-table
```bash
npm run build:table
# OR
yarn run build:table
```
## 单元测试(mocha)
```bash
npm run test:unit
# OR
yarn run test:unit
```
## 单元测试(karma)
```bash
npm run test:karma
# OR
yarn run test:karma
```
## e2e测试
```bash
npm run test:e2e
# OR
yarn run test:e2e
```
## 其他
依赖jquery、jquery-ui(仅在焦点控制时用到)
