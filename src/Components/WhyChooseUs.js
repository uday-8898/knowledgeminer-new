import React, { useEffect, useRef } from 'react';
import '../Styles/WhyChooseUs.css'; // Ensure you have this CSS file in the same directory
import whychoosessimg from '../assets/whychooseusimg.png';

const WhyChooseUsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    });

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section className="why_choose" id='why-choose-us'>
      <div className="why-container">
        <div className="section_title_all">
          <h3 className="section_title">
            Why <span className="text_custom">Choose Us?</span>
          </h3>
          <p className="section_subtitle">
            Unlock AI's Full Potential for Your Business
          </p>
          <div className="icon_container">
            <i className="icon"></i>
          </div>
        </div>

        <div className="vertical_content_manage" ref={sectionRef}>
          <div className="why_header_main">
            <h4 className="about_heading">Key Benefits of Our Platform</h4>
            
            <p className="about_text">
              <b>High Accuracy</b>: Provides up to 95% accurate insights, ensuring reliable data-driven decisions.
            </p>

            <p className="about_text">
              <b>Fast & Scalable</b>: Manages simultaneous queries and data processes efficiently without compromising performance.
            </p>

            <p className="about_text">
              <b>Custom Integration</b>: Tailors to your business needs and integrates smoothly with your existing tools and systems.
            </p>

            {/* Additional Content */}
            <p className="about_text">
              <b>AI-Powered Automation</b>: Streamline repetitive tasks and free up valuable time by leveraging AI to automate data processing, allowing your team to focus on strategic activities.
            </p>

            <p className="about_text">
              <b>Secure & Compliant</b>: Your data is handled with the highest security standards, ensuring compliance with industry regulations while maintaining confidentiality.
            </p>
          </div>

          <div className="img_why">
            <img src={whychoosessimg} alt="Why Choose Us" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
