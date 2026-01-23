# Day 3: Decentralised Applications (dApps)

This is part of the N days of Injective series!

## Pre-requisites
 
- Completed day 2 (smart contracts) in this series

## Clone starter repo (demo)

Welcome back to Day 3! If you followed along with Day 2, you should already have the repository cloned. If not, pause here and check the description for the link.

Today, we're moving into the `day03` directory. Open up your terminal and let's navigate there. This directory contains the starter code for the frontend dApp we'll be building today.

## Web3 client libraries

To talk to the blockchain from a web browser, we use Web3 client libraries. You might have heard of Ethers.js, which has been the standard for a long time.

Today, however, we're using `viem`. It's a newer, more lightweight library that's gaining a lot of traction in the developer community for its performance and developer experience. These libraries are essential because they handle the complex JSON-RPC communication for us, acting as a bridge between our JavaScript logic and the blockchain.

## Configure blockchain info (demo)

First things first, we need to tell our application *which* blockchain to talk to. We're building on the Injective inEVM testnet.

In the code, we'll import the specific configuration for this chain. This ensures that when we send requests, they go to the correct Injective nodes and not Ethereum Mainnet or a different testnet. This configuration includes things like the Chain ID and the RPC URL.

## Inject web3 provider (demo)

Now, how do we access the user's wallet? When you install a browser extension wallet like MetaMask or Keplr, it "injects" a global object called `window.ethereum` into your browser page.

We're going to take that object and pass it into `viem`'s `createWalletClient`. This creates a `client` instance that acts as our main interface. Through this client, we can ask the user to sign transactions and read data from the chain. It's the handshake between our website and the user's funds.

- window.ethereum is "injected" by the EVM wallet
- pass this into `createWalletClient` from viem, along with chain configurations, to obtain a `client` object
- using this `client` object, you issues both read and write JSON-RPC requests

## Connect to smart contract (demo)

We have a client, now we need to talk to our specific 'Counter' contract that we deployed yesterday.

We'll use two main methods provided by viem: `readContract` and `writeContract`.
`readContract` is for fetching data—like checking the current count.
`writeContract` is for changing data—like incrementing the count.
Remember, reading is free and instant, while writing changes the blockchain state, costs gas, and requires a transaction signature.

- use `client.readContract` to query current state
- use `client.writeContract` to update to new state - requiresa. signed transaction

## Provider, ABI, and deployed address

Let's look at what we need to pass to these functions. You'll see `address` and `abi` everywhere.

The `address` is simple—it's the hexadecimal location where our contract lives on-chain.
The `ABI`, or Application Binary Interface, is crucial. It's like a translation dictionary. It tells our JavaScript code exactly how to format the data so the EVM understands it (converting function names and parameters into bytecode), and conversely, how to decode the binary response from the blockchain back into readable JavaScript types.

- notice that for both `readContract` and `writeContract`, we needed to pass in `functionName` for read operations
- notice that for `writeContract` only, we needed to pass in `account` for write operations
- an no matter what, we need to pass in the smart contract's deployed address and the smart contracts ABI
  - the `address` indicates "where" to send the function invocation to
  - the `abi`
    - is parsed
    - allows the function name (and paramaters if you have them) to be translated from Javascript types into bytecode in the request
    - allows the bytecode from the response to be converted from bytecode to Javscript types

## Query user interface (demo)

Let's hook this up to the UI. We'll start with reading the counter value.

We'll add an event listener to our 'Refresh' button. When clicked, it calls `readContract`. Since this is just a query, it's fast. We get the number back and immediately display it in this text field. Notice that no wallet popup appears—reading public data doesn't require user permission.

- create a non-editable text field + button for "value"
  - `addEventListener` on this button
  - when triggered, it issues the `readContract` to obtain the current value of the counter
  - when the response is received, it updates the value in the text field

## Update user interface (demo)

Now for the 'Increment' button. This is a write operation.

When the user clicks this, we call `writeContract`. This time, the wallet *will* pop up asking for approval because we're spending gas to change the state. Once the user signs, we get a transaction hash. We'll display this hash as a link to the Injective Explorer so the user can verify their transaction went through.

- create an empty `a` button for "increment"
  - `addEventListener` on this button
  - when triggered, it issues the `writeContract` to send the transaction
  - when the response is received, updates the transaction hash in the `a`'s `href`

## Read and write operations

To wrap up, let's solidify the difference between these two operations.

Read operations are like looking at a public bulletin board—anyone can do it, it's free, and you don't need permission or a signature.
Write operations are like posting a new notice—you need to sign it to prove it's you, and you pay a small fee (gas) to the network for the space and processing power used to update the ledger.

- read operations do not need transactions
  - because blockchain state is not updated
  - no signature is required
- read operations do not need transactions
  - because blockchain state is
  - a signature is required, so wallet triggers, asking you to approve or deny

## Complete!

Congratulations on completing this.
Next up is day 4, where we will go into more advanced topics.
We'll learn about precompiles, and about Injective's MultiVM token standard.
