import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IpfsRouter from 'ipfs-react-router'

import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Info from './pages/info/info';
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
            api: null,
            isLoaded: false
        };

        this.init = this.init.bind(this);
    }

    async init() {
        if(typeof window.zilPay === 'undefined') {
            this.setState({error: true, msg: 'Download and install ZilPay.'});
            return false;
        } else if(window.zilPay.wallet.isEnable){
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
            /// if(networkId !== 'testnet') this.setState({error: true, msg: 'Set network to testnet via ZilPay.'});

            const api = new Api(window.zilPay);
            this.setState({
                zilliqa: window.zilPay,
                address: window.zilPay.wallet.defaultAccount,
                isLoaded: true,
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
                    <Route exact path="/dashboard" render={(props) => <Dashboard address={this.state.address} api={this.state.api} {...props} />} />
                    <Route exact path="/info/:address/:id" render={(props) => <Info address={this.state.address} api={this.state.api} {...props} />} />
                    <Route render={(props) => <Home address={this.state.address} api={this.state.api} />} />
                </Switch>
                <Footer />
                </>
            </IpfsRouter>
        );
    }
}
