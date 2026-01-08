import {
  MsgCreateSpotLimitOrder,
  spotPriceToChainPriceToFixed,
  getDefaultSubaccountId,
} from '@injectivelabs/sdk-ts'

interface Market {
  marketId: string
  baseDecimals: number
  quoteDecimals: number
  priceTensMultiplier: number
  quantityTensMultiplier: number
}


export const makeMsgCreateSpotLimitOrder = (
  price: string,
  quantity: string,
  orderType: number,
  injectiveAddress: string,
  market: Market
) => {
  const subaccountId = getDefaultSubaccountId(injectiveAddress)

  return MsgCreateSpotLimitOrder.fromJSON({
    subaccountId,
    injectiveAddress,
    orderType,
    price: spotPriceToChainPriceToFixed({
      value: price,
      tensMultiplier: market.priceTensMultiplier,
      baseDecimals: market.baseDecimals,
      quoteDecimals: market.quoteDecimals,
    }),
    quantity: spotPriceToChainPriceToFixed({
      value: quantity,
      tensMultiplier: market.quantityTensMultiplier,
      baseDecimals: market.baseDecimals,
    }),
    marketId: market.marketId,
    feeRecipient: injectiveAddress,
  })
}