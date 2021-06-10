import React, { Component } from 'react';
import NFT from '../../components/nft/nft';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nfts: [],
            nickname: '',
            avatar: ''
        }
    }

    async componentDidMount() {
        var nft_data = await this.props.api.getNFTs();
        this.setState({ nfts: nft_data });
    }

    render() {
        return (
            <>

                <main id="main">
                    <section className="section site-portfolio">
                        <div className="container">
                            <div className="row mb-5 align-items-center">
                                <div className="col-md-12 col-lg-6 mb-4 mb-lg-0" data-aos="fade-up">
                                    <h2>Your NFTs</h2>
                                </div>
                                <div className="col-md-12 col-lg-6 text-start text-lg-end" data-aos="fade-up" data-aos-delay="100">
                                    <div id="filters" className="filters">
                                        <a href="#" data-filter="*" className="active">All</a>
                                        <a href="#" data-filter=".artwork">Artwork</a>
                                        <a href="#" data-filter=".images">Images</a>
                                        <a href="#" data-filter=".collectibles">Collectibles</a>
                                        <a href="#" data-filter=".media">Media</a>
                                    </div>
                                </div>
                            </div>
                            <div id="portfolio-grid" className="row no-gutter" data-aos="fade-up" data-aos-delay="200">

                            {
                            this.state.nfts &&
                            this.state.nfts
                                .map((nft) => <NFT key={nft.tokenId} param={nft} />
                            )}

                            </div>
                        </div>
                    </section>
                
                </main>
            </>
        );
    }
}
