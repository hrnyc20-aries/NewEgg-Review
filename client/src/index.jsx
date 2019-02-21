import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Overview from './components/overview.jsx';
import Reviews from './components/reviews.jsx';
import Blank from './components/blank.jsx'
import $ from 'jquery';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            view: "reviews",
            reviews: [],
            currentItem: 1
        };
        this.getReviews = this.getReviews.bind(this);
        this.voteHelpful = this.voteHelpful.bind(this);
        this.voteNotHelpful = this.voteNotHelpful.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.renderView = this.renderView.bind(this);
        this.changeView = this.changeView.bind(this);
    }

    getReviews() {
        let itemId = this.state.currentItem;
        axios.get(`/reviews/${itemId}`)
             .then((response) => this.setState({reviews: response.data}))
             .catch((err) => console.error('There was a problem getting reviews: ' + err))
    }

    voteHelpful(review) {
        axios.patch('/reviews', {id: review.id, helpful: true})
             .then((response) => console.log('Your vote counted!'))
             .catch((err) => console.error('Could not process vote'))
        this.getReviews();
    }

    voteNotHelpful(review) {
        axios.patch('/reviews', {id: review.id, helpful: false})
             .then((response) => console.log('Your vote counted!'))
             .catch((err) => console.error('Could not process vote'))
        this.getReviews();
    }

    changeItem(itemId) {
        this.setState({currentItem: itemId});
        getReviews();
    }

    componentDidMount() {
        this.getReviews();
    }

    changeView(newView) {
        this.setState(
            {view: newView}
            );
    }

    renderView() {
        const {view} = this.state;
        if (view === 'reviews') {
            return (
                <React.Fragment>
                    <Overview sort={this.sort} filterByRating={this.ratingFilter}  reviews={this.state.reviews} />
                    <Reviews voteHelpful={this.voteHelpful} voteNotHelpful={this.voteNotHelpful} reviews={this.state.reviews} />
                </React.Fragment>
            )
        } else {
            return <Blank />
        }
    }

    render() {
        return (
            <div className="app">
                <div className="navbar">
                    <span className={this.state.view === 'overview'
                        ? 'nav_selected'
                        : 'nav_unselected'}
                        onClick={() => this.changeView('overview')}>
                        <span className="nav_title">Overview</span>
                        </span>
                    <span className={this.state.view === 'specs'
                        ? 'nav_selected'
                        : 'nav_unselected'}
                        onClick={() => this.changeView('specs')}>
                        <span className="nav_title">Specifications</span>
                        </span>
                    <span className={this.state.view === 'warranty'
                        ? 'nav_selected'
                        : 'nav_unselected'}
                        onClick={() => this.changeView('warranty')}>
                        <span className="nav_title">Warranty & Returns</span>
                        </span>
                    <span className={this.state.view === 'reviews'
                        ? 'nav_selected'
                        : 'nav_unselected'}
                        onClick={() => this.changeView('reviews')}>
                        <span className="nav_title">Reviews</span>
                        </span>
                    <span className={this.state.view === 'questions'
                        ? 'nav_selected'
                        : 'nav_unselected'}
                        onClick={() => this.changeView('questions')}>
                        <span className="nav_title">Q&A</span>
                        </span>
                </div>
                <div className="main">
                    {this.renderView()}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));