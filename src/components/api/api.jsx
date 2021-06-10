import { BN, Long, bytes, units } from '@zilliqa-js/util';

export default class Api {
    constructor(zilliqa, address) {
        const chainId = 333; // chainId of the developer testnet
        const msgVersion = 1; // current msgVersion

        this.zilliqa = zilliqa;
        this.address = address;
        this.version = bytes.pack(chainId, msgVersion);
        this.gasPrice = units.toQa('2000', units.Units.Li); // Gas Price that will be used by all transactions
        this.nftContractAddress = 'zil188mw6t93q5hnyqgjqjznvrk6atjssxya3l0kf8';
    }

    async createUser(userDataCID) {
        try {
            const contract = this.zilliqa.contracts.at(this.nftContractAddress);
            const callTx = await contract.call(
                'ConfigureUser',
                [
                    {
                        vname: 'addr',
                        type: 'ByStr20',
                        value: `${this.address.base16}`,
                    },
                    {
                        vname: 'userdata',
                        type: 'String',
                        value: `https://ipfs.io/ipfs/${userDataCID}`,
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
                'ConfigureMinter',
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

    async getNFTs() {
        var storedNfts = [];

        const contract = this.zilliqa.contracts.at(this.nftContractAddress);
        const data = await contract.getState();
        const urls = (data.token_uris);

        for(let i = 1; i <= data.total_supply; i++) {
            var res = await fetch(urls[i]);
            var d = await res.json();
            d.tokenId = i;
            storedNfts.push(d);
        }

        return storedNfts;
    }

    async getUsers() {
        var storedUsers = [];

        const contract = this.zilliqa.contracts.at(this.nftContractAddress);
        const data = await contract.getState();
        console.log(data)
        for (const [ key, value ] of Object.entries(data.users)) {
            var res = await fetch(value);
            var user = await res.json();
            user.address = String(key).toLowerCase();
            storedUsers.push(user);
        }

        return storedUsers;
    }

    async getUserByAddress(address) {
        const contract = this.zilliqa.contracts.at(this.nftContractAddress);
        const data = await contract.getState();

        for (const [ key, value ] of Object.entries(data.users)) {
            if(String(key).toLowerCase() === String(address).toLowerCase()) {
                var res = await fetch(value);
                return await res.json();
            }
        }

        return undefined;
    }

    async getReviewById(id) {
        const contract = this.zilliqa.contracts.at(this.nftContractAddress);
        const data = await contract.getState();
        const reviews = data.reviews;

        return parseInt(reviews[id]);
    }

    async getNFTbyId(id) {
        const contract = this.zilliqa.contracts.at(this.nftContractAddress);
        const data = await contract.getState();
        const urls = data.token_uris;
        var res = await fetch(urls[id]);

        return await res.json();
    }

    async addReview(tokenID, rating) {
        try {
            const contract = this.zilliqa.contracts.at(this.nftContractAddress);
            const callTx = await contract.call(
                'AddReview',
                [
                    {
                        vname: 'token_id',
                        type: 'Uint256',
                        value: tokenID,
                    },
                    {
                        vname: 'review',
                        type: 'Uint256',
                        value: rating,
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
}
