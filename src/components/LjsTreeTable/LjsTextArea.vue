<!--自动换行的textarea-->
<template>
    <input v-if="onlyOne" :a="onlyOne" class="ljs_input"
           @input="handleInput"
           @focus="handleFocus"
           :style="inputStyle"
           @blur="handleBlur"
           @click="handleClick"
           :value="currentValue"/>
    <textarea v-else class="ljs_text_area"
              rows="1"
              @input="handleInput"
              @focus="handleFocus"
              :style="inputStyle"
              @click="handleClick"
              @blur="handleBlur"
              :value="currentValue"></textarea>
</template>
<script>
  export default {
    name: 'LjsTextArea',
    props: {
      lineHeight: {
        type: Number,
        default: 28
      },
      // 单行模式
      onlyOne: {
        type: Boolean,
        default: false
      },
      // 编辑时自动选中文本内容
      autoSelect: {
        type: Boolean,
        default: false
      },
      // 文本框内容
      value: {
        default: ''
      }
    },
    computed: {
      column () { return this.$parent.column },
      inputStyle: {
        get () {
          let inputStyle = {lineHeight: this.lineHeight + 'px'}
          if (this.onlyOne) {
            inputStyle.height = this.parentHeight + 'px'
          } else {
            inputStyle.height = this.parentHeight + 'px'
          }
          return inputStyle
        }
      },
      trHeight () {
        return this.$parent.tr.height
      },
      trHeights () {
        return this.$parent.tr.heights
      }
    },
    watch: {
      trHeights () {
        console.log('检查到tr变化')
        this.autoLine()
      },
      value (newValue, oldValue) {
        if (!this.focused) this.currentValue = newValue
      }
    },
    methods: {
      select () {
        this.$el.select()
      },
      handleClick () {
      },
      handleInput (event) {
        this.autoLine()
        this.$emit('input', event.target.value)
      },
      handleFocus () {
        this.focus = true
        if (this.autoSelect) setTimeout(this.select, 1)
        this.$emit('focus')
      },
      handleBlur () {
        this.focus = false
        this.$emit('blur')
      },
      autoLine () {
        if (!this.onlyOne) {
          let textarea = this.$el
          textarea.style.height = 'auto'
          let scrollHeight = textarea.scrollHeight
          let height
          if (this.trHeight > scrollHeight) {
            height = this.trHeight + 'px'
            console.log('填满父容器完成:', height)
          } else {
            this.$parent.tr.heights[this.column.index] = scrollHeight
            height = scrollHeight + 'px'
            console.log('撑大父容器完成:', height)
          }
          textarea.style.height = height
        }
      }
    },
    data () {
      return {
        focused: false,
        currentValue: this.value
      }
    },
    mounted () {
      this.autoLine()
    },
    updated () {
      this.autoLine()
    }
  }
</script>

<style lang="scss" scoped>
    .ljs_text {
        width: 100%;
        border: none;
        outline: none;
        background: none;
        vertical-align: middle;
        overflow: hidden;
        font-family: Arial, 微软雅黑, serif;
        font-size: 11px;
        color: #333333;
        padding: 0;
        margin: 0;
    }

    .ljs_input {
        @extend .ljs_text;
    }

    .ljs_text_area {
        line-height: 1;
        @extend .ljs_text;
        resize: none;
    }
</style>