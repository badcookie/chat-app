import React from 'react';


export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputText: '' };
    }

    handleChange = ({ target }) => {
        this.setState({ inputText: target.value });
    }

    render() {
        const { inputText } = this.state;
        return (
            <div className="mt-auto">
                <form noValidate="" className="">
                    <div className="form-group">
                        <div className="input-group">
                            <input
                                onChange={this.handleChange}
                                name="body"
                                className="form-control"
                                value={inputText}
                            />
                            <div className="d-block invalid-feedback">&nbsp;</div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}