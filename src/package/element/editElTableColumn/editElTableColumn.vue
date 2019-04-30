<template>
  <focus-el-table-column {...$props}/>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import FocusElTableColumn from '@/package/element/focusElTableColumn/focusElTableColumn.vue'

@Component({
  components: { FocusElTableColumn }
})
export default class EditElTableColumn extends Vue {
}
</script>

<style scoped>

</style>
