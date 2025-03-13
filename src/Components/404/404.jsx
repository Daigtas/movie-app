import React from "react";
const NotFound = () => {
    return (
      <div className="content not-found-page">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <a href="/" className="hero-button primary">Go Back Home</a>
      </div>
    );
  };
  
export default NotFound;