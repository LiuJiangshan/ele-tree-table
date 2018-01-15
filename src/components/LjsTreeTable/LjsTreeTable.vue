<template>
    <div style="width: 100%;height: 100%;">
        <div style="width: 1000px;height: 500px;overflow: scroll;">
            <LjsContextMenu ref="menu" :context="this"/>
            <div style="display: table;width: 100%;">
                <!--表头-->
                <div class="th">
                    <div class="thd" :style="column.style" v-for="column in columns">
                        <Checkbox v-if="column.check" style="padding-left: 27px;" @on-change="selectAll"
                                  v-model="check">
                            <span v-html="column.label"></span>
                        </Checkbox>
                        <span v-else v-html="column.label"></span>
                    </div>
                </div>
                <!--表内容-->
                <template v-for="data in expandDatas">
                    <div v-if="isExpand(data)" class="tr" tabindex="0"
                         @contextmenu.prevent="$refs.menu.open($event,getContextItems(data),getMenuContext(data))">
                        <div class="td" v-for="column in columns">
                            <template v-if="!column.type||column.type===data.pojo">
                                <!--自定义渲染-->
                                <RenderDiv v-if="column.render" :driver="driver" :render="column.render" :data="data"
                                           :column="column">
                                </RenderDiv>
                                <LjsEditTd v-if="!column.render" :data="data" :column="column"
                                           :text="column.text" @on-check="onCheck">
                                    <template v-if="column.expand">
                                        <div slot="deep"
                                             style="margin-left:4px;height: 100%;display: flex;flex-direction: row;align-items: center;">
                                            <div style="width: 1px;height: 100%;display: block;border-left: 1px #66CC66 solid;"></div>
                                            <div style="height: 1px;display: block;border-bottom: 1px #66CC66 solid;"
                                                 :style="{width: data.deep*deepWidth+'px'}"></div>
                                        </div>
                                        <LjsExpand slot="expand" :show="(typeof data.kids)==='number'&&data.kids>0"
                                                   :expand="data.expand"
                                                   @on-expand="onExpandIconClick(data)"/>
                                    </template>
                                    <Checkbox slot="checkbox" v-if="column.check" type="checkbox" v-model="data.check"
                                              @on-change="onCheck"></Checkbox>

                                </LjsEditTd>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
            <div v-if="!expandDatas||expandDatas.length===0"
                 style="width:100%;height: 50px;text-align:center;line-height: 50px;vertical-align: middle;"
                 @contextmenu.prevent="$refs.menu.open($event,rightMenu.empty,getMenuContext())">
                暂无数据
            </div>
        </div>
        <template v-if="debug">
            <div>
                <input type="button" value="原始数据" @click="printDatas"/>
                <input type="button" value="转换后的数据" @click="printFormated"/>
                <input type="button" value="重新格式化数据" @click="formatNode(datas)"/>
                <input type="button" value="刷新" @click="refresh"/>
                <input type="button" value="当前焦点行" @click="nowFocus"/>
                <input type="button" value="查看右键菜单定义" @click="showRightMenu"/>
                <input type="button" value="查看列定义" @click="showColunm"/>
            </div>
            <div>
                <div style="border: 1px red solid">
                    <h4>版本v1.0 2018.01.08</h4>
                    <div>
                        <p>1.实现延迟加载节点</p>
                        <p>2.实现添加同级节点</p>
                        <p>3.实现添加子级节点</p>
                        <p>4.实现删除节点</p>
                        <p>5.右键菜单自定义</p>
                        <p>5.右键菜单自定义</p>
                    </div>
                </div>
                <div style="border: 1px red solid">
                    <h4>版本v1.1 2018.01.10</h4>
                    <div>
                        <p>1.空数据右键事件(定义为rightMenu['empty'])</p>
                        <p>2.添加全选、全部取消,当多选发生变化会触发事件on-check(selectDatas)</p>
                        <p>3.column定义添加属性text(data,column),用于获取当前显示文字</p>
                        <p>4.取消使用事件总线bus</p>
                        <p>5.优化可展开图标组件</p>
                        <p>6.实现点击单元格直接编辑</p>
                        <p>7.修复删除节点时一次删除多个节点(Array.splice(index,count))</p>
                        <p>8.添加线条</p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    import RenderDiv from './renderDiv.js'
    import LjsEditTd from './LjsEdit.vue'
    import LjsContextMenu from './LjsContextMenu.vue'
    import LjsExpand from './LjsExpand.vue'

    export default {
        name: "LjsTreeTable",
        props: {
            //子节点加载器
            driver: {
                type: Object,
                default() {
                    return {}
                }
            },
            //右键菜单定义
            rightMenu: {
                type: Object,
                default() {
                    return {}
                }
            },
            //列定义
            columns: {
                type: Array,
                default() {
                    return []
                }
            },
            //数据
            datas: {
                type: Array,
                default() {
                    return []
                }
            },
            //展开事件
            onExpand: {
                type: Function,
                default: undefined
            },
            //收起事件
            onClose: {
                type: Function,
                default: undefined
            },
            //判断是否root节点
            isRoot: {
                type: Function,
                default: undefined
            },
            //是否显示debug视图
            debug: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            datas(newVal) {
                this.formatNode(this.datas)
                this.refresh()
            }
        },
        components: {RenderDiv, LjsEditTd, LjsContextMenu, LjsExpand},
        data() {
            return {
                deepWidth: 30,
                //是否全选
                check: false,
                //格式化数据
                expandDatas: [],
                focusStatus: {
                    data: {},
                    column: {},
                }
            }
        },
        methods: {
            selectAll(check) {
                for (let v = 0; v < this.expandDatas.length; v++)
                    this.expandDatas[v].check = check
                this.onCheck();
            },
            onCheck() {
                let checkDatas = [];
                for (let v = 0; v < this.expandDatas.length; v++) {
                    let data = this.expandDatas[v]
                    if (data.check)
                        checkDatas.push(data)
                }
                this.$emit('on-check', checkDatas)
            },
            getMenuContext(data) {
                return {
                    //当前行数据
                    data: data,
                    driver: this.driver,
                    brother: this.brother,
                    son: this.son,
                    remove: this.remove,
                    root: this.root
                }
            },
            getContextItems(data) {
                return this.rightMenu[data.pojo]
            },
            onExpandIconClick(data) {
                let setExpand = this.setExpand;
                let goOn = function () {
                    setExpand(data, !(data.expand === true))
                };
                //收起
                if (data.expand) {
                    if (this.onClose) {
                        this.onClose(data, goOn)
                        return
                    }
                }
                //展开
                else {
                    if (this.onExpand) {
                        this.onExpand(data, goOn)
                        return
                    }
                }
                goOn()
            },
            isExpand(data) {
                try {
                    let re
                    if (this.isRoot(data))
                        re = true
                    else if (data.father.expand === true)
                        re = true
                    else
                        re = false
                    return re
                }
                catch (e) {
                    console.log('error:', data.name)
                }
            },
            getAllData(datas) {
                var array = []
                if (datas instanceof Array) {
                    for (let v = 0; v < datas.length; v++) {
                        let data = datas[v]
                        if (this.isExpand(data))
                            array.push(data)
                        if (data.expand && data.nodes)
                            array = [...array, ...this.getAllData(data.nodes)]
                    }
                }
                return array
            },
            //设置某个节点是否展开
            setExpand(node, expand) {
                let formatNode = this.formatNode
                let refresh = this.refresh
                let loader = this.driver.loader;

                node.expand = expand
                //格式化待展开节点
                if (node.nodes instanceof Array)
                    for (let v = 0; v < node.nodes.length; v++)
                        formatNode(node.nodes[v], node)

                //展开
                if (expand) {
                    //加载子节点
                    if (node.nodes === true) {
                        let loadFunction = loader[node.pojo]
                        if (loadFunction instanceof Function) {
                            let okDo = function () {
                                formatNode(node.nodes, node)
                                refresh()
                            }
                            loadFunction(node, okDo)
                        }
                    }
                    else
                        refresh()
                }
                else
                    refresh()
            },
            //递归格式化节点
            formatNode(node, father) {
                var formatNode = this.formatNode
                father = (father === undefined) ? false : father
                if (node instanceof Array) {
                    node.map(function (v) {
                        formatNode(v, father)
                    })
                } else if (node instanceof Object) {
                    //格式化root节点
                    if (this.isRoot(node)) {
                        node['father'] = false
                        node['deep'] = 0
                        if (node.expand === undefined)
                            node['expand'] = false
                    }
                    //格式化子节点
                    else {
                        node['father'] = father
                        node['deep'] = father.deep + 1
                        if (node.expand === undefined)
                            node['expand'] = false
                        else if (node.expand === true) {
                            if (node.nodes instanceof Array) {
                                node.nodes.map(function (value) {
                                    formatNode(value, node)
                                })
                            }
                        }
                    }
                }
            },
            showRightMenu() {
                console.log(this.rightMenu)
            },
            showColunm() {
                console.log(this.columns)
            },
            nowFocus() {
                console.log(this.focusStatus)
            },
            refresh() {
                this.expandDatas = this.getAllData(this.datas)
            },
            printDatas() {
                console.log(this.datas)
            },
            printFormated() {
                console.log(this.expandDatas)
            },
            //添加根节点
            root(data) {
                this.formatNode(data, undefined)
                this.datas.push(data)
            },
            //添加兄弟节点
            brother(data, brother) {
                this.formatNode(brother, data.father)
                if (this.isRoot(data))
                    this.datas.push(brother)
                else
                    data.father.nodes.push(brother)
                this.refresh()
            },
            //添加子节点
            son(data, son) {
                this.formatNode(son, data)
                data.kids++
                //节点已经展开
                if (data.expand) {
                    data.nodes.push(son)
                    this.refresh()
                }
                else
                    data.nodes = true
            },
            //删除节点
            remove(data) {
                var nodes;
                var father
                if (this.isRoot(data))
                    nodes = this.datas
                else if (data.father) {
                    father = data.father
                    nodes = data.father.nodes
                }
                if (nodes instanceof Array) {
                    for (var v = 0; v < nodes.length; v++) {
                        if (nodes[v] === data) {
                            console.log('删除前:', nodes.length)
                            nodes.splice(v, 1)
                            console.log('删除后:', nodes.length)
                            if (father)
                                father.kids--
                            this.refresh()
                            break
                        }
                    }
                }
            }
        },
        created() {
            this.formatNode(this.datas)
            this.refresh()
        }
    }
</script>
<style scoped>
    .th {
        display: table-header-group;
        background-color: #F2F2F2;
        height: 30px;
    }

    .tr {
        display: table-row;
        outline: 0;
        min-height: 28px;
        background-color: white;
    }

    .tr:hover {
        background-color: #fafafa;
    }

    .tr:focus {
        background-color: #f5f5f5;
    }

    .thd {
        display: table-cell;
        border-bottom: 1px solid #E4E4E4;
        height: 30px;
        vertical-align: middle;
        line-height: 30px;
    }

    .td {
        display: table-cell;
        border-bottom: 1px solid #E4E4E4;
        height: 28px;
        vertical-align: middle;
        line-height: 28px;
    }

</style>
