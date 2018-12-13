<template>
  <div class="test">
    <m-check-box :value="false"/>
  </div>
</template>

<script>
import MCheckBox from '../../packages/m-check-box/m-check-box'

export default {
  name: 'test',
  components: { MCheckBox },
  data () {
    return { columns: [] }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../packages/default-theme/mixin";

  .test {
    @include wh100;
    @include debug;
  }
</style>
