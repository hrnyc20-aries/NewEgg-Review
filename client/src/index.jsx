import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Overview from './components/overview.jsx';
import Reviews from './components/reviews.jsx';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: [],
            currentItem: 1
        };
        this.getReviews = this.getReviews.bind(this);
    }

    getReviews() {
        let itemId = this.state.currentItem;
        axios.get(`/reviews/${itemId}`)
             .then((response) => this.setState({reviews: response.data}))
             .catch((err) => console.error('There was a problem getting reviews: ' + err))
    }

    changeItem(itemId) {
        this.setState({currentItem: itemId});
        getReviews();
    }

    componentDidMount() {
        this.getReviews();
    }

    render() {
        return (
            <div className="app">
                <header className="navbar"><h2>Reviews</h2></header>
                <div className="main">
                    <Overview reviews={this.state.reviews} />
                    <Reviews reviews={this.state.reviews} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));