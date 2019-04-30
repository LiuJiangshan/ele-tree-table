<template>
  <div class="auto-size-test">
    <table>
      <tr>
        <td>
          <div class="edit"></div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="edit"></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class AutoSizeTest extends Vue {
}
</script>

<style lang="scss" scoped>
  @import "~ljs-sass/src/mixin";

  .auto-size-test {
    @include wh100;

    .edit {
    }
  }
</style>
