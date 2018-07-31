<template>
  <div>
    <el-button @click="load">load</el-button>
  </div>
</template>

<script>

import DataLoader from '../../lib/ljs-tree-table/DataLoader.js'
import baseService from '../../utils/baseService.js'

const service = baseService('product.json')

export default {
  name: 'DataLoaderTest',
  methods: {
    load () {
      this.dataLoader.load()
    }
  },
  data () {
    return {dataLoader: new DataLoader()}
  },
  /* eslint-disable no-proto */
  mounted () {
    this.dataLoader.__proto__.onLoad = function (data) {
      console.log('data is:', data)
    }
    this.dataLoader.__proto__.onError = function (e) {
      console.log('error:', e)
    }
    this.dataLoader.__proto__.onEnd = function () {
      console.log('end')
    }
    this.dataLoader.__proto__.load = function () {
      service.search({})
        .then(response => { this.onLoad(response.data.data) })
        .catch(this.onError)
        .then(this.onEnd)
    }
  }
}
</script>

<style scoped>

</style>
