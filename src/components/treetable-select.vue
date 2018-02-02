<template>
    <div class="treetable-select">
        <input ref="select" type="text" :value="showValue" @focus="onFocus" @blur="onBlur">
        <div class="select">
            <ul v-if="isShow">
                <li v-for="item of data" :key="item.name" @click="onItemClick(item)">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'treetable-select',
    updated () {
      this.val = this.value
    },
    mounted () {
      console.log('value: ', this.value)
      console.log('ctx.data: ', this.ori)
      this.val = this.value
    },
    props: {
      ori: Object,
      data: Array,
      value: [Number, String]
    },
    data () {
      return {
        val: '',
        isShow: false
      }
    },
    computed: {
      showValue: {
        get () {
          for (let item of this.data) {
            if (item.id === this.val) return item.name
          }
        }
      }
    },
    methods: {
      onFocus () {
        this.isShow = true
        console.log('focus: ', this.value)
      },
      onBlur () {
        setTimeout(() => {
          this.isShow = false
        }, 200)
      },
      onItemClick (item) {
        // this.$refs.select.value = item.name
        this.val = item.id
        this.onInput(item.id)
        //        this.isShow = false
      },
      onInput (item) {
        this.$emit('input', item)
      }
    }
  }
</script>

<style scoped>
    .select {
        /*position: relative;*/
        right: 2px;
    }

    input {
        height: 28px;
        border: none;
    }

    ul {
        width: 100px;
        list-style: none;
        padding: 1px;
        margin: 0px;
        z-index: 100;
        position: absolute;
        background-color: white;
        border: 1px solid black;
    }

    li:hover {
        background-color: cornflowerblue;
        border: 1px solid cornflowerblue;
    }
</style>
