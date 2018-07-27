<template>
  <div class="test">
    <font-awesome-icon prefix="fas" icon="check-square" size="lg"/>
  </div>
</template>

<script>
import LjsTreeTable from '../../lib/ljs-tree-table/ljs-tree-table'

export default {
  name: 'test',
  components: {LjsTreeTable},
  data () {
    return {columns: []}
  }
}
</script>

<style lang="scss" scoped>
  @import "../../utils/mixin.scss";

  .test {
    @include wh100;
    @include debug;
  }
</style>
