import React, { Component } from 'react';

export default class Artists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authors: this.props.param,
        };

        console.log(this.props)
    }

    render() {
        return (
            <>
                
            </>
        );
    }
}
