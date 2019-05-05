<template>
  <table style="width: 100px;">
    <colgroup>
      <col width="50"/>
      <col width="50"/>
    </colgroup>
    <tr>
      <th>1</th>
      <th>1</th>
    </tr>
    <tr>
      <td>
        <div contenteditable="true">
          <div>ABCDEFG</div>
        </div>
      </td>
      <td>
        <div contenteditable="true">
          <div>ABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFGABCDEFG</div>
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

      > div {
        @include wh100;
        position: relative;

        &:focus {
          outline: 1px green solid;
        }

        > div {
          @include wh100;
          padding-top: 12px;
          padding-bottom: 12px;
        }
      }
    }
  }
</style>
