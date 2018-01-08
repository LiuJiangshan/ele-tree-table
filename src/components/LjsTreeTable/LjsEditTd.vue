<template>
  <div class="ljsEdit" ref="edit" @focus="onTdFocus" @keyup.enter="onEnter($event)">
    <div v-on:dblclick.stop="dbClick"
         style="display: flex;flex-direction: row;align-items: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;width: 100%;height: 100%;">
      <!--深度-->
      <div v-if="column.expand"
           style="height: 2px;display: block;"
           :style="{width: data.deep*deepWidth+'px'}"></div>
      <!--图标-->
      <LjsExpand :visibility="data.nodes!==false&&data.kids!==0" :expand="expand" v-on:expandChange="onExpandChange"
                 v-if="column.expand"/>
      <div
        v-on:dblclick.stop.prevent="function() {}">
        <Checkbox type="checkbox" v-if="column.check" v-model="data['check']"></Checkbox>
      </div>
      <div v-html="text()" v-if="!isEdit" class="text" style="overflow: hidden;"></div>
      <input :type="text" ref="input" v-if="isEdit" @blur.stop="onBlur" @focus.stop="onInputFocus($event)"
             v-model="data[column.key]" class="input"/>
    </div>
  </div>
</template>
<script>
  import LjsExpand from './LjsExpand.vue'
  import LjsContextMenu from './LjsContextMenu.vue'

  export default {
    name: "LjsEditTd",
    components: {LjsExpand, LjsContextMenu},
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
      isEdit: {
        get() {
          return this.edit
        },
        set(val) {
          this.edit = val
        }
      }
    },
    methods: {
      getThis() {
        return this
      },
      onExpandChange(newStatus) {
        this.expand = newStatus
        this.$parent.onExpandIconClick(this.data)
      },
      onEnter(event) {
        this.edit = true
        var _this = this
        setTimeout(function () {
          _this.$refs.input.focus()
        }, 1)
      },
      onInputFocus(event) {
        if (this.column.edit === false) {
          console.log(this.column.label + ' 不允许编辑')
          this.edit = false
          var _this = this
          setTimeout(function () {
            _this.$refs.edit.focus()
          }, 1)
          return
        }
        //event.currentTarget.select();
      },
      onTdFocus() {
        this.focusStatus.data = this.data
        this.focusStatus.column = this.column
      },
      dbClick() {
        this.isEdit = !this.isEdit
        var _this = this
        setTimeout(function () {
          _this.$refs.input.focus()
        }, 1)
      },
      onBlur() {
        if (this.column.edit === false)
          return
        var update = this.driver.updater[this.data.pojo]
        update(this.data, this.column)
        this.isEdit = false
      }
    }
    ,
    data() {
      return {
        items: this.$parent.rightMenu[this.data.pojo],
        driver: this.$parent.driver,
        edit: false,
        deepWidth: 30,
        focusStatus: this.$parent.focusStatus,
        position: {x: 0, y: 0},
        expand: this.data.expand || this.data.root
      }
    }
    ,
    created() {
    }
  }
</script>
<style scoped>
  .ljsEdit {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    outline: 0;
  }

  .ljsEdit:focus {
  }

  .input {
    width: 100%;
    font-family: Arial, 微软雅黑, serif;
    font-size: 11px;
    height: 100%;
    color: #333333;
    outline: 0;
    border: 1px #66CC66 solid;
  }

  .input:focus {
    background-color: #f5f5f5;
  }

  .text {
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    font-family: Arial, 微软雅黑, serif;
    font-size: 11px;
    text-overflow: ellipsis;
    width: 100%;
    height: 100%;
  }
</style>
