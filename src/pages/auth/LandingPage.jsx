import React from 'react';

export default function JunoonHero() {
  // All styles combined into a single object for easy drop-in usage
  const styles = {
    mainWrapper: {
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      position: 'relative',
      background: `
        radial-gradient(circle at 10% 10%, rgba(100, 255, 218, 0.1) 0%, transparent 40%),
        radial-gradient(circle at 90% 10%, rgba(106, 17, 203, 0.15) 0%, transparent 40%),
        linear-gradient(135deg, #1d3557 0%, #03071e 100%)
      `,
      overflow: 'hidden',
      fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
    },
    heroContainer: {
      display: 'grid',
      gridTemplateAreas: `
        "logo lamp"
        "shifts shifts"
        "amen amenities"
        "contact contact"
      `,
      gridTemplateColumns: '2fr 1.2fr',
      gap: '30px 20px',
      position: 'relative',
      zIndex: 5,
      width: '95%',
      maxWidth: '1000px',
      margin: '20px auto',
      padding: '30px',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '25px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    logoSection: {
      gridArea: 'logo',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    libraryBrand: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '15px',
      width: '100%',
    },
    booksVisual: {
      width: '100px',
      height: 'auto',
      flexShrink: 0,
    },
    libraryIdentity: {
      marginTop: '-5px',
    },
    libraryName: {
      fontSize: '4.5rem',
      fontWeight: '800',
      textTransform: 'uppercase',
      color: '#fff',
      letterSpacing: '-2px',
      lineHeight: '1',
      margin: 0,
    },
    blueRibbon: {
      position: 'relative',
      display: 'inline-block',
      padding: '8px 30px',
      background: 'linear-gradient(180deg, #1a73e8 0%, #0d47a1 100%)',
      color: '#fff',
      textTransform: 'uppercase',
      fontSize: '1.8rem',
      fontWeight: '700',
      borderRadius: '6px',
      marginTop: '10px',
      boxShadow: '0 4px 15px rgba(13, 71, 161, 0.4)',
    },
    taglineContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: '25px',
      width: '100%',
    },
    taglineRule: {
      height: '2px',
      backgroundColor: '#fff',
      flexGrow: 1,
      opacity: 0.5,
    },
    taglineText: {
      fontSize: '1.4rem',
      color: '#fff',
      fontWeight: '600',
      textTransform: 'uppercase',
      fontStyle: 'italic',
      letterSpacing: '1px',
      whiteSpace: 'nowrap',
      margin: '0 15px',
    },
    lampSection: {
      gridArea: 'lamp',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    lampVisualContainer: {
      position: 'relative',
      width: '75%',
    },
    lampGraphic: {
      width: '100%',
      height: 'auto',
      filter: 'drop-shadow(0 0 10px rgba(255, 235, 59, 0.15))',
    },
    shiftsHeader: {
      width: '100%',
      textAlign: 'center',
      marginTop: '10px',
    },
    shiftsLabel: {
      display: 'inline-block',
      fontSize: '1.6rem',
      fontWeight: '700',
      color: '#fff',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      padding: '0 20px',
    },
    shiftsGrid: {
      gridArea: 'shifts',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      width: '100%',
      marginTop: '20px',
    },
    shiftCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '25px 15px',
      borderRadius: '16px',
      textAlign: 'center',
    },
    morningCard: {
      background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
      border: '1px solid rgba(255, 126, 95, 0.4)',
      boxShadow: '0 4px 15px rgba(255, 126, 95, 0.3)',
    },
    dayCard: {
      background: 'linear-gradient(135deg, #ff9933 0%, #fddd89 100%)',
      border: '1px solid rgba(255, 153, 51, 0.4)',
      boxShadow: '0 4px 15px rgba(255, 153, 51, 0.3)',
    },
    eveningCard: {
      background: 'linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%)',
      border: '1px solid rgba(74, 0, 224, 0.4)',
      boxShadow: '0 4px 15px rgba(74, 0, 224, 0.3)',
    },
    shiftVisualContainer: {
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '15px',
    },
    shiftGraphic: {
      width: '100%',
      height: 'auto',
    },
    shiftTimes: {
      fontSize: '1.5rem',
      fontWeight: '800',
      textTransform: 'uppercase',
      color: '#fff',
      margin: 0,
    },
    shiftLabel: {
      fontSize: '1rem',
      fontWeight: '500',
      color: 'rgba(255, 255, 255, 0.9)',
      marginTop: '3px',
      marginBottom: 0,
    },
    amenitiesSection: {
      width: '100%',
      marginTop: '10px',
    },
    amenitiesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
    },
    amenityCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '12px',
      padding: '10px',
    },
    amenityIconContainer: {
      width: '35px',
      height: '35px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    amenityIconGraphic: {
      width: '100%',
      height: 'auto',
    },
    amenityText: {
      color: '#fff',
      fontSize: '1.1rem',
      fontWeight: '600',
      margin: 0,
    },
    contactSection: {
      width: '100%',
      marginTop: '5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactLabel: {
      fontSize: '1.4rem',
      fontWeight: '700',
      color: '#fff',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      margin: 0,
    },
    phoneNumbersContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      marginTop: '10px',
      color: '#fff',
    },
    whatsappIconGraphic: {
      width: '24px',
      height: 'auto',
    },
    numbersText: {
      fontSize: '1.6rem',
      fontWeight: '800',
      letterSpacing: '-0.5px',
      margin: 0,
    },
    locationRibbon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 40px',
      background: 'rgba(106, 17, 203, 0.3)',
      backdropFilter: 'blur(5px)',
      border: '2px solid rgba(233, 30, 99, 0.4)',
      borderRadius: '50px',
      marginTop: '15px',
      width: 'auto',
      boxShadow: '0 4px 15px rgba(106, 17, 203, 0.3)',
    },
    locationText: {
      color: '#fff',
      fontSize: '1.4rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      margin: 0,
    },
  };

  return (
    <div style={styles.mainWrapper}>
      <main style={styles.heroContainer}>
        
        {/* --- Logo & Tagline Section --- */}
        <section style={styles.logoSection}>
          <div style={styles.libraryBrand}>
            {/* Embedded Book Stack Icon */}
            <svg style={styles.booksVisual} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="60" width="80" height="15" rx="3" fill="#e91e63"/>
              <rect x="5" y="60" width="80" height="2" fill="#fff" fillOpacity="0.3"/>
              <rect x="10" y="45" width="70" height="15" rx="3" fill="#00bcd4"/>
              <rect x="10" y="45" width="70" height="2" fill="#fff" fillOpacity="0.3"/>
              <rect x="15" y="30" width="60" height="15" rx="3" fill="#4caf50"/>
              <rect x="15" y="30" width="60" height="2" fill="#fff" fillOpacity="0.3"/>
              <rect x="20" y="15" width="50" height="15" rx="3" fill="#ff9800"/>
              <rect x="20" y="15" width="50" height="2" fill="#fff" fillOpacity="0.3"/>
              <rect x="30" y="0" width="30" height="15" rx="3" fill="#fff"/>
              <rect x="30" y="0" width="30" height="2" fill="#000" fillOpacity="0.1"/>
            </svg>
            <div style={styles.libraryIdentity}>
              <h1 style={styles.libraryName}>Junoon</h1>
              <span style={styles.blueRibbon}>Library</span>
            </div>
          </div>
          
          <div style={styles.taglineContainer}>
            <div style={styles.taglineRule}></div>
            <p style={styles.taglineText}>Study Without Limits!</p>
            <div style={styles.taglineRule}></div>
          </div>
        </section>

        {/* --- Lamp / Lighting Section --- */}
        <section style={styles.lampSection}>
          <div style={styles.lampVisualContainer}>
            <svg style={styles.lampGraphic} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0L85 40H15L50 0Z" fill="#ffeb3b" fillOpacity="0.3"/>
              <rect x="30" y="110" width="40" height="10" rx="2" fill="#424242"/>
              <path d="M48 40V110" stroke="#424242" strokeWidth="4"/>
              <path d="M52 40V110" stroke="#616161" strokeWidth="1"/>
              <path d="M30 40H70L60 15H40L30 40Z" fill="#212121" stroke="#424242" strokeWidth="2"/>
              <circle cx="50" cy="30" r="8" fill="#fff"/>
            </svg>
          </div>
        </section>

        {/* --- Shift Timings Section --- */}
        <section style={{ gridArea: 'shifts', width: '100%' }}>
          <div style={styles.shiftsHeader}>
            <h2 style={styles.shiftsLabel}>◆ Shift Timings ◆</h2>
          </div>
          
          <div style={styles.shiftsGrid}>
            {/* Morning Shift Card */}
            <div style={{ ...styles.shiftCard, ...styles.morningCard }}>
              <div style={styles.shiftVisualContainer}>
                <svg style={styles.shiftGraphic} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 20V5M25 35L10 20M75 35L90 20" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
                  <circle cx="50" cy="70" r="30" fill="#ffeb3b"/>
                  <path d="M0 90H100" stroke="#fff" strokeWidth="6"/>
                </svg>
              </div>
              <p style={styles.shiftTimes}>6 AM - 11 AM</p>
              <p style={styles.shiftLabel}>Morning Shift</p>
            </div>

            {/* Day Shift Card */}
            <div style={{ ...styles.shiftCard, ...styles.dayCard }}>
              <div style={styles.shiftVisualContainer}>
                <svg style={styles.shiftGraphic} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="30" fill="#fff"/>
                  <path d="M50 10V0M50 100V90M10 50H0M100 50H90M25 25L15 15M85 85L75 75M25 75L15 85M85 25L75 15" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </div>
              <p style={styles.shiftTimes}>11 AM - 5 PM</p>
              <p style={styles.shiftLabel}>Day Shift</p>
            </div>

            {/* Evening Shift Card */}
            <div style={{ ...styles.shiftCard, ...styles.eveningCard }}>
              <div style={styles.shiftVisualContainer}>
                <svg style={styles.shiftGraphic} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 20C60 20 80 40 80 70C80 90 70 100 50 100C30 100 10 90 10 60C10 40 20 20 40 20Z" fill="#ffeb3b"/>
                  <path d="M40 20C55 20 70 35 70 60C70 80 60 90 40 90C25 90 10 80 10 50C10 35 20 20 40 20Z" fill="#4a00e0"/>
                  <path d="M75 15L85 25M75 25L85 15" stroke="#ffeb3b" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <p style={styles.shiftTimes}>5 PM - 9 PM</p>
              <p style={styles.shiftLabel}>Evening Shift</p>
            </div>
          </div>
        </section>

        {/* --- Amenities Section --- */}
        <section style={styles.amenitiesSection}>
          <div style={styles.amenitiesGrid}>
            <div style={styles.amenityCard}>
              <div style={styles.amenityIconContainer}>
                <svg style={styles.amenityIconGraphic} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10C40 30 20 40 20 60C20 80 30 90 50 90C70 90 80 80 80 60C80 40 60 30 50 10Z" fill="#e91e63"/>
                  <path d="M50 30C45 45 35 55 35 65C35 75 40 80 50 80C60 80 65 75 65 65C65 55 55 45 50 30Z" fill="#fff" fillOpacity="0.4"/>
                </svg>
              </div>
              <p style={styles.amenityText}>शांत वातावरण</p>
            </div>

            <div style={styles.amenityCard}>
              <div style={styles.amenityIconContainer}>
                <svg style={styles.amenityIconGraphic} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="25" y="30" width="50" height="40" rx="3" fill="#fff"/>
                  <path d="M25 70V95M75 70V95M40 70V95M60 70V95" stroke="#fff" strokeWidth="5"/>
                  <path d="M25 30V10H75V30" stroke="#fff" strokeWidth="5"/>
                </svg>
              </div>
              <p style={styles.amenityText}>Comfortable Seating</p>
            </div>

            <div style={styles.amenityCard}>
              <div style={styles.amenityIconContainer}>
                <svg style={styles.amenityIconGraphic} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" stroke="#fff" strokeWidth="4"/>
                  <circle cx="50" cy="50" r="30" stroke="#fff" strokeWidth="4"/>
                  <circle cx="50" cy="50" r="15" fill="#e91e63"/>
                </svg>
              </div>
              <p style={styles.amenityText}>Focused Study Zone</p>
            </div>
          </div>
        </section>

        {/* --- Contact & Location Section --- */}
        <section style={styles.contactSection}>
          <h2 style={styles.contactLabel}>Contact Now!</h2>
          
          <div style={styles.phoneNumbersContainer}>
            <svg style={styles.whatsappIconGraphic} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="90" height="90" rx="20" fill="#4caf50"/>
              <path d="M30 60C30 71 40 80 50 80H75L65 65V45C65 34 55 25 45 25C34 25 25 34 25 45V60Z" fill="#fff"/>
              <path d="M40 45V55" stroke="#4caf50" strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <p style={styles.numbersText}>9709915219 | 9507443154</p>
          </div>
          
          <div style={styles.locationRibbon}>
            <p style={styles.locationText}>Parsa Garh Bazar</p>
          </div>
        </section>

      </main>
    </div>
  );
}