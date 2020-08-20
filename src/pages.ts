export type Page = {
  title: string,
  href: string,
  isLinkedSidebar: boolean,
  sidebarOrder?: number
}

/**
 * 描画するページをここにまとめる
 * @param {string} title // サイドバーに表示するときなどに使う
 * @param {href} href // ルーティングパス
 * @param {boolean} isLinkedSidebar サイドバーにリンクを貼るならtrue
 * @param {number} sidebarOrder    サイドバーに表示する順番(上から)
 */
export const pages: { [key: string]: Page }
= {
  palette: {
    title: 'Palette',
    href: '/palette',
    isLinkedSidebar: true,
    sidebarOrder: 0
  },
  counter: {
    title: '334Counter',
    href: '/counter',
    isLinkedSidebar: true,
    sidebarOrder: 1
  },
  counterHook: {
    title: '334CounterHook',
    href: '/counterhook',
    isLinkedSidebar: true,
    sidebarOrder: 2
  },
  notFound: {
    title: 'Notfound',
    href: '/not-found',
    isLinkedSidebar: false
  }
}

export default pages

