import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'

@Component({
  components: {},
  props: {
    context: { type: Object },
    tsx: { type: Function }
  }
})
export default class Render extends Vue {
  private context: any
  private tsx!: (h: any, context: any) => VNode

  render (h: any): VNode {
    return this.tsx(h, this.context)
  }
}
