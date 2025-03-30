import { useRef, useState } from "react"
import { Win } from "./Window"

export const WindowManager = () => {
  const maxZ = useRef(1)
  const handleClick = () => {
    maxZ.current = maxZ.current + 1
    return maxZ.current
  }

  const [windows, setWindows] = useState([
    {
      id: 0,
      position: { x: -300, y: 200, z: 0 },
      content: "fladsjflkdasjfklasjdfklajdfdlkjdfkljasfkjlsdakjfkdasfjfdsajfdksa"
    },
    {
      id: 1,
      position: { x: -250, y: 150, z: 1 },
      content: `ベッドを購入する際、直接ベッドに寝転がってみたり、店員さんと直接話しをして、購入するほうが失敗しにくいという意見の方が多いかと思います。
ただ、大事な睡眠に関わるベッドだから色んなものを見て選びたいという方には、通販で一度いろんなベッドをみてまわる、という方法があります。
ネットの通販であれば、家にいながらいろんなお店のベッドを見てまわることが出来ます。
素材やサイズは基本的にはサイトに書いてありますし、最近では購入者のレビューも沢山掲載されている通販サイトもありますので、ベッドの寝心地の参考にするのもよいでしょう。
実際の店舗へ行く前に、ネットの通販で下調べする。このようなベッドの買い方も、効率的で、悪くないと思います`
    },
  ])

  const deletePosition = (id: number) => {
    setWindows(wins => {
      return wins.filter((w) => w.id !== id)
    })
  }

  return (
    <group>
      {windows.map(((w) =>
        <Win
          key={w.id}
          position={w.position}
          calcZ={handleClick}
          content={w.content}
          onClose={() => deletePosition(w.id)}
        />
      ))}
    </group>
  )
}
