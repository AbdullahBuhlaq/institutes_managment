function BranchStatisticsRight(props) {
  return <>
  <button
    className={"close-right"}
    onClick={() => {
      props.setRightShow(false);
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </button>
  <div className="profile-box">
    <div className="profile-photo-wrapper">
      <img src="https://images.unsplash.com/photo-1551292831-023188e78222?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTE0fHxwb3J0cmFpdHxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="profile" />
    </div>
    <p className="profile-text">Julia Pellegrini</p>
    <p className="profile-subtext">Recruiting Manager</p>
  </div>
  <div className="app-right-content">
    <div className="app-right-section">
      <div className="app-right-section-header">
        <h2>Messages</h2>
        <span className="notification-active">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-square">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </span>
      </div>
      <div className="message-line">
        <img src="https://images.unsplash.com/photo-1562159278-1253a58da141?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fHBvcnRyYWl0JTIwbWFufGVufDB8MHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="profile" />
        <div className="message-text-wrapper">
          <p className="message-text">Eric Clampton</p>
          <p className="message-subtext">Have you planned any deadline for this?</p>
        </div>
      </div>
      <div className="message-line">
        <img src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80" alt="profile" />
        <div className="message-text-wrapper">
          <p className="message-text">Jess Flax</p>
          <p className="message-subtext">Can we schedule another meeting for next thursday?</p>
        </div>
      </div>
      <div className="message-line">
        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80" alt="profile" />
        <div className="message-text-wrapper">
          <p className="message-text">Pam Halpert</p>
          <p className="message-subtext">The candidate has been shorlisted.</p>
        </div>
      </div>
    </div>
    <div className="app-right-section">
      <div className="app-right-section-header">
        <h2>Activity</h2>
        <span className="notification-active">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </span>
      </div>
      <div className="activity-line">
        <span className="activity-icon warning">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </span>
        <div className="activity-text-wrapper">
          <p className="activity-text">
            Your plan is expires in <strong>3 days.</strong>
          </p>
          <a className="activity-link" href="#">
            Renew Now
          </a>
        </div>
      </div>
      <div className="activity-line">
        <span className="activity-icon applicant">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-plus">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </span>
        <div className="activity-text-wrapper">
          <p className="activity-text">
            There are <strong>3 new applications</strong> for <strong>UI Developer</strong>
          </p>
        </div>
      </div>
      <div className="activity-line">
        <span className="activity-icon close">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </span>
        <div className="activity-text-wrapper">
          <p className="activity-text">
            Your teammate, <strong>Wade Wilson</strong> has closed the job post of <strong>IOS Developer</strong>
          </p>
        </div>
      </div>
      <div className="activity-line">
        <span className="activity-icon applicant">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-plus">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </span>
        <div className="activity-text-wrapper">
          <p className="activity-text">
            There are <strong>4 new applications</strong> for <strong>Front-End Developer</strong>
          </p>
        </div>
      </div>
      <div className="activity-line">
        <span className="activity-icon applicant">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-plus">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </span>
        <div className="activity-text-wrapper">
          <p className="activity-text">
            There are <strong>2 new applications</strong> for <strong>Design Lead</strong>
          </p>
        </div>
      </div>
      <div className="activity-line">
        <span className="activity-icon close">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </span>
        <div className="activity-text-wrapper">
          <p className="activity-text">
            Your teammate, <strong>Wade Wilson</strong> has closed the job post of <strong>Back-End Developer</strong>
          </p>
        </div>
      </div>
      <div className="activity-line">
        <span className="activity-icon draft">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-minus">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </span>
        <div className="activity-text-wrapper">
          <p className="activity-text">
            You have drafted a job post for <strong>HR Specialist</strong>
          </p>
          <a href="#" className="activity-link">
            Complete Now
          </a>
        </div>
      </div>
    </div>
  </div>
</>
}

export default BranchStatisticsRight;
