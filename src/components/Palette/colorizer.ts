import red from '@material-ui/core/colors/red'
import purple from '@material-ui/core/colors/purple'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'
import pink from '@material-ui/core/colors/pink'
import grey from '@material-ui/core/colors/grey'

/**
 * ### colorizer テーブルに対する色割り当て
 *
 * 仕様:
 *  - テーブルが選択されたときに割り当て
 *  - あらかじめ設定してある色の順列から、未使用の色を順番に割り当てる
 *  - すべての色が使用済みである場合、黒にしよう(アカン気がする)
 */
export default class Colorizer {

  private head = 0

  colors = [
    red[500],
    pink[300],
    purple[900],
    blue[800],
    green[800],
    yellow[500],
  ]

  noneColor = grey[500]

  using:{[key: string]: boolean} = {}

  constructor() {
    this.initUsing()
  }

  attach = () => {
    const { colors, using, noneColor, ahead, use} = this
    const base = this.head

    /**
     * headの色が使われていた場合:
     *  headをひとつ進めて、baseに戻ってきたら全て使われていると判断して、noneColorを返す
     * headの色が使われていない場合:
     *  headをひとつ進めて、その色を返す
     */
    const loop: (head: number) => string
    = h => {
      if (using[colors[h]]) {
        ahead()
        if (this.head === base) return noneColor
        else return loop(this.head)
      }
      else {
        const color = colors[h]
        use(color)
        ahead()
        return color
      }
    }

    return loop(base)
  }

  disattach = (color: string) => {
    this.unuse(color)
  }

  private initUsing = () => {
    this.colors.forEach(color => {
      this.using[color] = false
    })
  }

  private ahead = () => {
    this.head++
    const { colors, resetHead } = this
    if (this.head > colors.length) {
      resetHead()
    }
  }

  private resetHead = () => {
    this.head = 0
  }

  private use = (color: string) => {
    this.using[color] = true
  }

  private unuse = (color: string) => {
    this.using[color] = false
  }
}