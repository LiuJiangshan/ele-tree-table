<template>
  <div class="home">
    <el-menu mode="horizontal" router :default-active="activeItem" @select="onMenuSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="/base-element">基于Element</el-menu-item>
      <el-menu-item index="/autosize-test">autosize-test</el-menu-item>
    </el-menu>
    <div style="width:100%;height:calc(100% - 61px)">
      <router-view/>
    </div>
  </div>
</template>

<script lang="tsx">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class App extends Vue {
  activeItem = ''

  onMenuSelect (index: any) {
    this.activeItem = index
    this.$router.push(index)
  }

  @Watch('activeItem')
  watchActiveItem (newVal: any) {
    this.$router.push(newVal)
  }

  mounted () {
    this.activeItem = this.$route.path
    if (!this.activeItem || this.activeItem === '/') {
      this.activeItem = '/base-element'
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "~ljs-sass/src/mixin";

  .home {
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
