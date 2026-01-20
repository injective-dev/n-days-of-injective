# Day 2: Smart Contract Basics

This is part of the N days of Injective series!

## Pre-requisites

TODO

## What is a smart contract?

So, what exactly is a smart contract?

At its core, a smart contract is simply a program that runs on a blockchain. Unlike scripts that run on your local machine or a centralized server, these live on the decentralized network.

For EVM (Ethereum Virtual Machine) compatible blockchains like Injective, there are a few languages we can use: Solidity, Yul, and Vyper.

In this series, we will focus on **Solidity**. It is by far the most dominant language in the space, with the largest ecosystem and tooling support, making it the best place to start.

## What is a smart contract **not**?

Now, the name "Smart Contract" can be a bit misleading. Let's clarify what it is *not*.

First, it is not "Smart" in the sense of Artificial Intelligence. It doesn't have a brain; it doesn't "think." It's just code that follows logic we give it.

Second, it is not a "Contract" in the legal sense. You can't take it to a court of law in the same way you would a paper agreement.

The term was coined historically to describe the idea of a protocol that facilitates, verifies, or enforces the negotiation or performance of a contract. Think of it as a digital vending machine: it autonomously executes actions according to predefined, immutable instructions. If you put the money in and press the button, the machine *must* give you the soda. No middleman required.

## Clone starter repo (demo)

Alright, enough theory. Let's get building.

(Demo)
Open up your terminal. We're going to clone the starter repository. You can use the SSH link shown here: `git@github.com:injective-dev/n-days-of-injective.git`. Alternatively, use HTTPS if you prefer.

We will be using this same repository for the rest of the "N Days of Injective" series, so keep it safe!

Once cloned, `cd` into the `day02` directory.

Let's take a quick tour of the project structure in `day02/src`. This is a standard Hardhat project.
- `contracts/`: This is where our Solidity smart contract lives.
- `artifacts/`: This is where the compiled build outputs will go.
- `test/`: This is where our test scripts are located.

## Overview of smart contract development steps

Before we run commands, let's visualize the workflow. Smart contract development usually follows this cycle:

1. **Write Code**: We write our logic in Solidity.
2. **Compile**: We use `solc` (via Hardhat) to turn that code into machine-readable bytecode.
3. **Test**: We run local tests using Mocha and Hardhat to ensure logic is correct.
4. **Security Analysis**: In a real project, you'd audit your code here. We'll skip this for the tutorial, but never skip it in production!
5. **Deploy**: We send a transaction to put our contract on the blockchain.
6. **Verify**: We publish our source code to the block explorer so others can trust it.
7. **Interact**: Finally, we use queries and transactions to use our live application.

## Compile Solidity with solc (demo)

Let's start with step 2: Compiling.

(Demo)
Run the compile command in your terminal.

`npx hardhat compile`

Hardhat will invoke the Solidity compiler (`solc`). Once it's done, check the `artifacts` folder. You'll see two critical things:
1. **The ABI (Application Binary Interface)**: This is like a manual that tells other apps how to talk to your contract.
2. **The EVM Bytecode**: This is the actual "machine code" that the Ethereum Virtual Machine understands and executes.

## Run test cases (demo)

Now, let's test.

(Demo)
Our tests are in the `test/` folder. We're using a setup similar to Mocha, but supercharged by Hardhat for smart contracts.

Run the test command: `npx hardhat test`.

Oops! It looks like we have a failure. This is actually great—it shows our tests are working. Let's read the error... it seems we expected one value but got another.

Let's go into the code and fix that logic error. [Fix code].

Now, run the test again. Green checkmarks!

## Specification-Implementation correctness quadrants

This process touches on the "4 Quadrants of Specification and Implementation".
- Ideally, we want **Correct Spec, Correct Impl**.
- A failing test usually means **Correct Spec, Wrong Impl** (what we just had).
- Dangerous territory is **Wrong Spec, Correct Impl** (tests pass, but do the wrong thing).
- And of course, **Wrong Spec, Wrong Impl** is just chaos.

## Deploy EVM bytecode to blockchain (demo)

Tests passed. Let's ship it.

(Demo)
We'll run our deployment script now.

`npx hardhat run scripts/deploy.js --network injective_testnet`

Watch the terminal. You'll see a deployment transaction hash, and then... boom! We have a deployed contract address.

Copy that address. Let's go to the Injective Testnet Explorer (Blockscout). Paste the address.

You can see our contract exists! But look at the "Contract" tab. It just shows raw bytecode. It's a "black box". We know it's there, but we can't easily read what it does yet.

## Verify details on network explorer (demo)

Let's open up that black box. We need to **verify** the contract.

(Demo)
Run the verification command. This sends our source code and compiler settings to the explorer.

`npx hardhat verify --network injective_testnet <ADDRESS>`

It says "Successfully verified contract".

Now, go back to the explorer and refresh the page. Look at the "Contract" tab now.
We can see the full Solidity source code and the ABI! This is crucial for trust—users can now verify exactly what logic they are interacting with.


## What is deployment and verification?

Let's pause and distinguish between what we just did.

**Deployment** is an on-chain action. We sent a transaction containing our bytecode. The network executed it, which did two things:
1. Copied the bytecode into permanent blockchain storage at a specific address.
2. Ran the `constructor` function to set up the initial state.

**Verification** is an off-chain action. No transaction was sent to the blockchain itself. We just talked to the Block Explorer's API. We said, "Here is the source code." The explorer compiled it locally, compared the output to the bytecode on the chain, and since they matched, it gave us that green checkmark.

## Query smart contract (demo)

Now that it's live, let's talk to it.

First, we'll **Query**. This means reading data.
Run the query script.

`npx hardhat run scripts/query.js`

We get the current value back almost instantly. Notice we didn't have to sign a wallet transaction or pay gas? That's because we are just reading existing state from a node.


## Update smart contract (demo)

Now, let's **Update** the contract.

(Demo)
Run the transaction script.

`npx hardhat run scripts/tx.js`

This is different. We are asking the network to change the state of the contract. This requires a transaction. We have to sign it, broadcast it, and pay a gas fee.
We wait a few seconds for a block to be produced... and confirmed!
Check the explorer again—you'll see a new transaction in the history.

## Read vs write operations

To summarize the difference:

A blockchain is a state machine. It stores a current "state" (who owns what, what values are stored).

- **Transactions (Write)**: These are instructions to transition the state from "Before" to "After". They cost gas and take time to confirm.
- **Queries (Read)**: These just look at the current state. They don't change anything, so they are free and fast.

Understanding this distinction is key to building efficient dApps.

## Complete!

Congratulations on completing this.
Next up is day 2, where we will start with smart contracts!
