import React, { SFC, useState, useEffect } from 'react'

/**
 * React hookを用いた33-4カウンタ
 */
export const Counter: SFC = () => {
  // 状態変数1つにつきuseState1回
  // 引数は初期状態
  // 返り値は状態と更新用のsetState関数
  const [count, setCount] = useState(0)

  // componentDidMount と componentDidUpdate と componentWillUnmountのタイミングで実行
  // 第二引数により、countの値が上記のタイミングで変わっている場合のみ実行する
  // 返した関数は、UnMount時に実行される
  // 第二引数に[]をとれば、タイミングをDidMountとUnMount時に限定できる
  useEffect(() => {
    // ページタイトルを変更
    document.title = `${33 * count} - ${4 * count}`
    return () => { document.title = "bye" }
  }, [count]);

  return (
    <div>
      <h1>{33 * count} - {4 * count}</h1>
      <button onClick={() => setCount(count + 1)}>ウ　ン　チ　ー　コ　ン　グ</button>
    </div>
  )
}

export default Counter
