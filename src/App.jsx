import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IpfsRouter from 'ipfs-react-router'

import Home from './pages/home/home';
import Review from './pages/review/review';
import Info from './pages/info/info';
import Error from './pages/error/error';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loader from './components/loader/loader';
import Api from './components/api/api';
import Tracker from './components/tracker/tracker';

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            msg: '',
            tracker: new Tracker(),
            zilliqa: null,
            address: '',
            api: null,
            loggedIn: false
        };

        this.init = this.init.bind(this);
    }

    async init() {
        if(window.zilPay.wallet.isEnable){
            return true;
        } else {
            const isConnected = await window.zilPay.wallet.connect();
            if (isConnected) {
              return true;
            } else {
                this.setState({error: true, msg: 'Download or reinstall ZilPay wallet.'});
                return false;
            }
        } 
    }

    async componentDidMount() {
        while(!await this.init()) {
            console.log('...initiating wallet...');
        }

        const networkId = await window.zilPay.wallet.net;
        /// if(networkId !== 'testnet') this.setState({error: true, msg: 'Set network to testnet via ZilPay.'});

        const api = new Api(window.zilPay);
        this.setState({
            zilliqa: window.zilPay,
            address: window.zilPay.wallet.defaultAccount.base16,
            loggedIn: true,
            api: api
        });
    }

    render() {
        const { loggedIn, error, msg } = this.state;

        if(error)
            return(
                <Error msg={msg} />
            );
        else if(!loggedIn)
            return(
                <Loader />
            );
        else
        return (
            <IpfsRouter>
                <>
                <Header />
                <Switch>
                    <Route exact path="/review/:address/:id" render={(props) => <Review tracker={this.state.tracker} address={this.state.address} web3={this.state.web3} api={this.state.api} userInfo={this.state.userInfo} {...props} />} />
                    <Route exact path="/info/:address/:id" render={(props) => <Info tracker={this.state.tracker} address={this.state.address} web3={this.state.web3} api={this.state.api} userInfo={this.state.userInfo} {...props} />} />
                    <Route render={(props) => <Home tracker={this.state.tracker} address={this.state.address} api={this.state.api} />} />
                </Switch>
                <Footer />
                </>
            </IpfsRouter>
        );
    }
}
