<template>
  <div class="cell-wrap">
    <div v-if="editable" ref="focus" class="text-edit focus-border" contenteditable="true" @keydown="handEditKeyDown"
         @blur="handEditBlur" :style="editStyle"
         @focus="handEditFocus" @input="handEditInput" v-text="cellText">
    </div>
    <div v-else ref="focus" class="no-edit focus-border" contenteditable="false" tabindex="0"
         @focus="handNoEditFocus"
         @blur="handNoEditBlur" @keydown="handNoEditKeyDown">
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

  get cellTextFromProp () {
    // 初始化单元格文本
    const { $props } = this
    const { data: { row, column: { property } } } = $props
    return row[property]
  }

  updated () {
    const { edit, focusRef, $props, cellTextFromProp, cellText } = this
    const { editable } = $props

    if (editable) {
      if (cellTextFromProp !== cellText) this.cellText = cellTextFromProp
      // if (cellTextFromProp !== focusRef.innerText) {
      //   focusRef.innerText = cellTextFromProp
      // }
    }
    if (edit) focusRef.focus()
  }

  get focusRef () {
    return this.$refs.focus as HTMLElement
  }

  setTdFocusStyle () {
    const { td } = this
    td.style.outline = 'none'
    td.style.boxShadow = '0 0 1px 1px #42fa35 inset'
  }

  setTdBlurStyle () {
    const { td } = this
    td.style.outline = 'none'
    td.style.boxShadow = 'none'
  }

  get editStyle () {
    const { edit } = this
    return edit ? { color: '#666666' } : { color: 'transparent', textShadow: '0 0 0 #666666' }
  }

  mounted () {
    const { td, cell, focusRef, handTdDbClick, handTdClick, cellTextFromProp, $props } = this
    const { editable } = $props
    if (focusRef) {
      td.style.paddingTop = '0'
      td.style.paddingBottom = '0'

      cell.style.paddingLeft = '0'
      cell.style.paddingRight = '0'

      cell.style.height = '100%'
    }
    td.classList.add(editable ? 'editable' : 'no-editable')
    td.addEventListener('dblclick', handTdDbClick)
    td.addEventListener('click', handTdClick)
    this.cellText = cellTextFromProp
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
      const targetPreviewCell = targetTd.childNodes[0].childNodes[0] as HTMLElement
      if (targetPreviewCell.className.includes('focus-border')) {
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
        e.view.event.preventDefault()
        break
    }
    if (moved) e.view.event.preventDefault()
    return moved
  }

  handCharInput (e: any) {
    const { $props } = this
    const { editable } = $props
    const { key } = e
    // 开始字符输入
    if (key.length === 1 && editable && !this.edit) {
      this.edit = true
      this.focusRef.innerText = ''
    }
  }

  handNoEditKeyDown (e: any) {
    const { handMove } = this
    handMove(e)
  }

  handEditKeyDown (e: any) {
    const { handMove, handCharInput } = this
    handMove(e) || handCharInput(e)
  }

  handNoEditBlur () {
    this.setTdBlurStyle()
  }

  handTdDbClick () {
    const { editable } = this.$props
    if (editable) this.edit = true
  }

  handTdClick () {
    const { edit, focusRef } = this
    if (!edit) focusRef.focus()
  }

  handFocus () {
    const { setTdFocusStyle } = this
    setTdFocusStyle()
    this.$emit('currentFocus')
  }

  handNoEditFocus () {
    const { handFocus } = this
    handFocus()
  }

  handEditFocus () {
    const { handFocus, focusRef } = this
    handFocus()
    // 光标移至最后
    const range = window.getSelection()
    range.selectAllChildren(focusRef)
    range.collapseToEnd()
  }

  handEditBlur () {
    this.setTdBlurStyle()
    this.edit = false
    const { data } = this.$props
    const { row, column: { property } } = data
    const newText = this.focusRef.innerText
    if (row[property] !== newText) this.$emit('textChange', data, newText)
  }

  handEditInput (e: any) {
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
      /*padding: 6px 10px;*/
      padding: 0 5px;
    }

    .no-edit {
    }

    .text-edit {
    }
  }
</style>
