import { LucideApple, LucideBanana, LucideBeef, LucideCake, LucideMinusCircle, LucidePizza, LucidePlusCircle, LucidePopsicle } from "lucide-react"
import { useState } from "react"
import { pricing } from "./pricing"



export const TradeLineItem = ({ icon, buy, owned, foodIndex = 0, title, pricings, day = 1, color, qty = 10, total = 100 }) => {
  let [priceBuy, priceSell] = pricings[foodIndex](day)
  priceBuy = priceBuy.toFixed(2)
  priceSell = priceSell.toFixed(2)

  return <tr>
    <td style={{ color, lineHeight: '24px' }}>
      {icon}{" "}
      <span style={{ fontSize: 24 }}>{title}</span>
    </td>
    <td style={{ padding: "10px 0", textAlign: "right" }}>
      <span className="font-monospace">
        ${priceBuy}
      </span>
      <span style={{ marginLeft: 4 }} onClick={() => buy(foodIndex)}>
        <LucidePlusCircle />
      </span>
    </td>
    <td style={{ padding: "10px 0", textAlign: "right" }}>
      <span className="font-monospace">
        ${priceSell}
      </span>
      <span style={{ marginLeft: 4 }}>
        <LucideMinusCircle />
      </span>
    </td>
    <td style={{ padding: "10px 0", textAlign: "right" }}>
      <span className="font-monospace">
        {owned.foods[foodIndex]}
      </span>
    </td>
    <td style={{ padding: "10px 0", textAlign: "right" }}>
      <span className="font-monospace">
        ${owned.foods[foodIndex] * priceSell}
      </span>
    </td>
  </tr>
}

export const TradeForm = () => {
  const [day, setDay] = useState(1)

  const pricings = [
    pricing(1.11, 1.25 / 1.11, 3),
    pricing(5, 1.25 / 1.11, -2),
    pricing(.2, 1.25 / 1.11, 1.5),
    pricing(.25, 1.25 / 1.11, 1.3),
    pricing(4, 1.25 / 1.11, 1.3),
    pricing(3, 1.25 / 1.11, 1.2)
  ]
  const [buyPrice, sellPrice] = pricing(1.11, 1.25 / 1.11, 3)(day)

  const [owned, setOwned] = useState({
    cash: 500,
    foods: [
      0, 0, 0, 0, 0, 0
    ]
  })

  const buy = (foodIndex = 0) => {
    setOwned((owned) => {
      const foods = [...owned.foods]
      foods[foodIndex]++
      console.log({ foodIndex, pricings, pfi: pricings[foodIndex], "foods[foodIndex]": foods[foodIndex] })
      return {
        cash: owned.cash - pricings[foodIndex](day)[0],
        foods
      }
    })
  }

  return <div>
    <table className="table" style={{ color: '#2c3e50' }}>
      <thead style={{ fontWeight: "bold", color: "#34495e" }}>
        <tr>
          <td>
            What?
          </td>
          <td colSpan={1} style={{ textAlign: "right" }}>Buy</td>
          <td colSpan={1} style={{ textAlign: "right" }}>Sell</td>
          <td colSpan={1} style={{ textAlign: "right" }}>Qty</td>
          <td colSpan={1} style={{ textAlign: "right" }}>Own total</td>
        </tr>
      </thead>
      <tbody>
        <TradeLineItem
          color="#2563eb"
          title={'Icecream'}
          icon={<LucidePopsicle
            style={{ position: "relative", top: -4 }} />}
          pricings={pricings}
          day={day}

          buy={buy}
          owned={owned}
          foodIndex={0}
        />
        <TradeLineItem
          color="#a21caf"
          title={'Cake'}
          icon={<LucideCake
            style={{ position: "relative", top: -4 }} />}
          pricings={pricings}
          day={day}

          buy={buy}
          owned={owned}
          foodIndex={1}
        />
        <TradeLineItem
          color={'#eab308'}
          title={'Banana'}
          icon={<LucideBanana
            style={{ position: "relative", top: -4 }} />}
          pricings={pricings}
          day={day}

          buy={buy}
          owned={owned}
          foodIndex={2}
        />
        <TradeLineItem
          color={'#22c55e'}
          title={'Apple'}
          icon={<LucideApple
            style={{ position: "relative", top: -4 }} />}
          pricings={pricings}
          day={day}

          buy={buy}
          owned={owned}
          foodIndex={3}
        />
        <TradeLineItem
          color={"#9f1239"}
          title={'Beef'}
          icon={<LucideBeef
            style={{ position: "relative", top: -4 }} />}
          pricings={pricings}
          day={day}

          buy={buy}
          owned={owned}
          foodIndex={4}
        />
        <TradeLineItem
          color="#854d0e"
          title={'Pizza'}
          icon={<LucidePizza
            style={{ position: "relative", top: -4 }} />}
          pricings={pricings}
          day={day}

          buy={buy}
          owned={owned}
          foodIndex={5}
        />
      </tbody>
    </table>

    <h1>Cash: ${owned.cash.toFixed(2)}, Food: $400, Goal: $1,000,000</h1>
    <button
      className="btn btn-lg btn-primary"
      onClick={() => setDay(day => day + 1)}
    >
      NEXT DAY
    </button>
    {/* icecream, Cake, banana, apple, meat, pizza */}
  </div>
}