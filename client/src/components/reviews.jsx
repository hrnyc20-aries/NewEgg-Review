import React from 'react';
import $ from 'jquery';

class Reviews extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="reviews">
            {this.props.reviews.map((review) => {
                return (
                    <div className="reviewItem" key={review.id}>
                        <div className="review">
                            <section className="reviewDetails">
                            <div className="sidebar">
                                <div className="author">{review.author}</div>
                            </div>
                            <div className="reviewBody">
                                <span className="rating">Rating: {review.eggs}</span>
                                <br/>
                                <span className="reviewTitle">{review.title}</span>
                                <div className="reviewContent">
                                    <span className="pros">Pros: {review.pros}</span>
                                    <br/>
                                    <span className="cons">Cons: {review.cons}</span>
                                    <br/>
                                    <span className="reviewBody">Other thoughts: {review.body}</span>
                                </div>
                            </div>
                                <div className="poll">
                                    <span className="rate">{review.helpful} people out of {review.helpful + review.not_helpful} found this review helpful. Did you?
                                    <button className="yes" onClick={(e) => this.props.voteHelpful(e.target)} id={review.id}>Yes</button><button className="no" onClick={(e) => this.props.voteNotHelpful(e.target)} id={review.id}>No</button>
                                    </span>
                                </div>
                            </section>
                        </div>
                    </div>
                )
            })}
            </div>
        )
    }
}

export default Reviews