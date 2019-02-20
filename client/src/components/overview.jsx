import React from 'react';

class Overview extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="review_overview">
            <h1> Customer Reviews of This Item</h1>
            <ul>
                <li>5 Eggs: {this.props.reviews.filter((review) => {
                    return review.eggs === 5
                }).length / this.props.reviews.length * 100}%</li>
                <li>4 Eggs: {this.props.reviews.filter((review) => {
                    return review.eggs === 4
                }).length}/{this.props.reviews.length}</li>
                <li>3 Eggs: {this.props.reviews.filter((review) => {
                    return review.eggs === 3
                }).length}/{this.props.reviews.length}</li>
                <li>2 Eggs: {this.props.reviews.filter((review) => {
                    return review.eggs === 2
                }).length}/{this.props.reviews.length}</li>
                <li>1 Eggs: {this.props.reviews.filter((review) => {
                    return review.eggs === 1
                }).length}/{this.props.reviews.length}</li>
                <li>0 Eggs: {this.props.reviews.filter((review) => {
                    return review.eggs === 0
                }).length}/{this.props.reviews.length}</li>
            </ul>
            </div>
        )
    }
}

export default Overview