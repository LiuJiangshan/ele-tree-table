<template>
    <div class="ljsEdit" ref="edit" @keyup.enter="onEnter($event)" :style="column.style">
        <!--深度-->
        <slot name="deep"/>
        <!--图标-->
        <slot name="expand"/>
        <slot name="checkbox"/>
        <div @click.stop="onClick" style="width: 100%;height: 100%;">
            <textarea ref="textare" @blur.stop="onBlur" @focus.stop="onFocus($event)"
                      v-model="value"
                      class="textare"
                      @input="onInput"
                      :disabled="!focus"></textarea>
        </div>
    </div>
</template>
<script>
    export default {
        name: "LjsEditTd",
        props: {
            data: {
                type: Object,
                default() {
                    return {}
                }
            },
            column: {
                type: Object,
                default() {
                    return {}
                }
            },
            text: {
                type: Function,
                default: function () {
                    var text = this.data[this.column.key]
                    return text ? text : '空'
                }
            }
        },
        computed: {
            /**显示的文本*/
            value:
                {
                    get() {
                        if (this.focus)
                            return this.data[this.column.key]
                        else
                            return this.text(this.data, this.column)
                    },
                    set(val) {
                        this.data[this.column.key] = val
                    }
                },
            /**是否可编辑*/
            canEdit: {
                get() {
                    return this.column.edit !== false
                },
                set(val) {
                    console.log('不支持')
                }
            }
        },
        methods: {
            onInput(evt) {
                this.inputChange = true
                //该列允许编辑
                if (this.canEdit)
                    this.valueBak = this.value
                //该列不允许编辑
                else {
                    this.value = this.valueBak
                    console.log('该列不允许编辑!')
                }
            },
            getThis() {
                return this
            },
            onEnter(event) {
                this.focus = true
                var _this = this
                setTimeout(function () {
                    _this.$refs.textare.focus()
                }, 1)
            },
            onFocus(event) {
                this.focus = true
                if (this.canEdit) {
                    //event.currentTarget.select()
                }
            },
            onClick() {
                //未获取焦点
                if (this.focus === false) {
                    this.focusStatus.data = this.data
                    this.focusStatus.column = this.column
                    this.focus = true
                    var _this = this
                    setTimeout(function () {
                        _this.$refs.textare.focus()
                    }, 1)
                }
            },
            onBlur() {
                this.focus = false
                if (this.canEdit) {
                    if (this.inputChange) {
                        let update = this.driver.updater[this.data.pojo]
                        update(this.data, this.column)
                        this.inputChange = false
                    } else
                        console.log('内容未改变,未更新')
                }
            }
        },
        data() {
            return {
                /**是否处于焦点*/
                focus: false,
                /**文本框内容是否改变*/
                inputChange: false,
                /**上次输入的值*/
                valueBak: this.data[this.column.key],
                items: this.$parent.rightMenu[this.data.pojo],
                driver: this.$parent.driver,
                focusStatus: this.$parent.focusStatus,
                position: {x: 0, y: 0}
            }
        },
        created() {
        }
    }
</script>
<style scoped>
    .ljsEdit {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }

    .textare {
        white-space: nowrap;
        resize: none;
        overflow: hidden;
        font-family: Arial, 微软雅黑, serif;
        font-size: 11px;
        display: block;
        text-overflow: ellipsis;
        border: 1px Transparent solid;
        width: 100%;
        height: 28px;
        background: none;
        color: #333333;
        box-sizing: border-box;
        outline: none;
    }

    .textare:focus {
        border: 1px #66CC66 solid;
    }

    .textare:disabled {
        border: 1px Transparent solid;
    }
</style>
