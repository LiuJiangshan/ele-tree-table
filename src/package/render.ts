import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { Tsx } from '@/package/treeNode'

@Component({
  components: {},
  props: {
    context: { type: Object },
    tsx: { type: Function }
  }
})
export default class Render extends Vue {
  @Prop()
  private context: any
  @Prop()
  private tsx!: Tsx

  render (h: any): VNode {
    return this.tsx(h, this.context)
  }
}
