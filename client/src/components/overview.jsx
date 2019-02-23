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
                            return review.eggs === 5
                        }).length
        )
    }

    render() {
        return (
            <div className="reviewOverview">
            <h2 className="sectionTitle"> Customer Reviews of This Item</h2>
                <div className="ratingBlock">
                    <div className="ratingInner">
                        <div className="ratingInnerBody">
                        <div className="ratingView">
                            <div className="ratingName">5 egg</div>
                            <div className="ratingChart">
                                <div className="ratingChart_current" style={{width: `${this.getPercent(5)}%`}}></div>
                                <div className="ratingNumber">{this.getNumberOfRatings(5)}
                                </div>
                            </div>
                            <div className="ratingPercent"> {Math.round(this.getPercent(5))}%
                            </div>
                        </div>
                        <div className="ratingView">
                            <div className="ratingName">4 egg</div>
                            <div className="ratingChart">
                                <div className="ratingChart_current" style={{width: `${this.getPercent(4)}%`}}></div>
                                <div className="ratingNumber">{this.props.reviews.filter((review) => {
                                    return review.eggs === 4
                                }).length}
                                </div>
                            </div>
                            <div className="ratingPercent"> {Math.round(this.getPercent(4))}%
                            </div>
                        </div>
                        <div className="ratingView">
                            <div className="ratingName">3 egg</div>
                            <div className="ratingChart">
                                <div className="ratingChart_current" style={{width: `${this.getPercent(3)}%`}}></div>
                                <div className="ratingNumber">{this.props.reviews.filter((review) => {
                                    return review.eggs === 3
                                }).length}
                                </div>
                            </div>
                            <div className="ratingPercent"> {Math.round(this.getPercent(3))}%
                            </div>
                        </div>
                        <div className="ratingView">
                            <div className="ratingName">2 egg</div>
                            <div className="ratingChart">
                                <div className="ratingChart_current" style={{width: `${this.getPercent(2)}%`}}></div>
                                <div className="ratingNumber">{this.props.reviews.filter((review) => {
                                    return review.eggs === 2
                                }).length}
                                </div>
                            </div>
                            <div className="ratingPercent"> {Math.round(this.getPercent(2))}%
                            </div>
                        </div>
                        <div className="ratingView">
                            <div className="ratingName">1 egg</div>
                            <div className="ratingChart">
                                <div className="ratingChart_current" style={{width: `${this.getPercent(1)}%`}}>
                                </div>
                                <div className="ratingNumber">{this.props.reviews.filter((review) => {
                                    return review.eggs === 1
                                }).length}
                                </div>
                            </div>
                            <div className="ratingPercent"> {Math.round(this.getPercent(1))}%
                            </div>

                        </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Overview