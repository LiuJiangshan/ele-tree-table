import { Component, Prop, Vue } from 'vue-property-decorator'
import { Column } from '@/package/treeNode'

@Component
export default class LjsTreeTable extends Vue {

  @Prop()
  private columns!: Array<Column>
  @Prop()
  private datas!: Array<any>

  render () {
    return <table>
      {this.datas.map(data =>
        <tr>
          {this.columns.map(column => <td>{column.prop && data[column.prop]}</td>)}
        </tr>
      )
      }
    </table>
  }
}
