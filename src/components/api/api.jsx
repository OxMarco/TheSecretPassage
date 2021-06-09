import sanitizeHtml from 'sanitize-html';
import { BN, Long, bytes, units } from '@zilliqa-js/util';
import { toBech32Address } from '@zilliqa-js/crypto';

export default class Api {
    constructor(zilliqa) {
        const chainId = 333; // chainId of the developer testnet
        const msgVersion = 1; // current msgVersion
        const VERSION = bytes.pack(chainId, msgVersion);
        const contractAddress = 'zil17l2f9ptu9dqyvyf2m8pf8n3r6telrqaj8tfa25';

        this.zilliqa = zilliqa;
        this.version = VERSION;
        this.gasPrice = units.toQa('2000', units.Units.Li); // Gas Price that will be used by all transactions
    }

    async createUser(nickname, imageCID) {
        try {
            const contract = this.zilliqa.contracts.at(this.contractAddress);
            const callTx = await contract.call(
                'GetTokenURI',
                [],
                {
                    // amount, gasPrice and gasLimit must be explicitly provided
                    version: this.VERSION,
                    amount: new BN(0),
                    gasPrice: this.gasPrice,
                    gasLimit: Long.fromNumber(10000),
                }
            );
            console.log(callTx);
            

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async getNFTs() {
        var nfts = ['zil17l2f9ptu9dqyvyf2m8pf8n3r6telrqaj8tfa25'];

        return nfts;
    }

    async getNFT(contractAddress) {
        var storedNfts = [];

        const contract = this.zilliqa.contracts.at(contractAddress);
        const data = await contract.getState();
        const urls = (data.token_uris);
        for(let i = 1; i < data.total_supply; i++) {
            var res = await fetch(urls[i]);
            storedNfts.push((await res.json()));
        }

        return storedNfts;
    }

    async getNFTbyId(contractAddress, id) {
        const contract = this.zilliqa.contracts.at(contractAddress);
        const data = await contract.getState();
        const urls = data.token_uris;
        var res = await fetch(urls[id]);

        return await res.json();
    }

    async getReviews(NFTaddress) {
        return [];
    }

    async addReview(NFTaddress, rating) {
        return true;
    }
}
