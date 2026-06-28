import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SOSAlert from './SOSAlert';

const Layout = ({ allowedRoles }) => {
  const { activeUser } = useContext(AppContext);

  // If not logged in, redirect to landing
  if (!activeUser) {
    return <Navigate to="/" replace />;
  }

  // If role not allowed, redirect to landing
  if (allowedRoles && !allowedRoles.includes(activeUser.role)) {
    return <Navigate to="/" replace />;
  }

  const bgSparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 9) + 4}%`,
    top: `${(i % 2 === 0 ? 15 : 75) + (i % 3) * 4}%`,
    delay: `${-(i * 2.2)}s`,
    duration: `${14 + (i % 3) * 4}s`,
    size: `${(i % 3) * 2 + 3}px`
  }));

  const isAdmin = activeUser.role === 'Admin';

  return (
    <div className={`min-h-screen flex flex-col relative ${isAdmin ? 'bg-slate-100 text-slate-800' : 'bg-slate-50'}`}>
      
      {/* ================= GORGEOUS ZEN NATURE BACKGROUND IMAGE LAYER (FOR ADMIN PAGES) ================= */}
      {isAdmin && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Real Generated Beautiful Zen Nature Landscape Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-100 z-0" 
            style={{ backgroundImage: "url('/bg_nature.png')" }} 
          />
          
          {/* Soft slate-blue glaze overlay to ensure high contrast & role-specific blue theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F2F6FB]/85 via-[#F8FBFE]/70 to-[#F0F5FA]/75 z-0" />
          
          {/* Blue glowing blobs */}
          <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-blue-100/20 blur-[85px]" />
          <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-indigo-50/15 blur-[105px]" />

          {/* Floating golden wellness sparkles (Slow motion) */}
          {bgSparkles.map(sp => (
            <div 
              key={sp.id}
              className="bg-particle text-yellow-500/25 font-bold"
              style={{
                left: sp.left,
                top: sp.top,
                fontSize: sp.size,
                '--delay': sp.delay,
                '--duration': sp.duration,
                '--max-opacity': 0.4
              }}
            >
              ✦
            </div>
          ))}
        </div>
      )}
      {/* ==================================================================== */}

      <div className="relative z-10 flex flex-col min-h-screen flex-1">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar">
            <div className="admin-workspace-container max-w-7xl mx-auto fade-in-up">
              <Outlet />
            </div>
          </main>
        </div>
        <SOSAlert />
      </div>
    </div>
  );
};

export default Layout;
