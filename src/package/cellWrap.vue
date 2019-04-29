<template>
  <div tabindex="0" class="cell-wrap" @focus="handFocus" @blur="handBlur">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ components: {} })
export default class CellWrap extends Vue {
  updated () {
    const { td } = this
    const el = this.$el as HTMLElement
    el.style.height = `${td.clientHeight}px`
    el.style.width = `${td.clientWidth}px`
  }

  mounted () {
    const { td, cell } = this
    td.style.paddingTop = '0'
    td.style.paddingBottom = '0'

    cell.style.paddingLeft = '0'
    cell.style.paddingRight = '0'
  }

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
      const targetCell = targetTd.childNodes[0] as HTMLElement
      targetCell.focus()
    } catch (e) {
    }
  }

  move (moveX: number, moveY: number) {
    const { x, y } = this
    this.moveTo(x + moveX, y + moveY)
  }

  keyEventListener = (e: any) => {
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

  handFocus () {
    this.$el.addEventListener('keydown', this.keyEventListener)
    this.$emit('currentFocus', this.y)
  }

  handBlur () {
    this.$el.removeEventListener('keydown', this.keyEventListener)
  }
}

</script>

<style lang="scss" scoped>
  .cell-wrap {
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    border: #0000 1px solid;

    &:focus {
      border-color: #42fa35;
      outline: 0;
    }
  }
</style>
