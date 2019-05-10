<template>
  <router-view/>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {
}
</script>
<style lang="scss">
  @import "~ljs-sass/src/mixin";

  html, body {
    @include wh100_margin(0);
    @include wh100_padding(0)
  }
</style>
