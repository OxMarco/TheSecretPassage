import React, { Component } from 'react';

export default class Artists extends Component {

    render() {
        return (
            <>
                <section className="section pt-0">
                    <div className="container">

                        <div className="testimonials-slider swiper-container" data-aos="fade-up" data-aos-delay="100">
                            <div className="swiper-wrapper">

                                <div className="swiper-slide">
                                    <div className="testimonial-wrap">
                                        <div className="testimonial">
                                            <img src="https://bootstrapmade.com/demo/templates/MyPortfolio/assets/img/person_1.jpg" alt="Image" className="img-fluid" />
                                            <blockquote>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam necessitatibus incidunt ut officiis
                                                explicabo inventore.</p>
                                            </blockquote>
                                            <p>&mdash; Jean Hicks</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="swiper-pagination"></div>
                        </div>

                    </div>
                </section>
            </>
        );
    }
}
