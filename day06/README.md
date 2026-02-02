# Injective AMMs and Order Books

This repository provides a technical overview of Automated Market Makers and order book based exchanges, with a focus on how Injective natively supports fully on chain order books through its Exchange Module.

---

## Automated Market Makers

An Automated Market Maker is a trading mechanism that replaces direct counterparties with a deterministic pricing function. Liquidity is supplied into shared pools by liquidity providers rather than through individual limit orders. Trades execute against the pool according to a predefined mathematical invariant that governs the price curve.

The most common invariant is the constant product formula, where the product of two asset reserves remains constant. Prices are derived from reserve ratios, and each trade shifts the price along the curve. Liquidity providers earn fees proportional to their share of the pool and total trading volume.

AMMs provide continuous liquidity, permissionless access, and deterministic execution. Their limitations include capital inefficiency, increased slippage for large trades, and impermanent loss caused by price divergence from external markets.

---

## Order Book Based Exchanges

Order book exchanges structure liquidity as discrete buy and sell orders at explicit price levels. Traders submit limit orders that rest in the book or market orders that consume existing liquidity. Matching occurs when bid and ask prices cross, following strict price time priority.

Order books enable accurate price discovery, dense liquidity at competitive price levels, and strong capital efficiency since capital is committed only at selected prices. They support advanced trading strategies including professional market making, arbitrage, and low latency execution.

The primary challenges are higher system complexity, liquidity fragmentation, and historical incompatibility with on chain execution due to latency constraints, gas costs, and state growth.

---

## Injective Exchange Module and On Chain Order Books

Injective implements fully on chain order books through its native Exchange Module, integrated at the protocol level rather than deployed as a smart contract. Order matching is embedded directly into the blockchain state machine, enabling deterministic execution and high throughput.

The Exchange Module maintains spot and derivatives order books with price time priority enforced at the consensus layer. Orders can be placed, matched, partially filled, or canceled within a single block. Matching logic is executed by validators, ensuring fairness and preventing miner extractable manipulation.

Injective employs a frequent batch auction matching model. All orders submitted within a block are collected, sorted, and matched atomically. This design mitigates front running, improves execution integrity, and aligns trade finality with block finality.

For derivatives markets, margin checks, funding payments, liquidations, and risk controls are integrated directly into the module. This allows Injective to support perpetual and futures markets with native risk management while remaining fully on chain.

By moving the order book and matching engine into the core protocol, Injective achieves the precision and capital efficiency of traditional exchanges while preserving decentralization, composability, and cryptographic settlement guarantees.

---

## Demos

This repository includes a demo demonstrating how to interact with the Injective Exchange Module using the Injective TypeScript SDK.

See the [spotmarket](./spotmarket/) directory for the complete tutorial on:
- Fetching spot market data
- Understanding market parameters
- Placing limit buy and sell orders
- Querying order status and trade history
- Converting between chain and human-readable formats

Each demo illustrates different integration paths for developers building on Injective.
