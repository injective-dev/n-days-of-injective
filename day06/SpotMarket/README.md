🌟 Exchange Module - SDK TS

# Features

Written in TypeScript, with type definitions,
Works in Node.js and in the browser,
Using SDK to place limit order, fetch price data,
Parses responses into native JavaScript types
much more ...

# Create example project

```bash
npm init -y
```

# Fetch market data

## Installation

```bash 
npm install @injectivelabs/sdk-ts
```

## Run

```bash
npx tsx src/fetch.ts  

[
  {
    "marketId": "0x0611780ba69656949525013d947713300f56c37b6175e02f26bffa495c3208fe",
    "ticker": "INJ/USDT",
    "baseDenom": "inj",
    "quoteDenom": "peggy0x87aB3B4C8661e07D6372361211B96ed4Dc36B1B5",
    "baseSymbol": "INJ",
    "quoteSymbol": "USDT",
    "baseDecimals": 18,
    "quoteDecimals": 6,
    "minPriceTickSize": "1e-15",
    "minQuantityTickSize": "1000000000000000",
    "status": "active",
    "priceTensMultiplier": "-3",
    "quantityTensMultiplier": "-3"
  },
  {
    "marketId": "0x7a57e705bb4e09c88aecfc295569481dbf2fe1d5efe364651fbe72385938e9b0",
    "ticker": "APE/USDT",
    "baseDenom": "peggy0x44C21afAaF20c270EBbF5914Cfc3b5022173FEB7",
    "quoteDenom": "peggy0x87aB3B4C8661e07D6372361211B96ed4Dc36B1B5",
    "baseSymbol": "APE",
    "quoteSymbol": "USDT",
    "baseDecimals": 18,
    "quoteDecimals": 6,
    "minPriceTickSize": "1e-15",
    "minQuantityTickSize": "10000000000000000",
    "status": "active",
    "priceTensMultiplier": "-3",
    "quantityTensMultiplier": "-2"
  },
  {
    "marketId": "0xabed4a28baf4617bd4e04e4d71157c45ff6f95f181dee557aae59b4d1009aa97",
    "ticker": "INJ/APE",
    "baseDenom": "inj",
    "quoteDenom": "peggy0x44C21afAaF20c270EBbF5914Cfc3b5022173FEB7",
    "baseSymbol": "INJ",
    "quoteSymbol": "APE",
    "baseDecimals": 18,
    "quoteDecimals": 18,
    "minPriceTickSize": "1e-15",
    "minQuantityTickSize": "1000000000000000000",
    "status": "active",
    "priceTensMultiplier": "-15",
    "quantityTensMultiplier": "0"
  },
  {
    "marketId": "0xa97182f11f1aa5339c7f4c3fe3cc1c69b39079f11b864c86d912956c5c2db75c",
    "ticker": "WETH/USDT",
    "baseDenom": "factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/weth",
    "quoteDenom": "peggy0x87aB3B4C8661e07D6372361211B96ed4Dc36B1B5",
    "baseSymbol": "WETH",
    "quoteSymbol": "USDT",
    "baseDecimals": 8,
    "quoteDecimals": 6,
    "minPriceTickSize": "1e-13",
    "minQuantityTickSize": "1000000000000000",
    "status": "active",
    "priceTensMultiplier": "-11",
    "quantityTensMultiplier": "7"
  },
  {
    "marketId": "0x1c315bd2cfcc769a8d8eca49ce7b1bc5fb0353bfcb9fa82895fe0c1c2a62306e",
    "ticker": "WBTC/USDT",
    "baseDenom": "factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/wbtc",
    "quoteDenom": "peggy0x87aB3B4C8661e07D6372361211B96ed4Dc36B1B5",
    "baseSymbol": "WBTC",
    "quoteSymbol": "USDT",
    "baseDecimals": 8,
    "quoteDecimals": 6,
    "minPriceTickSize": "0.00001",
    "minQuantityTickSize": "100000",
    "status": "active",
    "priceTensMultiplier": "-3",
    "quantityTensMultiplier": "-3"
  }
]
```

This demostrates how to use injective-sdk-ts to fetch market data.

