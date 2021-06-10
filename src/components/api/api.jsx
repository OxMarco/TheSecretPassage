import sanitizeHtml from 'sanitize-html';
import { BN, Long, bytes, units } from '@zilliqa-js/util';
const {
    toBech32Address,
    getAddressFromPrivateKey,
} = require('@zilliqa-js/crypto');

export default class Api {
    constructor(zilliqa, address) {
        const chainId = 333; // chainId of the developer testnet
        const msgVersion = 1; // current msgVersion

        this.zilliqa = zilliqa;
        this.address = address;
        this.version = bytes.pack(chainId, msgVersion);
        this.gasPrice = units.toQa('2000', units.Units.Li); // Gas Price that will be used by all transactions
        this.nftContractAddress = 'zil129my2q5arawdz8e9765n4n8wn7tvuay9x3ula5';
    }

    async createUser(nickname, avatarCID) {
        try {
            const contract = this.zilliqa.contracts.at(this.nftContractAddress);
            const callTx = await contract.call(
                'addUser',
                [
                    {
                        vname: 'user',
                        type: 'ByStr20',
                        value: `${this.address.base16}`,
                    },
                    {
                        vname: 'nickname',
                        type: 'String',
                        value: nickname,
                    },
                    {
                        vname: 'avatar',
                        type: 'String',
                        value: `https://ipfs.io/ipfs/${avatarCID}`,
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
            
            console.log(callTx)

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async configureMinter() {
        try {
            const contract = this.zilliqa.contracts.at(this.nftContractAddress);
            const callTx = await contract.call(
                'configureMinter',
                [
                    {
                        vname: 'minter',
                        type: 'ByStr20',
                        value: `${this.address.base16}`,
                    },
                ],
                {
                    // amount, gasPrice and gasLimit must be explicitly provided
                    version: this.version,
                    amount: new BN(0),
                    gasPrice: this.gasPrice,
                    gasLimit: Long.fromNumber(10000),
                }
            );
            
            console.log(callTx)

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async mint(metadataCID) {
        try {
            const contract = this.zilliqa.contracts.at(this.nftContractAddress);
            const callTx = await contract.call(
                'Mint',
                [
                    {
                        vname: 'to',
                        type: 'ByStr20',
                        value: `${this.address.base16}`,
                    },
                    {
                        vname: 'token_uri',
                        type: 'String',
                        value: `https://ipfs.io/ipfs/${metadataCID}`,
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

            console.log(callTx)

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
        var storedNfts = [];

        const contract = this.zilliqa.contracts.at(this.nftContractAddress);
        const data = await contract.getState();
        console.log(data)
        const urls = (data.token_uris);
        for(let i = 2; i <= data.total_supply; i++) {
            console.log('uri')
            console.log(urls[i])
            var res = await fetch(urls[i]);
            var d = await res.json();
            d.tokenId = i;
            storedNfts.push(d);
        }

        console.log(storedNfts)
        return storedNfts;
    }

    async getNFTbyId(id) {
        const contract = this.zilliqa.contracts.at(this.nftContractAddress);
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
