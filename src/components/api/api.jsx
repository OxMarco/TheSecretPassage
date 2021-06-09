import sanitizeHtml from 'sanitize-html';
import { BN, Long, bytes, units } from '@zilliqa-js/util';

export default class Api {
    constructor(zilliqa, address) {
        const chainId = 333; // chainId of the developer testnet
        const msgVersion = 1; // current msgVersion
        const VERSION = bytes.pack(chainId, msgVersion);
        const contractAddress = 'zil17l2f9ptu9dqyvyf2m8pf8n3r6telrqaj8tfa25';

        this.zilliqa = zilliqa;
        this.address = address;
        this.version = VERSION;
        this.gasPrice = units.toQa('2000', units.Units.Li); // Gas Price that will be used by all transactions
        this.nftContractAddress = 'zil108tx9e3pczzjrgs0sr54xstanqwaau9xrpa45p';
    }

    async mint(metadataCID) {
        try {
            const contract = this.zilliqa.contracts.at(this.nftContractAddress);
            const callTx = await contract.callWithoutConfirm(
                'Mint',
                [
                    {
                        vname: 'to',
                        type: 'ByStr20',
                        value: `${this.address}`,
                    },
                    {
                        vname: 'token_uri',
                        type: 'String',
                        value: metadataCID,
                    }
                ],
                {
                    // amount, gasPrice and gasLimit must be explicitly provided
                    version: this.version,
                    amount: new BN(0),
                    gasPrice: this.gasPrice,
                    gasLimit: Long.fromNumber(10000),
                }
            );
    
            // check the pending status
            const pendingStatus = await this.zilliqa.blockchain.getPendingTxn(callTx.id);
            console.log(`Pending status is: `);
            console.log(pendingStatus.result);
    
            // process confirm
            console.log(`The transaction id is:`, callTx.id);
            console.log(`Waiting transaction be confirmed`);
            const confirmedTxn = await callTx.confirm(callTx.id);
    
            console.log(`The transaction status is:`);
            console.log(confirmedTxn.receipt);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async burn(nftContractAddress, tokenId) {
        try {
            const contract = this.zilliqa.contracts.at(nftContractAddress);
            const callTx = await contract.callWithoutConfirm(
                'burn',
                [
                    {
                        vname: 'token_id',
                        type: 'Uint256',
                        value: `${tokenId}`,
                    }
                ],
                {
                    // amount, gasPrice and gasLimit must be explicitly provided
                    version: this.version,
                    amount: new BN(0),
                    gasPrice: this.gasPrice,
                    gasLimit: Long.fromNumber(10000),
                }
            );
    
            // check the pending status
            const pendingStatus = await this.zilliqa.blockchain.getPendingTxn(callTx.id);
            console.log(`Pending status is: `);
            console.log(pendingStatus.result);
    
            // process confirm
            console.log(`The transaction id is:`, callTx.id);
            console.log(`Waiting transaction be confirmed`);
            const confirmedTxn = await callTx.confirm(callTx.id);
    
            console.log(`The transaction status is:`);
            console.log(confirmedTxn.receipt);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async createUser(nickname, imageCID) {
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
