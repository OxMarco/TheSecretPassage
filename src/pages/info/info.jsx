import React, { Component } from 'react';
import {
        FacebookShareButton,
        FacebookShareCount,
        FacebookIcon,
        RedditShareButton,
        RedditShareCount,
        RedditIcon
    } from "react-share";
import { Modal, Button, Form } from 'react-bootstrap';

export default class Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nft: null,
            show: false,
            review: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        var nft_data = await this.props.api.getNFTbyId(this.props.match.params.id);
        this.setState({ nft: nft_data });
        console.log(this.state.nft)
    }


    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ show: false });

        alert(this.state.nickname);
    }

    handleClose() {
        this.setState({ show: false });
    }

    render() {

        const shareUrl = window.location.href;

        return(
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Leave a review</Modal.Title>   
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="review">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control as="select" name="review" required onChange={this.handleChange}>
                                <option>Choose...</option>
                                <option value="1">I don't like it</option>
                                <option value="2">Barely ok</option>
                                <option value="3">Not bad</option>
                                <option value="4">Nice</option>
                                <option value="5">Looks amazing!</option>
                            </Form.Control>
                            </Form.Group>
                            <br />
                            <Button variant="primary" type="submit">
                                Send
                            </Button>{' '}
                            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

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
                                                <p>{this.state.nft.description}</p>
                                            </div>

                                            <h4 className="h4 mb-3">Properties</h4>
                                            <ul className="list-unstyled list-line mb-5">
                                                <li><i>Category:</i>&nbsp;{this.state.nft.category}</li>
                                                <li><i>Author:</i>&nbsp;{this.state.nft.author}</li>
                                                <li><i>Resellable:</i>&nbsp;{this.state.nft.resellable ? "Yes" : "No"}</li>
                                                <li><i>Copyright Transfer:</i>&nbsp;{this.state.nft.copyright_transfer ? "Yes" : "No"}</li>
                                            </ul>

                                            <h4 className="h4 mb-3">Rating</h4>
                                            <ul className="list-unstyled">
                                                <li className="mb-3">
                                                    <span className="bi bi-star-fill"></span>
                                                    <span className="bi bi-star-fill"></span>
                                                    <span className="bi bi-star-fill"></span>
                                                    <span className="bi bi-star"></span>
                                                    <span className="bi bi-star"></span>
                                                </li>
                                            </ul>

                                            <p className="mb-5"><button onClick={() => this.setState({ show: true })} className="readmore">Rate it</button></p>

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
