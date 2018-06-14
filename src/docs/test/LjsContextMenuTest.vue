<template>
    <div>
        <div @click.prevent="$refs.menu.close" @contextmenu.prevent="$refs.menu.open($event)"
             style="width: 500px;height: 500px;background: #19be6b;">
        </div>
        <LjsContextMenu ref="menu" :items="items" :context="getThis()"></LjsContextMenu>
    </div>
</template>

<script>

  export default {
    name: 'LjsContextMenuTest',
    data () {
      return {
        items: [
          {
            label: 'test1',
            click () {
              console.log('test1')
            }
          },
          {
            label: 'test2',
            click () {
              console.log('test2')
            }
          }
        ]
      }
    },
    methods: {
      getThis () {
        return this
      }
    }
  }
</script>

<style scoped>

</style>
