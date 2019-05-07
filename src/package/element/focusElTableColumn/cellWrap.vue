<template>
  <div class="cell-wrap">
    <div ref="edit" v-show="edit" class="text-edit focus-border" contenteditable="true" @keydown="handEditKeyDown"
         @blur="handEditBlur"
         @focus="handEditFocus" @input="handEditInput" v-text="cellText">
    </div>
    <div ref="preview" v-show="!edit" class="preview focus-border" contenteditable="true" tabindex="0"
         @focus="handPreViewFocus"
         @blur="handPreViewBlur" @keydown="handPreviewKeyDown">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ components: {}, props: { editable: { type: Boolean }, data: {} } })
export default class CellWrap extends Vue {
  edit = false

  cellText = ''

  updated () {
    const { edit, editRef } = this
    if (edit) editRef.focus()
  }

  get editRef () {
    return this.$refs.edit as HTMLElement
  }

  get previewRef () {
    return this.$refs.preview as HTMLElement
  }

  setTdFocusStyle () {
    const { td } = this
    td.style.outline = '#42fa35 1px solid'
    td.style.outlineOffset = '-1px'
  }

  setTdBlurStyle () {
    const { td } = this
    td.style.outline = 'none'
  }

  mounted () {
    const { td, cell, previewRef, handTdDbClick, handTdClick } = this
    if (previewRef) {
      td.style.paddingTop = '0'
      td.style.paddingBottom = '0'

      cell.style.paddingLeft = '0'
      cell.style.paddingRight = '0'

      cell.style.height = '100%'
    }
    td.addEventListener('dblclick', handTdDbClick)
    td.addEventListener('click', handTdClick)
    // 初始化单元格文本
    const { data: { row, column: { property } } } = this.$props
    this.cellText = row[property]
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
      const targetPreviewCell = targetTd.childNodes[0].childNodes[1] as HTMLElement
      if (targetPreviewCell.className.includes('preview')) {
        targetPreviewCell.focus()
        return true
      }
    } catch (e) {
    }
    return false
  }

  move (moveX: number, moveY: number) {
    const { x, y } = this
    return this.moveTo(x + moveX, y + moveY)
  }

  handMove (e: any) {
    const { move } = this
    const { key } = e
    let moved = false
    switch (key) {
      case 'ArrowUp':
        moved = move(0, -1)
        break
      case 'ArrowDown':
        moved = move(0, 1)
        break
      case 'ArrowLeft':
        moved = move(-1, 0)
        break
      case 'ArrowRight':
        moved = move(1, 0)
        break
      case 'Enter':
        moved = move(0, 1)
        break
    }
    if (moved) e.view.event.preventDefault()
    return moved
  }

  handCharInput (e: any) {
    const { $props } = this
    const { editable, data } = $props
    const { key } = e
    // 开始字符输入
    if (key.length === 1 && editable && !this.edit) {
      // this.$emit('textChange', data, key)
      // this.previewRef.innerText = ''
      this.edit = true
      this.editRef.innerText = ''
    }
  }

  handPreviewKeyDown (e: any) {
    const { handMove, handCharInput } = this
    handMove(e) || handCharInput(e)
  }

  handEditKeyDown (e: any) {
    const { handMove } = this
    handMove(e)
  }

  handPreViewFocus () {
    this.$emit('currentFocus')
    this.setTdFocusStyle()
  }

  handPreViewBlur () {
    this.setTdBlurStyle()
  }

  handTdDbClick () {
    const { editable } = this.$props
    if (editable) this.edit = true
  }

  handTdClick () {
    const { edit, previewRef } = this
    if (!edit) previewRef.focus()
  }

  handEditFocus () {
    const { setTdFocusStyle, editRef } = this
    setTdFocusStyle()
    // 光标移至最后
    const range = window.getSelection()
    range.selectAllChildren(editRef)
    range.collapseToEnd()
  }

  handEditBlur () {
    this.setTdBlurStyle()
    this.edit = false
    const { data } = this.$props
    const { row, column: { property } } = data
    const newText = this.editRef.innerText
    if (row[property] !== newText) this.$emit('textChange', data, newText)
  }

  handEditInput (e: any) {
    const { data } = e
    if (!data) {}
  }
}

</script>

<style lang="scss" scoped>
  @import "~ljs-sass/src/mixin";

  .cell-wrap {

    > div {
      line-height: 23px;
      min-height: 23px;
      outline: none;
      word-break: break-all;
      overflow: hidden;
      width: auto;
      height: auto;
    }
  }

  .preview {
    padding: 6px 0;
  }

  .text-edit {
    padding: 6px 10px;
  }
</style>
