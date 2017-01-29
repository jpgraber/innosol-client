import React, { Component } from 'react';
import TwitterIcon from '../../icons/twitter.icon';
import FacebookIcon from '../../icons/facebook.icon';
import LinkedinIcon from '../../icons/linkedin.icon';
import GooglePlusIcon from '../../icons/google-plus.icon';
import './subject-carousel-card.component.css';

class SubjectCarouselCard extends Component {
  render() {
    return (
      <div className="subjectCarouselCard">
        <div className="subjectCarouselCard-score">
          <div className="subjectCarouselCard-score_inner">100</div>
        </div>
        <div className="subjectCarouselCard-profile"></div>
        <TwitterIcon cssClass="svgIcon_medium" />
        <FacebookIcon cssClass="svgIcon_medium" />
        <LinkedinIcon cssClass="svgIcon_medium" />
        <GooglePlusIcon cssClass="svgIcon_medium" />
      </div>
    )
  }
}

export default SubjectCarouselCard;
