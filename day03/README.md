# Day 3: Decentralised Applications (dApps)

This is part of the N days of Injective series!

## Pre-requisites
 
- Completed day 2 (smart contracts) in this series

## Clone starter repo (demo)

Welcome back to day 3!
If you followed along with Day 2, you should already have the repository cloned.
If not, pause here and complete day 2 before resuming.

Today, simply need to `cd` into the `day03` directory.
Open up your terminal and let's navigate there.

```shell
cd day03/
```

This directory contains the starter code for the frontend dApp we will be building today.

## Web3 client libraries

To talk to the blockchain from a web browser,
we use web3 client libraries.
You might have heard of Ethers.js, which has been the standard for a long time.

Today, however, we're using `viem`.
It's a newer, more lightweight library that's gaining a lot of traction
among developers due to its performance and more intuitive DX.

These libraries are essential because they handle the complex JSON-RPC communication for us.
They act as a bridge between our JavaScript logic and the EVM wallet.

## Configure blockchain info (demo)

First things first, we need to tell our application *which* blockchain to talk to.
We're building on the Injective Testnet.

In the code, we'll import the specific configuration for this chain.
This ensures that when we send requests, they go to the correct Injective nodes,
and not to some other EVM network.

This configuration includes things like the Chain ID and the RPC URL.

## Inject web3 provider (demo)

Now, how do we access the user's wallet?
When you install a browser extension wallet such as MetaMask,
it *injects* a global object.
It is accesible as `window.ethereum` within the browser's Javascript environement.

We're going to take that object and pass it into `viem`'s `createWalletClient`.
This creates a `client` instance that acts as our main interface.
Through this client, we can ask the user to sign transactions and read data from the chain.
It is the handshake between our website and the user's funds.

## Connect to smart contract (demo)

We have a `client` object, which broadly allows your dApp to communicate with Injective Testnet.
Next we need to talk to our specific `Counter` smart contract that we deployed in day 2.

We'll use two main methods provided by viem:
`readContract` and `writeContract`.

- `readContract` is for fetching data, like checking the current count.
- `writeContract` is for changing data, like incrementing the count.

Remember, read operations are free and instant.
Write operations change the blockchain state, costs gas.
Therefore write operations require a siged transaction,
whereas read operations do not.

## Provider, ABI, and deployed address

Let's look at what we need to pass to these functions.
You'll see `address` and `abi` everywhere.

The `address` is simple:
it is the hexadecimal location where our contract lives on-chain.
The `ABI`, or Application Binary Interface, is crucial.
It's like a translation dictionary.
It tells our dApp exactly how to format the data so the EVM understands it.
So that viem can translates function names and parameters
into the binary representation used by the EVM.
Conversely, it tells our dApp how to decode the binary response from the EVM
back into readable JavaScript types.

## Query user interface (demo)

Let's hook this up to the user interface.
We'll start with reading the counter value.

We'll add an event listener to our 'Refresh' button.
When clicked, it invokes `readContract`.

Since this is just a query, it's fast.
We get the number back and immediately display it in this text field.
Notice that no wallet popup appears.
Reading public data doesn't require user permission.

## Update user interface (demo)

Now for the 'Increment' button.
This is a write operation.

When the user clicks this, we invoke `writeContract`.

This time, the wallet *will* pop up asking for approval
because we are changing the blockchain state.

Once the user signs, we get a transaction hash. 

We'll display this hash as a link to the Injective Explorer
so the user can verify their transaction went through.

## Read and write operations

To wrap up, let's solidify the difference between these two operations.

Read operations are like looking at a public bulletin board—anyone can do it,
it's free, and you don't need permission or a signature.

Write operations are different from read operations,
because you are updating the blockchain state.
You need to sign the transaction using a wallet it to prove it is authorised you.
You also pay a small fee (known as gas) to the network.
The gas fee is needed to compensate for the space and processing power
used to update the blockchain state.

## Complete!

Congratulations on completing this.
Next up is day 4, where we will go into more advanced topics.
We'll learn about precompiles, and about Injective's MultiVM token standard.
