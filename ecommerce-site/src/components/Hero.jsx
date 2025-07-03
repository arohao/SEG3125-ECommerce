import React from "react";
import '../styles/component_styles/Hero.css'

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <h1 className="display-4 fw-bold">The Best Computer Parts Site</h1>
        <p className="lead mt-3 mb-4">
          This is a cool website
        </p>
        <a href="#get-started" className="btn hero-btn btn-lg">
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default Hero;
