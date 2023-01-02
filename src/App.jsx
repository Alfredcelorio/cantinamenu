// Init
import React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-phone-number-input/style.css';

// Files
import Index from './routes/index';
import './css/index.css';

// Component
function App() {
  return (
    <div className="app">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        {/* toastify Container for Notification */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          transition={Flip}
        />

        {/* Routes */}
        <Index />
      </SkeletonTheme>
    </div>
  );
}

// Export
export default App;
