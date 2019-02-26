import React from 'react';

class Overview extends React.Component {
    constructor(props) {
        super(props)
        this.getPercent = this.getPercent.bind(this)
        this.getNumberOfRatings = this.getNumberOfRatings.bind(this)
    }

    getPercent(num) {
        return (
            this.props.reviews.filter((review) => {
                        return review.eggs === num
                    }).length / this.props.reviews.length * 100
                    )
    }

    getNumberOfRatings(num) {
        return (
            this.props.reviews.filter((review) => {
                            return review.eggs === num
                        }).length
        )
    }

    render() {
        return (
            <div className="reviewOverview">
            <h2 className="sectionTitle"> Customer Reviews of This Item</h2>
                <div className="ratingBlock">
                    <div className="writeReview">
                        <div className="comment">
                            <div className="commentTitle">Do you own this product?</div>
                            {/* Dead button: on New Egg this takes user to a new page */}
                            <button className="writeReviewButton">Write a Review</button>
                        </div>
                    </div>
                    <div className="filter">
                        <div className="filterTitle">Filter Results</div>
                        <ul className="filterOptions">
                            <li>
                                <label className="filterCheckbox">
                                    <input type="checkbox" />
                                    {/* Does not filter: no related product information in database */}
                                    <span className="checkboxTitle">Related Products</span>
                                </label>
                            </li>
                            <li>
                                <label className="filterCheckbox">
                                    <input type="checkbox" onChange={(e) => this.props.handleFilter("verified")} />
                                    <span className="checkboxTitle">Verified Owners</span>
                                </label>
                            </li>
                            <li>
                                <label className="filterCheckbox">
                                    <input type="checkbox" />
                                    {/* Does not filter: no manufacturer responses */}
                                    <span className="checkboxTitle">Mfr. Responses</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="ratingInner">
                        <div className="ratingInnerBody">
                        {[5, 4, 3, 2, 1].map((eggCount) => {
                            return (
                        <div className="ratingView" key={'key' + eggCount}>
                            <div className="ratingViewLine">
                                <div className="ratingName">{eggCount} egg</div>
                                <div className="ratingChart">
                                    <div className="ratingChart_current" style={{width: `${this.getPercent(eggCount)}%`}}></div>
                                    <div className="ratingNumber">{this.getNumberOfRatings(eggCount)}
                                    </div>
                                </div>
                                <div className="ratingPercent"> {Math.round(this.getPercent(eggCount)) || 0}%
                                </div>
                            </div>
                        </div>
                            )
                        })}
                        </div>

                    </div>
                </div>
                <div className="toolBar">
                    <div className="sortTool">
                        <label className="form-select">
                            <select id="order" onChange={(e) => this.props.sortBy(e.target.value)}>
                                <option value="date">Date Posted</option>
                                <option value="helpful">Most Helpful</option>
                                <option value="highest">Highest Rated</option>
                                <option value="lowest">Lowest Rated</option>
                            </select>
                        </label>
                        <div className="reviewCount">Reviews <strong>{this.props.reviews.length > 0
                        ? 1
                        : 0}-{this.props.reviews.length}</strong> of <strong>{this.props.reviews.length}</strong></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Overview