# Injective Day 07 – Run a Local Injective Node and Interact With It

This repository is part of the **Injective Day 07** learning series.  
Its goal is to help developers understand how Injective works at the protocol level by running an Injective node locally and interacting with it directly.

By the end of this repo, you should be able to start a local Injective node, connect to it, and perform basic interactions using standard Injective tooling.

---

## What You Will Learn

- How to run an Injective node locally
- How the Injective blockchain is initialized and started

---

## Prerequisites

Before getting started, make sure you have the following installed:

- Go (version compatible with Injective)
- Docker
- Git

---
Note: if you finihsed day05, your enviorment are all set.

## Repository Structure

```text
.
├── setup.sh
├── README.md

```


## Guide: Running an Injective Node with setup.sh

This guide will help new users set up and run an Injective node using the provided `setup.sh` script in this repository. In this guide, a docker version of script will be used, if your platform support Linux, you can follow the guide from Injective doc: https://docs.injective.network/infra/join-a-network.

### Prerequisites
- macOS or Linux environment (tested on macOS)
- Docker

### Steps to Run Injective Node

1. **Clone the Repository**
   ```sh
   git clone <this-repo-url>
   cd n-days-of-injective/day07
   ```

2. **Review and Edit Environment Variables (Optional)**
   - Open `setup.sh` and review the key and mnemonic variables at the top of the file.
   - You can replace them with your own if needed.

3. **Make the Script Executable**
   ```sh
   chmod +x setup.sh
   ```

4. **Run the Setup Script**
   ```sh
   ./setup.sh
   ```
   - The script will:
     - Import keys using mnemonics
     - Allocate genesis accounts for all users and validators
     - Set up the genesis file and sign the genesis transaction

5. **Start the Injective Node**
   - After setup, follow any additional instructions printed by the script to start your node.
   - Typically, you can run:
     ```sh
     injectived start
     ```

6. **Interact with your local network**
   - Open another terminal, run command to check your local network state
   - Refer to day05 for more `injectived` examples
   ```sh
   injectived query bank balances \
   ${inj-prefix-wallet-address} \
   --chain-id injective-1
   ```

### Troubleshooting
- If you encounter permission errors, ensure you have execution rights on the script.
- For mnemonic/key errors, double-check the values in `setup.sh`.
- If you can not interact with your local node, check your docker instance not stopped.

### Additional Resources
- See the official Injective documentation for advanced configuration: https://docs.injective.network/
---


