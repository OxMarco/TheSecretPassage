import React, { Component } from 'react';

export default class Error extends Component {
    render() {

        const msg = this.props.msg;

        return(
            <>
                <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">An Error Occurred!</h4>
                <p>{msg}</p>
                <hr />
                <p className="mb-0">Follow the instructions above and reload the page.</p>
                </div>
            </>
        );
    }
}
