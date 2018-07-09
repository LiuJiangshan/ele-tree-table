<template>
    <li>
        <input v-if="column.index===0" type="checkbox" v-model="data.check"/>
        <div v-html="data.check"></div>
    </li>
</template>

<script>
export default {
  name: 'VueCheckBox',
  props: {
    data: {
      type: Object
    },
    column: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
