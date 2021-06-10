import React, { Component } from 'react';

export default class Mint extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            subtitle: '',
            description: '',
            author: '',
            category: '',
            image: null,
            minted: false,
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

    handleSubmit = async (e) => {
        e.preventDefault();

        const image = await this.props.ipfs.add(this.state.image, {
            progress: (prog) => console.log(prog),
        });
        const imageCID = image.path;

        const data = JSON.stringify({ 
            title: this.state.title,
            subtitle: this.state.subtitle,
            description: this.state.description,
            author: this.props.address.base16,
            category: this.state.category,
            image: `https://ipfs.io/ipfs/${imageCID}`,
        });

        const metadata = await this.props.ipfs.add(data);
        const metadataCID = metadata.path;

        this.props.api.mint(metadataCID);

        this.setState({minted: true, title: '', subtitle: '', description: '', author: '', category: '', image: null});
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

                                            { !this.state.minted &&
                                            <>
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
                                                <textarea className="form-control" name="description" id="description" cols="30" rows="10" value={this.state.description} required onChange={this.handleChange}></textarea>
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label htmlFor="category">Category</label>
                                                <select className="form-control" name="category" id="category" required onChange={this.handleChange}>
                                                    <option>Choose...</option>
                                                    <option value="media">Media</option>
                                                    <option value="artwork">Artwork</option>
                                                    <option value="images">Images</option>
                                                    <option value="collectibles">Collectibles</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label htmlFor="image">Image</label>
                                                <input className="form-control" name="image" id="image" type="file" accept="image/*" required onChange={this.handleFileChange} />
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <input type="submit" className="readmore d-block w-100" value="Create" />
                                            </div>
                                            </>
                                            }

                                            { this.state.minted &&
                                            <div className="col-md-12 my-3">
                                                <div className="sent-message">Your NFT has been minted. See it here: </div>
                                            </div>
                                            }
                                            
                                            <br />

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
