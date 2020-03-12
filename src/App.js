import React from 'react';
import './App.css';
import StudentApp from './Components';

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-10 offset-sm-1">
          <h2 className="mt-3 mb-3">Students <span style={{color: 'red'}}>Information</span> Application</h2>
          <StudentApp/>
        </div>
      </div>
    </div>
  );
}

export default App;
