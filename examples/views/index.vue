<template>
    <div class="index">
        <el-collapse-transition>
            <div v-if="drawerOpen" class="drawer">
                <v-navigation-drawer permanent>
                    <v-toolbar flat>
                        <v-list>
                            <v-list-tile>
                                <v-list-tile-title class="title">
                                    Application
                                </v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-toolbar>

                    <v-divider></v-divider>

                    <v-list dense class="pt-0">
                        <v-list-tile
                                v-for="item in items"
                                :key="item.title">
                            <v-list-tile-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-navigation-drawer>
            </div>
        </el-collapse-transition>
        <div class="right">
            <v-toolbar>
                <v-toolbar-side-icon @click="handSwitchDrawer"></v-toolbar-side-icon>
                <v-toolbar-title>Title</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn flat>Link One</v-btn>
                    <v-btn flat>Link Two</v-btn>
                    <v-btn flat>Link Three</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <div class="content">
                <router-view/>
            </div>
            <v-footer height="auto" color="primary lighten-1">
                <v-layout justify-center row wrap>
                    &copy;2018 — <strong>LiuJiangshan</strong>
                </v-layout>
            </v-footer>
        </div>
    </div>
</template>

<script>
import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition'

export default {
  name: 'index',
  components: { ElCollapseTransition },
  data () {
    return {
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      right: null,
      drawerOpen: true
    }
  },
  methods: {
    handSwitchDrawer () {
      this.drawerOpen = !this.drawerOpen
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
    @import '~ljs-sass/src/mixin.scss';

    .index {
        @include wh100;
        @include flex_h;
        > * {
            @include h100;
        }
        > .drawer {
            width: 250px;
        }
        > .right {
            flex-grow: 1;
            @include flex_v;
            > .content {
                flex-grow: 1;
            }
        }
    }
</style>
