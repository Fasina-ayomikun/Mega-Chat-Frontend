import React from "react";
import "./error.css";
function ErrorPage() {
  return (
    <section className='error-section section'>
      <div>
        <h1 className='error-h1'>404</h1>
        <button type='button' className='btn'>
          Back Home
        </button>
      </div>
    </section>
  );
}

export default ErrorPage;
