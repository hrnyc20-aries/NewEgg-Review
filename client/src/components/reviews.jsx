import React from 'react';

class Reviews extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul className="reviews">
            {this.props.reviews.map((review) => {
                return (
                    <li className="review_item" key={review.id}>
                        <div className="review">
                            <section className="review_details">
                                <h2>{review.author}</h2>
                                <span className="rating">Rating: {review.eggs}</span>
                                <br/>
                                <span className="review_title">{review.title}</span>
                                <div className="review_content">
                                    <span className="pros">Pros: {review.pros}</span>
                                    <br/>
                                    <span className="cons">Cons: {review.cons}</span>
                                    <br/>
                                    <span className="review_body">Other thoughts: {review.body}</span>
                                </div>
                                <div className="likes">
                                    <span className="rate">{review.helpful} people out of {review.helpful + review.not_helpful} found this review helpful. Did you?
                                    <button className="yes">Yes</button><button className="no">No</button>
                                    </span>
                                </div>
                            </section>
                        </div>
                    </li>
                )
            })}
            </ul>
        )
    }
}

export default Reviews