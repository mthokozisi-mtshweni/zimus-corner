import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { experiences } from "../../constants/siteData";
import Reveal from "../../components/Reveal";
import ExperienceSliderCard from "../../components/ExperienceSliderCard";
import "../../styles/experiences.css";

export default function ExperiencesPage() {
  return (
    <>
      {/* HERO */}
      <section className="experiences-hero">
        <div className="container">
          <Reveal direction="up">
            <h1>
              Unforgettable <em>Experiences.</em>
            </h1>
            <p>
              From vibrant poolside parties to peaceful family braais, discover the moments that make Zimu's Corner truly special.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CLEAN SPLIT LIST */}
      <section className="exp-clean-section">
        <div className="container">
          <div className="exp-clean-list">
            {experiences.map((exp, index) => (
              <div key={exp.title} className="exp-clean-item">
                
                {/* Slider Side */}
                <div className="exp-clean-slider-wrapper">
                  <Reveal direction={index % 2 === 0 ? "left" : "right"}>
                    <ExperienceSliderCard imageKeys={exp.imageKeys} />
                  </Reveal>
                </div>

                {/* Text Side */}
                <div className="exp-clean-text">
                  <Reveal direction={index % 2 === 0 ? "right" : "left"} delay={100}>
                    <span className="exp-clean-tag">{exp.tag}</span>
                    <h2>{exp.title}</h2>
                    <p>{exp.description}</p>
                    <Link to="/contact" className="exp-clean-btn">
                      Enquire Now <ArrowRight size={18} />
                    </Link>
                  </Reveal>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}