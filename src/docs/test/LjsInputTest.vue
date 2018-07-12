<template>
    <div>
        <div style="width: 100px;border: 1px red solid;">
            <p>v-model绑定测试</p>
            <LjsInput v-model="value"/>
            <br/>
            <LjsInput v-model="value"/>
        </div>
        <div>
            <p>居中测试</p>
            <div style="width: 100px;height: 100px;border: 1px red solid;">
                <LjsInput v-model="value" style="width:100%;height:100%;"/>
            </div>
        </div>
        <br/>
    </div>
</template>
<script>
import LjsInput from '../../lib/ljs-tree-table/LjsInput.vue'

export default {
  name: 'LjsInputTest',
  components: {LjsInput},
  data () {
    return {value: '123'}
  }
}
</script>
<style scoped>
</style>
