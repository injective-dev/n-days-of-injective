import { makeMsgCreateSpotLimitOrder } from "./limitorder"
import { MsgBroadcasterWithPk } from '@injectivelabs/sdk-ts';
import { Network } from '@injectivelabs/networks'
import * as dotenv from 'dotenv';

async function main() {
    dotenv.config();
    // ----- Config / env -----
    const PRIAVTE = process.env.PRIVATE || '<YOUR_PRIVATE_KEY>';
    const SENDER = process.env.SENDER || '<SENDER_ADDRESS_HERE>';
    // ------------------------
    console.log('From address:', SENDER);
    const placeOrderMsg = makeMsgCreateSpotLimitOrder(
        "10",  // price
        "1",    // quantity
        2,    // orderType (1 for Buy, 2 for Sell)
        SENDER,
        {
            // Amount that the chain requires is in the x / 10^(quoteDecimals - baseDecimals) format
            // where x is a human readable number stringified
            marketId: '0x0611780ba69656949525013d947713300f56c37b6175e02f26bffa495c3208fe', // Example marketId
            baseDecimals: 18,
            quoteDecimals: 6,
            // according to the format above, the default digit is (6 - 18), tens multipliers are powers of 10
            priceTensMultiplier: 10, // 10^10 * 10^-12 = 10^-2
            quantityTensMultiplier: 28, // 10^28 * 10^-12 = 10^16
        },
    );
    console.log('Place Order Msg:', placeOrderMsg);
    const txHash = await new MsgBroadcasterWithPk({
        privateKey: PRIAVTE,
        network: Network.TestnetK8s,
    }).broadcast({
        msgs: [placeOrderMsg]
    });
    console.log('Transaction result:', txHash);

}

main().catch((e) => {
    console.error('Unhandled error:', e);
    process.exit(1);
});