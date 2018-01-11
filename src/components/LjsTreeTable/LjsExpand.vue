<template>
    <div style="display: flex;flex-direction: row;align-items: center;cursor: pointer;" @click="$emit('on-expand')">
        <img :style="{visibility:(show?'visible':'hidden'),width:'23px',height:'23px'}"
             :src="expand===true?openIcon:closeIcon"/>
    </div>
</template>

<script>
    import closeIcon from './image/expand_close.gif'
    import openIcon from './image/expand_open.gif'

    export default {
        name: "LjsExpand",
        props: {
            show: {
                type: Boolean
            },
            expand: {
                type: Boolean
            }
        },
        watch: {},
        data() {
            return {
                openIcon, closeIcon
            }
        }
    }
</script>

<style scoped>

</style>
