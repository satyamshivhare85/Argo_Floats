import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function Layout() {
  return (
    // This wrapper div creates the main layout structure
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      {/* The 'flex-grow' class makes the main content area expand
          to fill any available vertical space, pushing the footer down. */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

export default Layout;