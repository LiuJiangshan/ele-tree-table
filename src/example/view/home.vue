<template>
  <div class="app">
    <el-menu mode="horizontal" router :default-active="activeItem" @select="onMenuSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="/base-element">基于Element</el-menu-item>
      <el-menu-item index="/simple">简单展示</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import LjsTreeTable from '@/package/ljsTreeTable.vue'

@Component({
  components: { LjsTreeTable }
})
export default class App extends Vue {
  activeItem = ''

  onMenuSelect (index: any) {
    this.activeItem = index
    this.$router.push(index)
  }
}
</script>
<style lang="scss" scoped>
  @import "~ljs-sass/src/mixin";

  .app {
    @include wh100;
    overflow: hidden;
  }
</style>
<style lang="scss">
  @import "~ljs-sass/src/mixin";

  html, body {
    @include wh100_margin(0);
    @include wh100_padding(0)
  }
</style>
