<a href="LICENSE">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
</a>

### 介绍
基于element-ui中的table组件,扩展了一些功能：键盘焦点控制、双击编辑

### 扩展的属性
#### <a href="https://element.eleme.io/#/zh-CN/component/table">table</a>:

事件:

| 名称        | 介绍                   | 类型                                                         |
| ----------- | ---------------------- | ------------------------------------------------------------ |
| text-change | 单元格数据编辑后的事件 | ( { row, column: { property } }: any, newText: string ) => void |

#### focus-el-table-column(扩展自:el-table-column):

props:

| 名称     | 介绍       | 类型    | 默认  |
| -------- | ---------- | ------- | ----- |
| editable | 是否可编辑 | Boolean | false |



### 安装

```bash
npm install ljs-tree-table
or
yarn add ljs-tree-table
```

### 使用
```bash
详见 src/example/view/baseElement.vue
```
### 其他
```javascript
// 模块未编译,vue.config.js需配置
transpileDependencies: ['ljs-tree-table']
```
