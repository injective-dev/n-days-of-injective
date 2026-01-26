# Day 4: Precompiles + MultiVM token standard (MTS)

This is part of the N days of Injective series!

## Pre-requisites
 
- Completed day 2 (smart contracts) in this series
- Optional: Completed day 3 (dApps) in this series

## Starter repo (demo)

Welcome back to day 4 of the 7 days of Injective series!

If you're joining us from Day 2, you're all set.
If not, please check the prerequisites.
Today we're diving into the code.
Open your terminal and navigate to the `day04` directory.
This will be our workspace for exploring the MultiVM Token Standard, or MTS.
We will be building an MTS token today!

## EVM precompiles

First, we need to understand what EVM Precompiles are on Injective.
These are *not* standard smart contracts.
They are native code embedded directly into the Injective nodes themselves.
We expose this native implementation to the EVM through specific addresses and ABIs.
When you interact with these addresses within your EVM smart contract,
you are *not* running EVM bytecode.
Instead, you're triggering native Injective logic.
Think of it like a Foreign Function Interface (FFI).
This allows our contracts written in Solidity to 'speak' directly to
the core blockchain modules within Injective, which are written using Go and the Cosmos SDK.

## MultiVM Token Standard (MTS)

This brings us to the MultiVM Token Standard (MTS).
Injective supports multiple environments: EVM, CosmWasm, and standard Cosmos modules.
We refer to each of these execution envionments as a virtual machine.
Hence the name "MultiVM".

Usually, assets in different VMs are fragmented.
Thus they require bridges, wrapping, or
some other conversion or equivalence translation mechanism.
Injective takes a different approach.
With MTS, a sfungible token is the *same* underlying asset across all VMs.
It is simultaneously an ERC20 token and a Cosmos Denom.
This means you can use both Metamask (an EVM wallet) and Keplr (a Cosmos wallet)
to manage the exact same asset without any conversion steps.

## Bank module + interface

How do you create an MTS token?
The magic happens via the Bank Module Precompile.
It lives at this specific address ending in `64`: `0x0000000000000000000000000000000000000064`.
Its interface looks similar to ERC20, with transfer and balance functions.
But it also includes native capabilities like minting, burning, and metadata management.
By invoking this EVM precompile, we are instructing the chain's native Bank module to operate the underlying asset.
Any change in the underlying asset is reflected instantly in both the EVM ERC20 and the Cosmos Denom.

## Implement MTS using BankERC20 (demo)

Let's look at the code.
We'll use the canonical `BankERC20` implementation.
This base contract handles the connection to the Bank precompile.
At the same time it also extends OpenZeppelin's ERC20 implementation.
It initialises the interface at the precompile address.
It overrides standard ERC20 methods to fetch data from the chain instead of contract storage.
And it routes balance related updates, like transfer/ mint/ burn, through to the Bank module.
To make your own MTS token, you just extend this contract.
It's that simple.

## MTS transfer with EVM transaction (demo)

Time for a demo.
I'm going to compile our MTS token.
...
Next, deploy the MTS token.
...
Finally, verify the MTS token.
...
Going back to the deployment, I'll grab the address and add it to my Metamask wallet.
You can see it behaves exactly like a standard EVM ERC20 token would within Metamask.
Now, I'll transfer some tokens to another wallet.
This transaction is signed by Metamask, processed by the EVM,
but the actual transfer of units of the fungible token
occurs as a Bank module action in the Injective node.

## Check MTS balances (demo)

Finally, let's check the transfer transaction via the block explorer.
I'll query the `balanceOf` function for both wallets.
First `balanceOf` for my own wallet.
Next `balanceOf` for the other wallet of the recipient.
Observe that my balance has decreased, and the recipient's has increased.
We've successfully used an EVM ERC20 and Cosmos Denom simultaneously
without actually bridging, wrapping etc.

## Complete!

Congratulations on completing this.
Next up is day 5.
We'll learn about injectived and the Injective SDK.