# Place limit order with SDK

## Set environment variables

```shell
cp .env.sample .env
```

Fill in the empty values within `.env`.

> **Note**  
> Do not commit `.env`, or push to remote

## Run

```bash
npx tsx src/placeorder.ts

From address: inj1rv4p9euzue9f8ulpgagmuzwa6rc2lr48u5066h
Place Order Msg: MsgCreateSpotLimitOrder {
  params: {
    subaccountId: '0x1b2a12e782e64a93f3e14751be09ddd0f0af8ea7000000000000000000000000',
    injectiveAddress: 'inj1rv4p9euzue9f8ulpgagmuzwa6rc2lr48u5066h',
    orderType: 2,
    price: '0.01',
    quantity: '10000000000000000',
    marketId: '0x0611780ba69656949525013d947713300f56c37b6175e02f26bffa495c3208fe',
    feeRecipient: 'inj1rv4p9euzue9f8ulpgagmuzwa6rc2lr48u5066h'
  }
}
Transaction result: {
  height: 108222322,
  txhash: 'CD08F2F8A1FDB396A9CCC75D2DEE6223C56D497D6F979EBD3E4E1C8A9693755C',
  codespace: '',
  code: 0,
  data: '1283010A3B2F696E6A6563746976652E65786368616E67652E763162657461312E4D736743726561746553706F744C696D69744F72646572526573706F6E736512440A42307835663063386232643665393666333061626236326235346665396239616361363632316166343365353162346633333434633863373932643135393334343632',
  rawLog: '',
  logs: [],
  info: '',
  gasWanted: 200000,
  gasUsed: 138504,
  timestamp: '2026-01-08T11:56:11Z',
  events: [
    Object <[Object: null prototype] {}> {
      type: 'coin_spent',
      attributes: [Array]
    },
    Object <[Object: null prototype] {}> {
      type: 'coin_received',
      attributes: [Array]
    },
    Object <[Object: null prototype] {}> {
      type: 'transfer',
      attributes: [Array]
    },
    Object <[Object: null prototype] {}> {
      type: 'message',
      attributes: [Array]
    },
    Object <[Object: null prototype] {}> {
      type: 'tx',
      attributes: [Array]
    },
    Object <[Object: null prototype] {}> {
      type: 'tx',
      attributes: [Array]
    },
    Object <[Object: null prototype] {}> {
      type: 'tx',
      attributes: [Array]
    },
    Object <[Object: null prototype] {}> {
      type: 'message',
      attributes: [Array]
    },
    Object <[Object: null prototype] {}> {
      type: 'coin_spent',
      attributes: [Array]
    },
    Object <[Object: null prototype] {}> {
      type: 'coin_received',
      attributes: [Array]
    },
    Object <[Object: null prototype] {}> {
      type: 'transfer',
      attributes: [Array]
    },
    Object <[Object: null prototype] {}> {
      type: 'message',
      attributes: [Array]
    }
  ],
  tx: Object <[Object: null prototype] {}> {
    typeUrl: '/cosmos.tx.v1beta1.Tx',
    value: Uint8Array(551) [
       10, 227,   2,  10, 219,   2,  10,  51,  47, 105, 110, 106,
      101,  99, 116, 105, 118, 101,  46, 101, 120,  99, 104,  97,
      110, 103, 101,  46, 118,  49,  98, 101, 116,  97,  49,  46,
       77, 115, 103,  67, 114, 101,  97, 116, 101,  83, 112, 111,
      116,  76, 105, 109, 105, 116,  79, 114, 100, 101, 114,  18,
      163,   2,  10,  42, 105, 110, 106,  49, 114, 118,  52, 112,
       57, 101, 117, 122, 117, 101,  57, 102,  56, 117, 108, 112,
      103,  97, 103, 109, 117, 122, 119,  97,  54, 114,  99,  50,
      108, 114,  52,  56,
      ... 451 more items
    ]
  },
  txHash: 'CD08F2F8A1FDB396A9CCC75D2DEE6223C56D497D6F979EBD3E4E1C8A9693755C'

```
This demostrates how to use injective-sdk-ts to place limit order
