import { createWalletClient, custom } from 'viem';
import { injectiveTestnet } from 'viem/chains';

console.log(injectiveTestnet);

const smartContractDetails = await getJson('/api/smart-contract');
console.log(smartContractDetails);
const { rpc, address, abi } = smartContractDetails;

const btnWallet = document.querySelector('#btnWallet');
const txtWallet = document.querySelector('#txtWallet');
let stateWallet = {
    client: undefined,
    address: undefined,
};
btnWallet.addEventListener('click', async (_event) => {
    const result = await connectEvmWallet();
    if (result.ok) {
        const { client, address } = result;
        stateWallet = { client, address };
        console.log(stateWallet);
        txtWallet.innerHTML = `Connected to wallet, with account address: ${address}`;
    } else {
        txtWallet.innerHTML = `Error: ${result.error}`;
    }
});

const btnRead = document.querySelector('#btnRead');
const txtRead = document.querySelector('#txtRead');
let stateRead = {
    n: 0,
};
btnRead.addEventListener('click', (_event) => {
    stateRead.n += 1;
    txtRead.innerHTML = `btnRead clicked: ${stateRead.n}`;
});

const btnWrite = document.querySelector('#btnWrite');
const txtWrite = document.querySelector('#txtWrite');
let stateWrite = {
    n: 0,
};
btnWrite.addEventListener('click', (_event) => {
    stateWrite.n += 1;
    txtWrite.innerHTML = `btnWrite clicked: ${stateWrite.n}`;
});

async function getJson(url) {
    const fetchResponse = await fetch(url);
    if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }
    const data = await fetchResponse.json();
    return data;
}

async function connectEvmWallet() {
    if (typeof window?.ethereum === 'undefined') {
        return {
            ok: false,
            error: 'no injected web3 provider detected'
        };
    }

    let client;
    try {
        client = createWalletClient({
            chain: injectiveTestnet,
            transport: custom(window.ethereum),
        });
    } catch (ex) {
        return {
            ok: false,
            error: 'unable to initialise wallet client'
        };
    }

    let address;
    try {
        [address] = await client.requestAddresses();
    } catch (ex) {
        return {
            ok: false,
            error: 'unable to obtain account details'
        };
    }

    return {
        ok: true,
        address,
        client,
    };
}
