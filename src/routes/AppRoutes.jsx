import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

import AdminDashboard from "../pages/admin/Dashboard";
import Home from "../pages/students/Home";
import AdminLogin from "../pages/auth/AdminLogin";
import StudentLogin from "../pages/auth/StudentLogin";

import bg from "../assets/Second.gif";

export default function AppRoutes() {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(true);
  const [showHero, setShowHero] = useState(true);

  if (showHero && !user) {
    return <JunoonHero onEnter={() => setShowHero(false)} />;
  }

  if (!user) {
    return (
      <div style={styles.page}>
        <div style={styles.overlay}></div>
        <div style={styles.container}>
          <button onClick={() => setShowHero(true)} style={styles.backBtn}>← Back</button>
          <h2 style={styles.heading}>Attendance System</h2>
          <div style={styles.switch}>
            <button
              onClick={() => setIsAdmin(true)}
              style={{ ...styles.switchBtn, backgroundColor: isAdmin ? "#00b894" : "transparent" }}
            >Admin</button>
            <button
              onClick={() => setIsAdmin(false)}
              style={{ ...styles.switchBtn, backgroundColor: !isAdmin ? "#00b894" : "transparent" }}
            >Student</button>
          </div>
          <div style={{ marginTop: "20px" }}>{isAdmin ? <AdminLogin /> : <StudentLogin />}</div>
        </div>
        {/* Footer for Login Screen */}
        <footer style={styles.authFooter}>Crafted with Passion & ❤️ by Rawat | 2026 🛡️</footer>
      </div>
    );
  }

  if (user.role === "ADMIN") return <AdminDashboard />;
  return <Home />;
}

