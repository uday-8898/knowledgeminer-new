import React from 'react';
import '../Styles/Timeline.css'; // Assuming the CSS will be added here

const Timeline = () => {
  return (
    <div className="timeline-main" id='timeline-main'>
      <h1 className="timeline-section-heading">Data Discover Process</h1> {/* Added heading */}
      <h5 className="timeline-section-subheading">Identifying, Evaluating, and Documenting Key Data Sources
      </h5>
      <div className="timeline-wrap">

        <div className="timeline-card">
          <div className="timeline-card-wrap">
            <div className="card-head-wrap">
              <h2 className="timeline-card-head">Step 1: Identify Data Sources</h2>
            </div>
            <p className="timeline-card-text">
              Begin by identifying all potential data sources relevant to your analysis, including databases, APIs, and external datasets.
            </p>
          </div>
        </div>

        <div className="timeline-card">
          <div className="timeline-card-wrap">
            <div className="card-head-wrap">
              <h2 className="timeline-card-head">Step 2: Assess Data Quality</h2>
            </div>
            <p className="timeline-card-text">
              Evaluate the quality of the data by checking for completeness, consistency, and accuracy to ensure reliable analysis outcomes.
            </p>
          </div>
        </div>

        <div className="timeline-card">
          <div className="timeline-card-wrap">
            <div className="card-head-wrap">
              <h2 className="timeline-card-head">Step 3: Understand Business Requirements</h2>
            </div>
            <p className="timeline-card-text">
              Collaborate with stakeholders to understand their needs and determine which data is most relevant for decision-making.
            </p>
          </div>
        </div>

        <div className="timeline-card">
          <div className="timeline-card-wrap">
            <div className="card-head-wrap">
              <h2 className="timeline-card-head">Step 4: Document Findings</h2>
            </div>
            <p className="timeline-card-text">
              Create documentation that captures the findings from the data discover process, including metadata and data lineage for future reference.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Timeline;
