import React from 'react';

class Overview extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="reviewOverview">
            <h2 className="sectionTitle"> Customer Reviews of This Item</h2>
                <div className="ratingView">
                    <div className="ratingName">5 egg</div>
                    <div className="ratingChart">
                        <div className="ratingChart_current"></div>
                        <div className="ratingNumber">{this.props.reviews.filter((review) => {
                            return review.eggs === 5
                        }).length}
                        </div>
                    </div>
                    <div className="ratingPercent"> {this.props.reviews.filter((review) => {
                        return review.eggs === 5
                    }).length / this.props.reviews.length * 100}%
                    </div>
                </div>
                <div className="ratingView">
                    <div className="ratingName">4 egg</div>
                    <div className="ratingChart">
                        <div className="ratingChart_current"></div>
                        <div className="ratingNumber">{this.props.reviews.filter((review) => {
                            return review.eggs === 4
                        }).length}
                        </div>
                    </div>
                    <div className="ratingPercent"> {this.props.reviews.filter((review) => {
                        return review.eggs === 4
                    }).length / this.props.reviews.length * 100}%
                    </div>
                </div>
                <div className="ratingView">
                    <div className="ratingName">3 egg</div>
                    <div className="ratingChart">
                        <div className="ratingChart_current"></div>
                        <div className="ratingNumber">{this.props.reviews.filter((review) => {
                            return review.eggs === 3
                        }).length}
                        </div>
                    </div>
                    <div className="ratingPercent"> {this.props.reviews.filter((review) => {
                        return review.eggs === 3
                    }).length / this.props.reviews.length * 100}%
                    </div>
                </div>
                <div className="ratingView">
                    <div className="ratingName">2 egg</div>
                    <div className="ratingChart">
                        <div className="ratingChart_current"></div>
                        <div className="ratingNumber">{this.props.reviews.filter((review) => {
                            return review.eggs === 2
                        }).length}
                        </div>
                    </div>
                    <div className="ratingPercent"> {this.props.reviews.filter((review) => {
                        return review.eggs === 2
                    }).length / this.props.reviews.length * 100}%
                    </div>
                </div>
                <div className="ratingView">
                    <div className="ratingName">1 egg</div>
                    <div className="ratingChart">
                        <div className="ratingChart_current"></div>
                        <div className="ratingNumber">{this.props.reviews.filter((review) => {
                            return review.eggs === 1
                        }).length}
                        </div>
                    </div>
                    <div className="ratingPercent"> {this.props.reviews.filter((review) => {
                        return review.eggs === 1
                    }).length / this.props.reviews.length * 100}%
                    </div>
                </div>
            </div>
        )
    }
}

export default Overview