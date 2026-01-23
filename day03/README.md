# Day 3: Decentralised Applications (dApps)

This is part of the N days of Injective series!

## Pre-requisites
 
- Completed day 2 (smart contracts) in this series

## Clone starter repo (demo)

<speakerNotes>
</speakerNotes>

- in day2, you already cloned this git repository
- switch to the `day03` dir within the same repo

## Web3 client libraries

<speakerNotes>
</speakerNotes>

- 2 most popular ones: ethers.js and viem
- they provide wrapper functions around JSON-RPC commands + utility functions
- they're used to bridge betwen your app's logic and the web3 wallet
- we'll be using viem in this example dApp

## Configure blockchain info (demo)

<speakerNotes>
</speakerNotes>

- import the config for injective testnet
- this alows viem to send its JSON-RPC requests to the right place

## Inject web3 provider (demo)

<speakerNotes>
</speakerNotes>

- window.ethereum is "injected" by the EVM wallet
- pass this into `createWalletClient` from viem, along with chain configurations, to obtain a `client` object
- using this `client` object, you issues both read and write JSON-RPC requests

## Connect to smart contract (demo)

<speakerNotes>
</speakerNotes>

- use `client.readContract` to query current state
- use `client.writeContract` to update to new state - requiresa. signed transaction

## Provider, ABI, and deployed address

<speakerNotes>
</speakerNotes>

- notice that for both `readContract` and `writeContract`, we needed to pass in `functionName` for read operations
- notice that for `writeContract` only, we needed to pass in `account` for write operations
- an no matter what, we need to pass in the smart contract's deployed address and the smart contracts ABI
  - the `address` indicates "where" to send the function invocation to
  - the `abi`
    - is parsed
    - allows the function name (and paramaters if you have them) to be translated from Javascript types into bytecode in the request
    - allows the bytecode from the response to be converted from bytecode to Javscript types

## Query user interface (demo)

<speakerNotes>
</speakerNotes>

- create a non-editable text field + button for "value"
  - `addEventListener` on this button
  - when triggered, it issues the `readContract` to obtain the current value of the counter
  - when the response is received, it updates the value in the text field

## Update user interface (demo)

<speakerNotes>
</speakerNotes>

- create an empty `a` button for "increment"
  - `addEventListener` on this button
  - when triggered, it issues the `writeContract` to send the transaction
  - when the response is received, updates the transaction hash in the `a`'s `href`

## Read and write operations

<speakerNotes>
</speakerNotes>

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
