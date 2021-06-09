import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
        FacebookShareButton,
        FacebookShareCount,
        FacebookIcon,
        RedditShareButton,
        RedditShareCount,
        RedditIcon
    } from "react-share";

export default class Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nft: null,
        };
    }

    async componentDidMount() {
        this.props.tracker.pageVisited('info');

        var nft_data = await this.props.api.getNFTbyId(this.props.match.params.address, this.props.match.params.id);
        this.setState({ nft: nft_data });
        console.log(this.state.nft)
    }

    render() {

        const shareUrl = window.location.href;

        return(
            <>
                <main id="main">

                    <section className="section">

                    {this.state.nft && 

                        <div className="site-section pb-0">
                            <div className="container">
                                <div className="row align-items-stretch">
                                    <div className="col-md-6 ml-auto" data-aos="fade-up">
                                        <img src={this.state.nft.image} alt="Image" className="img-fluid" />
                                    </div>
                                    
                                    <div className="col-md-3 ml-auto" data-aos="fade-up" data-aos-delay="100">
                                        <div className="sticky-content">
                                            <h3 className="h3">{this.state.nft.title}</h3>
                                            <p className="mb-4"><span className="text-muted">{this.state.nft.subtitle}</span></p>

                                            <div className="mb-5">
                                                <p>{this.state.nft.symbol}</p>
                                            </div>

                                            <h4 className="h4 mb-3">Properties</h4>
                                            <ul className="list-unstyled list-line mb-5">
                                                <li><i>TokenID:</i>&nbsp;{this.state.nft.tokenId}</li>
                                                <li><i>Author:</i>&nbsp;{this.state.nft.original_creator}</li>
                                                <li><i>Resellable:</i>&nbsp;{this.state.nft.resellable ? "Yes" : "No"}</li>
                                                <li><i>Copyright Transfer:</i>&nbsp;{this.state.nft.copyright_transfer ? "Yes" : "No"}</li>
                                            </ul>

                                            <h4 className="h4 mb-3">Rating</h4>
                                            <ul class="list-unstyled">
                                                <li class="mb-3">
                                                    <span className="bi bi-star-fill"></span>
                                                    <span className="bi bi-star-fill"></span>
                                                    <span className="bi bi-star-fill"></span>
                                                    <span className="bi bi-star"></span>
                                                    <span className="bi bi-star"></span>
                                                </li>
                                            </ul>

                                            <p className="mb-5"><Link to={"/review/"+this.state.nft.address+"/"+this.state.nft.tokenId} className="readmore">Rate it</Link></p>

                                            <div className="mb-5">
                                                <FacebookShareButton url={shareUrl} quote={this.state.nft.title}>
                                                    <FacebookIcon size={32} round />
                                                </FacebookShareButton>
                                                <FacebookShareCount url={shareUrl} />
                    
                                                <RedditShareButton url={shareUrl} title={this.state.nft.title} windowWidth={660} windowHeight={460}>
                                                    <RedditIcon size={32} round />
                                                </RedditShareButton>
                                                <RedditShareCount url={shareUrl} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    </section>

                </main>
            </>
        );
    }
}