function JunoonHero({ onEnter }) {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes mainPulse {
        0%, 100% { transform: scale(1); box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
        50% { transform: scale(1.02); box-shadow: 0 20px 60px rgba(0,0,0,0.7); }
      }
      @keyframes textShimmer {
        0% { background-position: -100% 0; }
        100% { background-position: 100% 0; }
      }
      @keyframes glowFlicker {
        0%, 100% { opacity: 1; text-shadow: 0 0 10px #fff, 0 0 20px #fff; }
        50% { opacity: 0.8; text-shadow: 0 0 5px #fff; }
      }
      @keyframes loginPulse {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
        70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
      }
      @keyframes borderGlow {
        0%, 100% { border-color: #ff0000; box-shadow: 0 0 15px #ff0000; }
        16% { border-color: #ff7f00; box-shadow: 0 0 15px #ff7f00; }
        33% { border-color: #ffff00; box-shadow: 0 0 15px #ffff00; }
        50% { border-color: #00ff00; box-shadow: 0 0 15px #00ff00; }
        66% { border-color: #0000ff; box-shadow: 0 0 15px #0000ff; }
        83% { border-color: #4b0082; box-shadow: 0 0 15px #4b0082; }
      }

      @media (max-width: 768px) {
        .responsive-library-name { font-size: 3.5rem !important; }
        .responsive-ribbon { font-size: 1.5rem !important; padding: 8px 30px !important; }
        .responsive-tagline { font-size: 1.2rem !important; }
        .responsive-grid { flex-direction: column !important; align-items: center !important; }
        .responsive-card { width: 90% !important; max-width: 300px !important; }
        .responsive-amenity { flex-direction: column !important; gap: 10px !important; padding: 20px !important; border-radius: 20px !important; }
        .responsive-phone { font-size: 1.2rem !important; padding: 12px 20px !important; }
        .responsive-btn { padding: 15px 40px !important; font-size: 1.3rem !important; width: 90% !important; }
        .hero-container-mobile { padding: 30px 15px !important; width: 95% !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const heroStyles = {
    mainWrapper: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: 'radial-gradient(circle at center, #ffeb3b 0%, #fbc02d 20%, #f57c00 50%, #d32f2f 80%, #6a1b9a 100%)',
      overflowX: 'hidden',
      fontFamily: "'Poppins', sans-serif",
      padding: '20px 10px',
    },
    heroContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '95%',
      maxWidth: '900px',
      padding: '50px',
      background: 'linear-gradient(160deg, #fbf3f3 0%, #fd0808 40%, #fbc12e 100%)',
      backdropFilter: 'blur(15px)',
      borderRadius: '30px',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 10px 40px rgba(235, 207, 207, 0.5)',
      animation: 'mainPulse 8s ease-in-out infinite',
      position: 'relative',
    },
    logoContainer: {
      textAlign: 'center',
      width: '100%',
      marginBottom: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    libraryName: {
      fontSize: '6rem',
      fontWeight: '900',
      textTransform: 'uppercase',
      margin: 0,
      letterSpacing: '5px',
      lineHeight: '1.1',
      background: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000)',
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'textShimmer 4s linear infinite',
      textShadow: '0 15px 25px rgba(0,0,0,0.5)',
    },
    blueRibbon: {
      background: 'linear-gradient(to bottom, #2196f3, #0d47a1)',
      color: 'white',
      padding: '8px 70px',
      fontSize: '2.5rem',
      fontWeight: '800',
      borderRadius: '8px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
      display: 'inline-block',
      marginTop: '-15px',
      textTransform: 'uppercase'
    },
    tagline: {
      color: 'white',
      fontSize: '2rem',
      fontWeight: '700',
      fontStyle: 'italic',
      marginTop: '25px',
      textShadow: '2px 2px 5px rgba(0,0,0,0.6)',
      opacity: 0.9,
      textAlign: 'center'
    },
    shiftsHeader: {
      background: '#ff9800',
      color: '#1a237e',
      padding: '8px 50px',
      borderRadius: '50px',
      fontSize: '1.6rem',
      fontWeight: '900',
      margin: '40px 0',
      border: '4px solid #fff',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
      textTransform: 'uppercase',
      animation: 'glowFlicker 3s linear infinite',
      textAlign: 'center'
    },
    shiftsGrid: {
      display: 'flex',
      gap: '25px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      width: '100%',
      marginBottom: '40px'
    },
    shiftCard: {
      width: '260px',
      padding: '25px',
      borderRadius: '25px',
      textAlign: 'center',
      border: '5px solid #fff',
      boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'transform 0.3s ease',
    },
    morningCard: { background: 'linear-gradient(135deg, #ff9800, #f44336)' },
    dayCard: { background: 'linear-gradient(135deg, #fff176, #fbc02d)' },
    eveningCard: { background: 'linear-gradient(135deg, #7e57c2, #311b92)' },
    
    timeText: { fontSize: '1.9rem', fontWeight: '900', color: '#fff', margin: '15px 0 5px 0' },
    shiftName: { fontSize: '1.2rem', fontWeight: '700', color: '#fff', textTransform: 'uppercase', opacity: 0.95 },

    amenityBar: {
      display: 'flex',
      gap: '35px',
      marginTop: '20px',
      background: 'rgba(255,255,255,0.15)',
      padding: '18px 50px',
      borderRadius: '50px',
      backdropFilter: 'blur(10px)',
      color: 'white',
      fontWeight: '700',
      fontSize: '1.1rem',
      border: '1px solid rgba(255,255,255,0.2)',
      textAlign: 'center'
    },
    contactPanel: {
      marginTop: '50px',
      textAlign: 'center',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    contactHeader: { color: '#fff', fontSize: '2.2rem', fontStyle: 'italic', fontWeight: '800', marginBottom: '15px' },
    phonePill: {
      background: 'rgba(0,0,0,0.5)',
      padding: '18px 35px',
      borderRadius: '50px',
      fontSize: '1.9rem',
      color: '#fff',
      fontWeight: '800',
      border: '3px solid #4caf50',
      display: 'inline-block',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    },
    locationPill: {
      background: 'linear-gradient(to right, #d32f2f, #c2185b)',
      padding: '12px 60px',
      borderRadius: '50px',
      fontSize: '1.6rem',
      color: '#fff',
      fontWeight: '800',
      marginTop: '25px',
      display: 'inline-block',
      border: '4px solid #fff',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    },
    loginBtn: {
      marginTop: '60px',
      background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
      backgroundSize: '300% 300%',
      color: '#fff',
      padding: '20px 80px',
      borderRadius: '60px',
      fontSize: '1.7rem',
      fontWeight: '900',
      cursor: 'pointer',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      border: '5px solid transparent',
      animation: 'loginPulse 2s infinite, borderGlow 4s linear infinite, textShimmer 3s linear infinite',
      boxShadow: '0 10px 0 #ddd, 0 15px 30px rgba(255, 255, 255, 0.4)',
      transition: 'all 0.2s ease-in-out',
      textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
    },
    heroFooter: {
      marginTop: '30px',
      color: '#fff',
      fontSize: '1rem',
      fontWeight: '600',
      letterSpacing: '1px',
      textShadow: '1px 1px 5px rgba(0,0,0,0.5)',
      opacity: 0.9
    }
  };

  return (
    <div style={heroStyles.mainWrapper}>
      <main style={heroStyles.heroContainer} className="hero-container-mobile">
        <section style={heroStyles.logoContainer}>
            <h1 style={heroStyles.libraryName} className="responsive-library-name">Junoon</h1>
            <div style={heroStyles.blueRibbon} className="responsive-ribbon">Library</div>
            <div style={heroStyles.tagline} className="responsive-tagline">Study Without Limits!</div>
        </section>

        <div style={heroStyles.shiftsHeader}>◆ SHIFT TIMINGS ◆</div>
        <div style={heroStyles.shiftsGrid} className="responsive-grid">
          <div style={{ ...heroStyles.shiftCard, ...heroStyles.morningCard }} className="responsive-card">
            <div style={{fontSize: '60px'}}>☀️</div>
            <p style={heroStyles.timeText}>6 AM - 11 AM</p>
            <p style={heroStyles.shiftName}>Morning Shift</p>
          </div>

          <div style={{ ...heroStyles.shiftCard, ...heroStyles.dayCard }} className="responsive-card">
            <div style={{fontSize: '60px'}}>🌤️</div>
            <p style={{...heroStyles.timeText, color: '#4e342e'}}>11 AM - 5 PM</p>
            <p style={{...heroStyles.shiftName, color: '#4e342e'}}>Day Shift</p>
          </div>

          <div style={{ ...heroStyles.shiftCard, ...heroStyles.eveningCard }} className="responsive-card">
            <div style={{fontSize: '60px'}}>🌙</div>
            <p style={heroStyles.timeText}>5 PM - 9 PM</p>
            <p style={heroStyles.shiftName}>Evening Shift</p>
          </div>
        </div>

        <div style={heroStyles.amenityBar} className="responsive-amenity">
            <span>🌺 शांत वातावरण</span>
            <span>💺 Comfortable Seating</span>
            <span>🎯 Focused Study Zone</span>
        </div>

        <div style={heroStyles.contactPanel}>
            <div style={heroStyles.contactHeader}>Contact Now!</div>
            <div style={heroStyles.phonePill} className="responsive-phone">📞 9709915219 / 9507443154</div>
            <br/>
            <div style={heroStyles.locationPill}>Parsa Garh Bazar</div>
        </div>

        <button 
          style={heroStyles.loginBtn} 
          className="responsive-btn"
          onClick={onEnter}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = '0 3px 0 #bbb, 0 5px 15px rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(5px)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 0 #ddd, 0 15px 30px rgba(255, 255, 255, 0.4)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Click to Login →
        </button>
      </main>
      <footer style={heroStyles.heroFooter}>Crafted with Passion & ❤️ by Rawat | 2026 🛡️</footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)"
  },
  container: {
    position: "relative",
    zIndex: 2,
    width: "90%",
    maxWidth: "400px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    color: "#fff",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#00b894",
    cursor: "pointer",
    marginBottom: "10px",
    fontSize: "14px"
  },
  heading: { textAlign: "center", marginBottom: "20px" },
  switch: { display: "flex", gap: "10px" },
  switchBtn: { flex: 1, padding: "10px", border: "none", color: "#fff", cursor: "pointer", borderRadius: "8px" },
  authFooter: {
    position: "relative",
    zIndex: 2,
    marginTop: "20px",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "0.9rem",
    fontWeight: "500",
    letterSpacing: "1px"
  }
};