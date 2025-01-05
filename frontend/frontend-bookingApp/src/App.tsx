import React from 'react';
import Layout from './Layout/Layout';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Register from './pages/Register';

// Declare the component and export it
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout>
            <p>
              Home Page
            </p>
          </Layout>}/>
          <Route path="/signIn" element={<div>signIn</div>}/>
          <Route path="/register" element={<Layout><Register/></Layout>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
