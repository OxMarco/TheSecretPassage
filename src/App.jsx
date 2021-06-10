import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IpfsRouter from 'ipfs-react-router';
import IpfsHttpClient from 'ipfs-http-client';

import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Info from './pages/info/info';
import Mint from './pages/mint/mint';
import Error from './pages/error/error';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loader from './components/loader/loader';
import Api from './components/api/api';

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            msg: '',
            zilliqa: null,
            address: '',
            ipfs: null,
            api: null,
            isLoaded: false
        };

        this.init = this.init.bind(this);
    }

    async init() {
        if(typeof await window.zilPay === 'undefined') {
            console.error(window.zilPay)
            this.setState({error: true, msg: 'Download and install ZilPay.'});
        } else if(await window.zilPay.wallet.isEnable){
            return true;
        } else {
            const isConnected = await window.zilPay.wallet.connect();
            if (isConnected) {
              return true;
            } else {
                this.setState({error: true, msg: 'Check if ZilPay wallet extension is activated.'});
                return false;
            }
        } 
    }

    async componentDidMount() {
        let isInjected = await this.init();
        if(isInjected) {
            const networkId = await window.zilPay.wallet.net;
            const zilliqa = await window.zilPay;
            const address = await window.zilPay.wallet.defaultAccount;

            if(networkId !== 'testnet') {
                this.setState({error: true, msg: 'Set network to testnet via ZilPay.'});
                return;
            }

            const api = new Api(zilliqa, address);
            const ipfs = IpfsHttpClient({
                host: "ipfs.infura.io",
                port: "5001",
                protocol: "https",
            });

            this.setState({
                zilliqa: zilliqa,
                address: address,
                isLoaded: true,
                ipfs: ipfs,
                api: api
            });
        }
    }

    render() {
        const {isLoaded, error, msg } = this.state;

        if(error)
            return(
                <Error msg={msg} />
            );
        else if(!isLoaded)
            return(
                <Loader />
            );
        else
        return (
            <IpfsRouter>
                <>
                <Header />
                <Switch>
                    <Route exact path="/mint" render={(props) => <Mint address={this.state.address} api={this.state.api} ipfs={this.state.ipfs} {...props} />} />
                    <Route exact path="/dashboard" render={(props) => <Dashboard address={this.state.address} api={this.state.api} ipfs={this.state.ipfs} {...props} />} />
                    <Route exact path="/info/:id" render={(props) => <Info address={this.state.address} api={this.state.api} ipfs={this.state.ipfs} {...props} />} />
                    <Route render={(props) => <Home address={this.state.address} api={this.state.api} ipfs={this.state.ipfs} {...props} />} />
                </Switch>
                <Footer />
                </>
            </IpfsRouter>
        );
    }
}
