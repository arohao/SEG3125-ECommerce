import React from "react";
import '../styles/component_styles/Hero.css'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <h1 className="display-4 fw-bold">The Best Computer Parts Site</h1>
        <p className="lead mt-3 mb-4">
          Find top-quality computer parts, from the latest GPUs and CPUs to reliable motherboards and accessories — all at competitive prices. Whether you're upgrading, building from scratch, or customizing your rig, we’ve got you covered with fast shipping and expert support.
        </p>
        <Link to="/catalog" className="btn hero-btn btn-lg">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
