import React, { Component } from 'react';

export default class Footer extends Component {

    render() {
        return (
            <>
                <footer className="footer" role="contentinfo">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <p className="mb-1">TheSecretPassage.</p>
                                <div className="credits">A NFT gallery built on Zilliqa</div>
                            </div>
                            <div className="col-sm-6 social text-md-end">
                                <a href="#"><span className="bi bi-twitter"></span></a>
                                <a href="#"><span className="bi bi-facebook"></span></a>
                                <a href="#"><span className="bi bi-instagram"></span></a>
                                <a href="#"><span className="bi bi-linkedin"></span></a>
                            </div>
                        </div>
                    </div>
                </footer>
                
                <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
            </>
        );
    }
}
