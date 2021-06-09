import React, { Component } from 'react';

export default class Mint extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            subtitle: '',
            description: '',
            image: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    handleFileChange = (e) => {
        this.setState({ image: e.target.files[0] });
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {

        return(
            <>
                <main id="main">

                    <section className="section pb-5">
                        <div className="container">

                            <div className="row mb-5 align-items-end">
                                    <div className="col-md-6" data-aos="fade-up">
                                        <h2>Create a new NFT</h2>
                                        <p className="mb-0">Send your art across the blockchain</p>
                                    </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 mb-5 mb-md-0" data-aos="fade-up">

                                    <form role="form" className="php-email-form" onSubmit={this.handleSubmit}>

                                        <div className="row gy-3">
                                            <div className="col-md-12 form-group">
                                                <label htmlFor="title">Title</label>
                                                <input className="form-control" name="title" id="title" type="text" max="255" value={this.state.title} required onChange={this.handleChange} />
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label htmlFor="subtitle">Subtitle</label>
                                                <input className="form-control" name="subtitle" id="subtitle" type="text" max="255" value={this.state.subtitle} required onChange={this.handleChange} />
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label htmlFor="description">Description</label>
                                                <textarea className="form-control" name="description" id="description" cols="30" rows="10" required onChange={this.handleChange}>{this.state.description}</textarea>
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label htmlFor="image">Image</label>
                                                <input className="form-control" name="image" id="image" type="file" accept="image/*" required onChange={this.handleFileChange} />
                                            </div>

                                            <div className="col-md-12 my-3">
                                                <div className="sent-message">Your NFT has been minted. See it here: </div>
                                            </div>

                                            <div className="col-md-6 mt-0 form-group">
                                                <input type="submit" className="readmore d-block w-100" value="Create" />
                                            </div>
                                        </div>

                                    </form>

                                </div>
                            </div>

                        </div>

                    </section>

                </main>
            </>
        );
    }
}
