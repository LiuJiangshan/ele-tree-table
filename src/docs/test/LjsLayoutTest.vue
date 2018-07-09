<template>
  <div style="width: 100%;height: 100%">
    <el-button v-if="!bottomShow" @click="bottomShow=true">打开</el-button>
    <div class="container">
      <LjsLayout class="layout" :top-weight="1" :bottom-weight="2" :bottom-show="bottomShow">
        <div slot="top" class="top">
          <el-table size="s" :data="tableData"
                    style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </div>
        <div slot="bottom" class="bottom">
          <el-button v-if="bottomShow" @click="bottomShow=false">关闭</el-button>
        </div>
      </LjsLayout>
    </div>
  </div>
</template>

<script>

import LjsLayout from '../../lib/LjsLayout/LjsLayout.vue'
import Vue from 'vue'
import { Button, Table, TableColumn } from 'element-ui'
import dateformat from 'dateformat'

Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)

export default {
  name: 'LjsLayoutTest',
  components: {LjsLayout},
  data () {
    return {
      tableData: [],
      bottomShow: true
    }
  },
  methods: {},
  mounted () {
    for (let i = 0; i < 100; i++) {
      this.tableData.push({
        date: dateformat(new Date(), 'yyyy-MM-dd MM:hh:ss'),
        name: 'name' + i,
        address: 'address' + i
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
  }

  .layout {
    > * {
      > * {
        float: left
      }
      > .top {
        overflow: auto;
        background: #3a8ee6;
      }

      > .bottom {
        background: #d1dbe5;
      }
    }
  }
</style>
