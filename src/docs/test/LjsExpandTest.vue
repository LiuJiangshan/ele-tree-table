<template>
    <div>
        <LjsExpand :expand="expand" :show="show" @on-expand="onChange"/>
        <div>
            <input v-if="expand" type="button" @click="expand = false" value="收起"/>
            <input v-else type="button" @click="expand = true" value="展开"/>
            <input v-if="show" type="button" @click="show = false" value="隐藏"/>
            <input v-else type="button" @click="show = true" value="显示"/>
        </div>
    </div>
</template>

<script>
  import LjsExpand from '../../components/LjsTreeTable/LjsExpand.vue'

  export default {
    name: 'LjsExpandTest',
    components: {LjsExpand},
    methods: {
      onChange () {
        this.expand = !this.expand
      }
    },
    data () {
      return {expand: true, show: true}
    }
  }
</script>

<style scoped>

</style>
