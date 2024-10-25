import React, { useEffect, useRef } from 'react';
import '../Styles/AboutSection.css'; // Ensure you have this CSS file in the same directory
import aboutus from '../assets/aboutus.png';
import businessIntelligenceIcon from '../assets/business-intelligence.gif'; // New image for Business Intelligence
import documentSearchIcon from '../assets/document-search.gif'; // New image for Document Search
import workflowIcon from '../assets/workflow.gif'; // New image for Data Workflow

const AboutSection = () => {
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
    <section className="section_all" id="about-section">
      <div className="About-container">
        <div className="section_title_all">
          <h3 className="section_title">
            About <span className="text_custom">DataDiscover.ai</span>
          </h3>
          <p className="section_subtitle">
            Unlock Insights Hidden in Your Data – Powered by Advanced AI
          </p>
          <div className="icon_container">
            <i className="icon"></i>
          </div>
        </div>

        <div className="vertical_content_manage" ref={sectionRef}>
          <div className="img_about">
            <img src={aboutus} alt="About Us" className="img-fluid" />
          </div>
          <div className="about_header_main">
            <h4 className="about_heading"></h4>
            <p className="about_text">
              <strong>DataDiscover.ai</strong> is an advanced business intelligence platform designed to mine and analyze business data for actionable insights. Using cutting-edge AI technologies, it processes and queries large volumes of unstructured and structured data quickly and accurately, turning raw data into business opportunities.
            </p>
            <p className="about_text">
              Our AI-powered system <b>simplifies complex workflows, enabling seamless data integration, multi-document querying, and real-time analysis</b>, empowering businesses to make data-driven decisions more effectively and efficiently.
            </p>
            <div className="custom-list">
              <ul>
                <li>Seamless Integration with Existing Business Systems</li>
                <li>Natural Language Queries for Intuitive Search</li>
                <li>Supports a Variety of Data Formats and Documents</li>
              </ul>
            </div>
            <div className="btn-mor">
              {/* <button
                className="btnn-her chtbot"
                onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </button> */}
            </div>
          </div>
        </div>

        <div className="content_boxes">
          <div className="about_content_box">
            <div className="about_detail">
              <div className="about_icon">
                <img src={businessIntelligenceIcon} alt="Business Intelligence" className="img-icon"style={{  marginLeft:"-25px",width: '75px', height: '85px' }}  />
              </div>
              <h5 className="about_title">Empowering Business Intelligence</h5>
              <p className="edu_desc">
                Our platform leverages AI to simplify data processing and deliver actionable insights, helping businesses remain competitive in a data-driven world.
              </p>
            </div>
          </div>

          <div className="about_content_box">
            <div className="about_detail">
              <div className="about_icon">
                <img src={documentSearchIcon} alt="Document Search" className="img-icon" style={{ marginLeft:"-25px", width: '75px', height: '85px' }} />
              </div>
              <h5 className="about_title">AI-Powered Document Search</h5>
              <p className="edu_desc">
                Utilize advanced AI algorithms to rapidly search and analyze thousands of documents, providing precise information retrieval in moments.
              </p>
            </div>
          </div>

          <div className="about_content_box">
            <div className="about_detail">
              <div className="about_icon">
                <img src={workflowIcon} alt="Data Workflow" className="img-icon" style={{ marginLeft:"-25px", width: '75px', height: '85px' }} />
              </div>
              <h5 className="about_title">Streamlined Data Workflow</h5>
              <p className="edu_desc">
                Automate routine tasks and improve overall productivity by enabling teams to focus on strategic goals rather than tedious data processing tasks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
