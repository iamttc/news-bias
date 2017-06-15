import './Site.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import LinearProgress from 'material-ui/LinearProgress';
// import log from 'log';

const sentiment = require('sentiment');
const webhoseio = require('webhoseio');

class Site extends Component {
    constructor(props) {
        super(props);
        this.title = this.props.title;
        this.id = this.props.id;

        this.state = {
            name: '',
            data: [],
            sentiment: '',
            expanded: false,
            loading: false
        };

        this.getData = this.getData.bind(this);
        this.runQuery = this.runQuery.bind(this);
    }
    componentWillMount() { this.getData(); }
    componentWillReceiveProps(props, state) {
        console.log('component will receive props');
        this.setState({
            name: props.name
        }, this.getData(props.name));
    }

    render() {
        var load = null;
        if (this.state.name !== '' && this.state.loading)
            load = <LinearProgress mode="indeterminate" />
        return (
            <div className="Site">
                <Card expanded = { this.state.expanded } >
                    {load}
                    <CardHeader title = { this.title } />
                    <CardText expandable={true}>
                        <b>overall:</b> {this.state.sentiment} sentiment towards {this.props.name}
                        <br /><br />
                        <LineChart width={450} height={300} data={ this.state.data } >
                            <XAxis dataKey="name"/>
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                    </CardText>
                </Card>
            </div>
        );
    }

    getData(name) {
        if (name && name !== this.state.name) {
            this.setState({
                loading: true
            });
            setTimeout(() => {
                this.runQuery(name)
            }, 1000 * this.id);
        }
    }

    runQuery(name){
        var data = [];
        var sum = 0;

        const client = webhoseio.config({token: '9e1d5c3e-7190-42e3-a385-90805d5df0fa'});
        var query = "\"" + name + "\" language:english site:" + this.title + ".com";
        client.query('filterWebContent', { q: query })
        .then(response => {
            console.log(response);
            if (response['posts'] && response['posts'].length > 0){
                response['posts'].forEach(function(element, idx) {
                    var sent = sentiment(element['text']).score;
                    data.push({ name: idx, value: sent });
                    sum += sent;
                }, this);

                var sent = (sum / data.length) > 0 ? 'positive' : 'negative';

                this.setState({
                    data: data,
                    sentiment: sent,
                    expanded: true,
                    loading: false
                });
            }
            else{
                console.log(this.title + ' has no articles on this topic');
            }
        });
    }
}


const mapStateToProps = (state) => { 
    return {
        name: state.name
    };
};

export default connect(mapStateToProps, null)(Site);
