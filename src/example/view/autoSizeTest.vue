<template>
  <table>
    <tr>
      <td>
        <div contenteditable="true">
          <div>ABCDEFG</div>
        </div>
      </td>
      <td>
        <div contenteditable="true">
          <div>ABCDEFG</div>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div contenteditable="true">
          <div>ABCDEFG</div>
        </div>
      </td>
      <td>
        <div contenteditable="true">
          <div>ABCDEFG</div>
        </div>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class AutoSizeTest extends Vue {
}
</script>

<style lang="scss" scoped>
  @import "~ljs-sass/src/mixin";

  table {
    border-collapse: collapse;

    td {
      border: 1px deeppink solid;

      div {
        &:focus {
          outline: 1px green solid;
        }

        div {
          padding-top: 12px;
          padding-bottom: 12px;
        }
      }
    }
  }
</style>
