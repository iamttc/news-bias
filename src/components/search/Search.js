import './Search.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchNameAction } from '../../actions/Actions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '' }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.checkSubmit = this.checkSubmit.bind(this);
    }

    render() {
        return (
            <div className="Search">
                <TextField
                    floatingLabelText="search"
                    value = { this.state.name }
                    onChange = { this.handleUpdate }
                    onKeyPress = { this.checkSubmit } />
                <br />
                <FlatButton onTouchTap={() => this.onSubmit()}>enter</FlatButton>
                <FlatButton onTouchTap={() => this.setState({name:''})}>clear</FlatButton>
            </div>
        );
    }

    handleUpdate(event) {
        this.setState({ name: event.target.value });
    }

    // submit functions
    checkSubmit(event) {
        if (event.key === 'Enter')
            this.onSubmit();
    }
    onSubmit() {
        if (!this.state.name.trim())
            return;
        this.props.searchName(this.state.name);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchName: (name) => {
            dispatch(searchNameAction(name));
        }
    };
};

export default connect(null, mapDispatchToProps)(Search);
