<template>
  <div class="cell-wrap">
    <div ref="edit" v-show="edit" class="text-edit focus-border" contenteditable="true" @keydown="handKeyDown"
         @blur="handEditBlur"
         @focus="handEditFocus" @input="handEditInput">{{cellText}}
    </div>
    <div ref="preview" v-show="!edit" class="preview focus-border" contenteditable="false" tabindex="0"
         @focus="handPreViewFocus"
         @blur="handPreViewBlur"
         @dblclick="handPreViewDbClick" @keydown="handKeyDown">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ components: {}, props: { editable: { type: Boolean }, data: {} } })
export default class CellWrap extends Vue {
  edit = false

  updated () {
    const { edit, editRef } = this
    if (edit) editRef.focus()
  }

  get cellText () {
    const { data: { row, column: { property } } } = this.$props
    return row[property]
  }

  get editRef () {
    return this.$refs.edit as HTMLElement
  }

  get previewRef () {
    return this.$refs.preview as HTMLElement
  }

  mounted () {
    const { td, cell, previewRef } = this
    if (previewRef) {
      td.style.paddingTop = '0'
      td.style.paddingBottom = '0'

      cell.style.paddingLeft = '0'
      cell.style.paddingRight = '0'

      cell.style.height = '100%'
    }
  }

  //
  // syncWidth () {
  //   const { td, el } = this
  //   el.style.width = `${td.clientWidth}px`
  // }
  //
  // syncHeight () {
  //   const { td, el } = this
  //   el.style.height = `${td.clientHeight}px`
  // }

  /**
   * 同步父节点宽高
   * */
  // syncSize () {
  //   const { syncWidth, syncHeight } = this
  //   syncWidth()
  //   syncHeight()
  // }

  get td () {
    return this.$el.parentNode as HTMLElement
  }

  get cell () {
    return this.td.childNodes[0] as HTMLElement
  }

  get tr () {
    return this.td.parentNode as HTMLElement
  }

  get tBody () {
    return this.tr.parentNode as HTMLElement
  }

  get x () {
    const { td, tr } = this
    const x = Array.from(tr.childNodes).indexOf(td)
    return x
  }

  get y () {
    const { tr, tBody } = this
    const y = Array.from(tBody.childNodes).indexOf(tr)
    return y
  }

  moveTo (x: number, y: number) {
    const { tBody } = this
    try {
      const targetTr = tBody.childNodes[y]
      const targetTd = targetTr.childNodes[x]
      const targetCell = targetTd.childNodes[0].childNodes[1] as HTMLElement
      targetCell.focus()
    } catch (e) {
    }
  }

  move (moveX: number, moveY: number) {
    const { x, y } = this
    this.moveTo(x + moveX, y + moveY)
  }

  handKeyDown (e: any) {
    const { move } = this
    const { key } = e
    switch (key) {
      case 'ArrowUp':
        move(0, -1)
        break
      case 'ArrowDown':
        move(0, 1)
        break
      case 'ArrowLeft':
        move(-1, 0)
        break
      case 'ArrowRight':
        move(1, 0)
        break
    }
  }

  handPreViewFocus () {
    this.$emit('currentFocus', this.y)
  }

  handPreViewBlur () {
  }

  handPreViewDbClick () {
    const { editable } = this.$props
    if (editable) this.edit = true
  }

  handEditFocus () {
  }

  handEditBlur () {
    this.edit = false
    const { data } = this.$props
    const { row, column: { property } } = data
    const newText = this.editRef.innerText
    if (row[property] !== newText) this.$emit('textChange', data, newText)
  }

  handEditInput (e: any) {
    const { data } = e
  }
}

</script>

<style lang="scss" scoped>
  @import "~ljs-sass/src/mixin";

  .cell-wrap {
    @include wh100;

    > div {
      @include wh100;
      line-height: 35px;
      min-height: 35px;
    }
  }

  .focus-border {
    outline: none;
    resize: none;
    box-sizing: border-box;
    vertical-align: middle;
    @include wh100;

    &:focus {
      outline: #42fa35 1px solid;
      outline-offset: -1px;
    }
  }

  .preview {
    padding: 6px 10px;
  }

  .text-edit {
    padding: 0;
    overflow: hidden;
    word-break: break-all;
  }
</style>
