<template>
    <v-fade-transition appear>
        <div id="app">
            <router-view/>
        </div>
    </v-fade-transition>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="less">
    html, body {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    #app {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>
