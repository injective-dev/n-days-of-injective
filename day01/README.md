# Day 1: Set up

This is part on the N days of Injective series!

## Pre-requisites

TODO

## What is JSON-RPC?

<speakerNotes>
</speakerNotes>

- JSON is a data format
- RPC is a communications protocol, think of it as a type of API
- This is used in my types of apps, and is the de-facto means of client-server communications in EVM
- Where the client is the dApp or wallet, and the server is the blockchain node
- Both the request and response are in JSON, so they are human readable

## Connect to Injective EVM Testnet over JSON-RPC (demo)

<speakerNotes>
</speakerNotes>

- nav to docs page for EVM network info
- copy the testnet JSON-RPC URL
- explain what curl is
- copy a curl request for get latest block number
- paste the Testnet JSON-RPC URL into the curl command
- repeat the same curl request after a few seconds, note that the number has gone up
- now do the same steps for Mainnet

## BIP39 seed phrase → crypto key pair → account

<speakerNotes>
</speakerNotes>

- you may have heard of wallets and accounts, but there’s actually a lot of cryptography under the hood
- cryptography is a very complex field of mathematics which focuses on hiding and revealing private information
- it also focuses on authorisation and validation using complex math as well
- in blockchains, the most relevant part is asymmetric key pairs, being used to sign and verify transaction data
- won’t explain this in too much detail, so google it yourself, or check the linked resources
- what will focus on here is how to practically use it
- first we start with a series of words that are randomly selected from a set of dictionary words
- this is called a seed phrase
- this is used to generate a very very large number at random - think more than the number of atoms in the universe large
- that number is your private key
- from the private key, another very large number is generated, and this is your public key
- but this process is unidirectional - you can NOT work out what your private key is from your public key
- then the public key goes through a much simpler formatting process to produce an address
- address + public key + private key equals account
- once you have a private key, you can use that to sign transactions
- once you have a public key, you can use that to verify signed transactions are indeed signed by a particular account
- this is a crucial step in ensuring there aren’t fake unauthorised transactions on a blockchain

## EVM wallet and connect to Injective Testnet (demo)

<speakerNotes>
</speakerNotes>

- all those steps are super complex right?
- well you don’t have to do them manually - wallet software helps you to do that!
- use the bip39 tool to generate a seed phrase, and copy this somewhere
- install an EVM wallet - we’ll use metamask
- paste your bip39 seed phrase into it during the set up
- nav to the injective testnet network info page
- paste the details … but actually we’re going to find an easier way
- instead we’ll go to blockscout and press the metamask button there, and this will pre-fill al the fields automatically
- ok wallet is set up!

## Claim Testnet INJ for transactions from a faucet (demo)

<speakerNotes>
</speakerNotes>

- nav to the injective faucet page
- connect with wallet, and the address is prefilled
- you will notice that you have both a bech32 address (starts with inj), and an EVM address (starts with 0x)
- this is because injective has a MultiVM architecture
- think of these 2 addresses as just different display formats for the same account, the underlying private key and public key are the same
- press the request button, complete the captcha, then wait
- (if there is a “no transaction found” error message, just explain it away, and refresh on block explorer)
- now you have some testnet INJ
- INJ is the native cryptocurrency on the Injective network

## Perform a Transaction on Injective Testnet 

<speakerNotes>
</speakerNotes>

- remember the BIP39 seed phrase?
- it isn’t used to generate a single account - in fact it can be used to generate 100s of accounts if you wanted to
- that is called a “hierarchically deterministic wallet”, but we won’t get into how that works under the hood
- instead we’ll just focus on the fact that you can simply create more accounts within your wallet without any further setup required
- so for the 2nd account, copy its address
- then go back to the 1st account, and transfer some INJ into it
- wait for the transaction to complete
- then check on blockscout

## Complete!

Congratulations on completing this.
Next up is day 2, where we will start with smart conbtracts!
