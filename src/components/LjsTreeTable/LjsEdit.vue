<template>
    <div class="ljsEdit" ref="edit" @keyup.enter="onEnter($event)" :style="column.style">
        <!--深度-->
        <slot name="deep"/>
        <!--图标-->
        <slot name="expand"/>
        <slot name="checkbox"/>
        <div @click.stop="onClick" style="width: 100%;height: 100%;">
            <input type="text" ref="input" @blur.stop="onBlur" @focus.stop="onInputFocus($event)"
                   v-model="value"
                   class="input"
                   @input="onInput"
                   :disabled="!edit"/>
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
                        if (this.edit)
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
                if (this.canEdit) {
                    this.valueBak = this.value
                } else {
                    this.value = this.valueBak
                }
            },
            getThis() {
                return this
            },
            onEnter(event) {
                this.edit = true
                var _this = this
                setTimeout(function () {
                    _this.$refs.input.focus()
                }, 1)
            },
            onInputFocus(event) {
                if (this.canEdit) {
                    //event.currentTarget.select()
                }
            },
            onClick() {
                if (!this.edit) {
                    this.focusStatus.data = this.data
                    this.focusStatus.column = this.column
                    this.edit = !this.edit
                    var _this = this
                    setTimeout(function () {
                        _this.$refs.input.focus()
                    }, 1)
                }
            },
            onBlur() {
                if (this.canEdit) {
                    if (this.inputChange) {
                        let update = this.driver.updater[this.data.pojo]
                        update(this.data, this.column)
                        this.edit = false
                        this.inputChange = false
                    } else
                        console.log('内容未改变,未更新')
                }
            }
        },
        data() {
            return {
                /**文本框内容是否改变*/
                inputChange: false,
                /**上次输入的值*/
                valueBak: this.data[this.column.key],
                items: this.$parent.rightMenu[this.data.pojo],
                driver: this.$parent.driver,
                edit: false,
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
        overflow: hidden;
    }

    .input {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        background: none;
        color: #333333;
    }

    .input:focus {
        border: 1px #66CC66 solid;
        width: 100%;
        height: 100%;
    }

    .input:disabled {
        width: 100%;
        height: 100%;
        border: none;

    }

    .text {
        color: #333333;
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        font-family: Arial, 微软雅黑, serif;
        font-size: 11px;
        text-overflow: ellipsis;
    }
</style>
