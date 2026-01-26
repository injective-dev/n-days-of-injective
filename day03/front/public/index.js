import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

console.log(mainnet);

const btnWallet = document.querySelector('#btnWallet');
const txtWallet = document.querySelector('#txtWallet');
let stateWallet = {
    n: 0,
};
btnWallet.addEventListener('click', (_event) => {
    stateWallet.n += 1;
    txtWallet.innerHTML = `btnWallet clicked: ${stateWallet.n}`;
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
