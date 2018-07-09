<template>
    <div>
        <Input v-model="value"/>
        <input type="button" value="showValue" @click="showValue"/>
    </div>
</template>

<script>
export default {
  name: 'IviewInputTest',
  methods: {
    showValue () {
      console.log(this.value)
    }
  },
  data () {
    return {value: ''}
  }
}
</script>

<style scoped>

</style>
