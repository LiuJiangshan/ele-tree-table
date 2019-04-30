<template>
  <div ref="edit" v-if="edit" class="focus-border text-edit" contenteditable="true" @keydown="handKeyDown"
       @blur="handEditBlur"
       @focus="handEditFocus" @input="handEditInput"></div>
  <div ref="preview" v-else class="focus-border cell-wrap" contenteditable="false" tabindex="0"
       @focus="handPreViewFocus"
       @blur="handPreViewBlur"
       @dblclick="handPreViewDbClick" @keydown="handKeyDown">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ components: {} })
export default class CellWrap extends Vue {
  edit = false

  updated () {
    const { edit, syncSize } = this
    if (!edit) {
      const { td, el } = this
      el.style.width = `${td.clientWidth}px`
    }
  }

  get editRef () {
    return this.$refs.edit
  }

  get previewRef () {
    return this.$refs.preview
  }

  mounted () {
    const { td, cell, cells, edit, previewRef } = this
    if (previewRef) {
      td.style.paddingTop = '0'
      td.style.paddingBottom = '0'

      cell.style.paddingLeft = '0'
      cell.style.paddingRight = '0'

      cell.style.height = '100%'
    }
  }

  syncWidth () {
    const { td, el } = this
    el.style.width = `${td.clientWidth}px`
  }

  syncHeight () {
    const { td, el } = this
    el.style.height = `${td.clientHeight}px`
  }

  /**
   * 同步父节点宽高
   * */
  syncSize () {
    const { syncWidth, syncHeight } = this
    syncWidth()
    syncHeight()
  }

  get el () {
    return this.$el as HTMLElement
  }

  get tds () {
    return this.tr.childNodes as unknown as Array<HTMLElement>
  }

  get td () {
    return this.$el.parentNode as HTMLElement
  }

  get cell () {
    return this.td.childNodes[0] as HTMLElement
  }

  get cells () {
    return this.tds.map(td => td.childNodes[0] as HTMLElement)
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
      const targetCell = targetTd.childNodes[0] as HTMLElement
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
    this.edit = true
  }

  handEditFocus () {
  }

  handEditBlur () {
    // this.edit = false
    // const text = this.$el.textContent
    // this.$emit('textChange', text)
    // this.$el.textContent = ''
  }

  growEdit () {
    const { el } = this
    el.style.height = `${el.scrollHeight}px`
  }

  handEditInput (e: any) {
    const { data } = e
  }
}

</script>

<style lang="scss" scoped>
  @import "~ljs-sass/src/mixin";

  .focus-border {
    outline: none;
    resize: none;
    box-sizing: border-box;
    vertical-align: middle;
    display: table-cell;
    line-height: 35px;
    min-height: 35px;
    @include wh100;

    &:focus {
      outline: #42fa35 1px solid;
      outline-offset: -1px;
    }
  }

  .cell-wrap {
    padding-left: 10px;
    padding-right: 10px;
  }

  .text-edit {
    padding: 0;
    overflow: hidden;
    word-break: break-all;
  }
</style>
