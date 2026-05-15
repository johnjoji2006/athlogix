import React from 'react';
import './ServicesHome.css';

export default function ServicesHome() {
  return (
    <div className="services-home-wrapper">
      {/* White background header area */}
      <div className="services-home__header">
        <h2 className="services-home__title">OUR SERVICES</h2>
        <p className="services-home__subtitle">
          We provide businesses with an expert team that guides them through establishing a strong digital strategy. Our areas of expertise include <strong>Technology solutions</strong>, branding, experience design, and comprehensive digital marketing.
        </p>
      </div>

      {/* Dark Card */}
      <div className="services-home__card">
        <div className="services-home__grid">
          
          {/* Left Column (Right-aligned) */}
          <div className="services-home__col services-home__col--left">
            <div className="services-home__item">
              <h3>BRANDING</h3>
              <p>Our Branding Services Are Designed To Create A Strong, Memorable Identity For Your Business</p>
            </div>
            <div className="services-home__item">
              <h3>DIGITAL MARKETING</h3>
              <p>We Specialize In SEO, Social Media Marketing, Content Creation, And More, Ensuring Your Business Reaches Its Target Audience Effectively And Drives Meaningful Engagement</p>
            </div>
            <div className="services-home__item">
              <h3>WEBSITE DEVELOPMENT</h3>
              <p>We Specialize In Creating Custom Websites That Are Visually Engaging And Functionally Robust</p>
            </div>
          </div>

          {/* Middle Column (Massive Logo) */}
          <div className="services-home__center">
            <div className="services-home__logo-mark">
              A<br />L
            </div>
          </div>

          {/* Right Column (Left-aligned) */}
          <div className="services-home__col services-home__col--right">
            <div className="services-home__item">
              <h3>PRODUCTION</h3>
              <p>A Team Of Dedicated People Focusing On Delivering Top-Quality Service, Ensuring Every Project Is Executed With Precision And Efficiency</p>
            </div>
            <div className="services-home__item">
              <h3>PRINT DESIGN</h3>
              <p>We Help Design All Your Marketing Materials, Ensuring A Consistent Look And Feel Across All Platforms</p>
            </div>
            <div className="services-home__item">
              <h3>PACKAGE DESIGN</h3>
              <p>We Blend Creativity With Strategic Thinking To Ensure Your Packaging Not Only Stands Out On The Shelf But Also Resonates With Your Target Audience, Driving Sales And Brand Loyalty</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
