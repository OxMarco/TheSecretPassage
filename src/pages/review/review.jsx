import React, { Component } from 'react';

export default class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nft: null,
        };
    }

    async componentDidMount() {
        this.props.tracker.pageVisited('review');

        var nft_data = await this.props.api.getNFTbyId(this.props.match.params.address, this.props.match.params.id);
        this.setState({ nft: nft_data });
        console.log(this.state.nft)
    }

    render() {

        return(
            <>
                {this.state.nft &&
                <main id="main">

                    <section className="section pb-5">
                        <div className="container">

                            <div className="row mb-5 align-items-end">
                                    <div className="col-md-6" data-aos="fade-up">
                                        <h2>Review</h2>
                                        <p className="mb-0">Leave a comment on "{this.state.nft.title}"</p>
                                    </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-5 mb-md-0" data-aos="fade-up">

                                    <form action="forms/contact.php" method="post" role="form" className="php-email-form">

                                        <div className="row gy-3">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="stars">Stars</label>
                                                <select name="stars" id="stars" className="form-control" required>
                                                    <option>Choose...</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label htmlFor="comment">Comment</label>
                                                <textarea className="form-control" name="comment" id="comment" cols="30" rows="10" required></textarea>
                                            </div>

                                            <div className="col-md-12 my-3">
                                                <div className="sent-message">Your review has been added. Thank you!</div>
                                            </div>

                                            <div className="col-md-6 mt-0 form-group">
                                                <input type="submit" className="readmore d-block w-100" value="Send Message" />
                                            </div>
                                        </div>

                                    </form>

                                </div>

                                <div className="col-md-4 ml-auto order-2" data-aos="fade-up">
                                <img className="img-fluid" src={this.state.nft.image} />

                                </div>

                            </div>

                        </div>

                    </section>

                </main>
                }
            </>
        );
    }
}
