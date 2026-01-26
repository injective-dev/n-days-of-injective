# Day 4: Precompiles + MultiVM token standard (MTS)

This is part of the N days of Injective series!

## Pre-requisites
 
- Completed day 2 (smart contracts) in this series
- Optional: Completed day 3 (dApps) in this series

## Starter repo (demo)

<speakerNotes>
</speakerNotes>

Welcome back to day 4!
If you followed along with day 2, you should already have the repository cloned.
If not, pause here and complete day 2 before resuming.

Today, you simply need to `cd` into the `day04` directory.
Open up your terminal and let's navigate there.

```shell
cd day04/
```

This directory contains the starter code for the MTS project we will be building today.

## EVM precompiles

<speakerNotes>
</speakerNotes>

- code that is embedded into the injective node itself
- its interface is programmatically exposed to EVM smart contracts through precompiles
- how it actually works:
  - you get an ABI and an address
  - you interact with that address according to the methods described in the ABI
  - however, there's no actual smart contract present at that address
  - that address really is just an alias for native Injective code
- analogy: foreign function interface (FFI) that allows code written in one programming language to speak to code written in another programming language

## MultiVM Token Standard (MTS)

<speakerNotes>
</speakerNotes>

- injective has a MultiVM architecture
  - in other words: the same blockchain supports multiple VMs
  - specifically: Cosmos, CosmWasm, and EVM right now
  - with the groundwork laid to support more in the future
  - note that typically each blockchain only supports a single VM, making Injective more powerful/ feature rich
- this is great, because it means that
  - the retail users and developers from different blockchains can more easily use Injective with their existing tools and skills
  - liquidity of the assets across the different VMs can theoretically be pooled
- however that liquidity pooling does not happen automatically
  - typically this would imply some form of conversion between assets on one VM into assets on another
  - that is indeed the approach that most have taken, e.g. bridges
  - however Injective has taken a fundamentally different approach
  - essentially fungible tokens are the same underlying asset no matter which VM it is in
  - and the different VMs simply expose different interfaces to interact with that same underlying token
- this novel approach has been codified as the multiVM token standard (MTS)
  - read more at: https://docs.injective.network/developers-evm/multivm-token-standard and https://docs.injective.network/developers-evm/multivm-token-standard and https://x.com/bguiz/status/1993517586831884546
  - what this means: the same fungible token is simultaeously *both* an EVM ERC20 and a Cosmos Denom
  - so if you come from the Cosmos ecosystem, you can use your Cosmos wallets to operate the token
  - and if you're from the EVM ecosystem, you can use you EVM wallets to operate the token
  - notably, there's no additonal step involved - no conversion, no bridging, etc

## Bank module + interface

<speakerNotes>
</speakerNotes>

- precomoile address: `0x0000000000000000000000000000000000000064`
- precompile ABI:
  - `transfer`, `balanceOf`, `totalSupply`, etc similar to ERC20
  - also `metadata`, `setMetadata`, `mint`, `burn`, etc which are not the same as ERC20
  - see full ABI below

Bank module ABI:
```solidity
interface IBankModule {
    function mint(address,uint256) external payable returns (bool);
    function balanceOf(address,address) external view returns (uint256);
    function burn(address,uint256) external payable returns (bool);
    function transfer(address,address,uint256) external payable returns (bool);
    function totalSupply(address) external view returns (uint256);
    function metadata(address) external view returns (string memory,string memory,uint8);
    function setMetadata(string memory,string memory,uint8) external payable returns (bool);
}
```

## Implement MTS using BankERC20 (demo)

<speakerNotes>
</speakerNotes>

- canonical implementation
  - extend `BankERC20.sol`, which itself extends `@openzeppelin/contracts/token/ERC20/ERC20.sol`
  - overview of what `BankERC20` does:
    - see: https://github.com/InjectiveLabs/solidity-contracts/blob/b152129a/src/BankERC20.sol
    - initialise the precompile

```solidity
    address constant bankContract = 0x0000000000000000000000000000000000000064;
    IBankModule bank = IBankModule(bankContract);
```

    - in the construtor, call `setMetadata`

```solidity
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    ) payable ERC20("", "") {
        // parent ERC20 metadata is not used
        bank.setMetadata(name_, symbol_, decimals_);
    }
```

    - override `totalSupply` and `balanceOf` to proxy values from the bank precompile methods with the same name

```solidity
    function totalSupply() public view virtual override returns (uint256) {
        return bank.totalSupply(address(this));
    }
```

    - override open zeppelin's `internal` function named `_update` to invoke `transfer`, `mint`, or `burn` in different scenarios

```solidity
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override {
        if (from == address(0)) {
            /* ... mint ... */
        } else if (to == address(0)) {
            /* ... burn ... */
        } else {
            // transfer
            bank.transfer(from, to, value);
        }
        /* ... */
    }
```


  - see `wINJ`, an example of a MTS token implementation: https://github.com/InjectiveLabs/solidity-contracts/blob/b152129a/src/WINJ9.sol
    - all an MTS token needs to do is to extend `BankERC20` and invoke the constructor for it.

```solidity
contract WINJ9 is BankERC20, IWINJ9 {
    event Deposit(address indexed dst, uint256 wad);
    event Withdrawal(address indexed src, uint256 wad);

    /// @notice Constructor for WINJ9 token
    /// @param name_ Token name
    /// @param symbol_ Token symbol
    /// @param decimals_ Token decimals
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    ) payable BankERC20(name_, symbol_, decimals_) {}
```

## MTS transfer with EVM transaction (demo)

<speakerNotes>
</speakerNotes>

- first compile, deploy, and verify the MTS token
  - compile instruction: TODO
  - deploy instruction: TODO
  - verify instruction: TODO
- once this is done
  - copy the deployed address from the terminal output of the deploy command, or the block explorer from the verification step
  - open the browser EVM wallet, and add the address as a new token
  - you should see a balance in your wallet
  - copy a 2nd wallet address
  - transfer some tokens

## Check MTS balances (demo)

<speakerNotes>
</speakerNotes>

- visit the token smart conbtract page on the block explorer
- go to the ABI page
- find the balanceOf method, and paste your wallet address into the parameter, and press the button to query
- note that your balance has decreased, and you can also see this reflected in your wallet
- in the same balanceOf method, and paste the other wallet address (of the receipient) into the parameter, and press the button to query
- note that its balance has increased

## Complete!

Congratulations on completing this.
Next up is day 5.
We'll learn about injectived and the Injective SDK.
