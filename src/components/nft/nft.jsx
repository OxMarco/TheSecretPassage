import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class NFT extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nft: this.props.param,
        };
    }

    render() {
        return (
        <>
            {this.state.nft &&
            <div className={"item "+this.state.nft.category.toLowerCase()+" col-sm-6 col-md-4 col-lg-4 mb-4"}>
                <Link to={"/info/"+this.state.nft.tokenId} className="item-wrap fancybox">
                    <div className="work-info">
                        <h3>{this.state.nft.name}</h3>
                        <span>{this.state.nft.category}</span>
                    </div>
                    <img className="img-fluid" src={this.state.nft.image} />
                </Link>
            </div>
            }
        </>
        );
    }

}
