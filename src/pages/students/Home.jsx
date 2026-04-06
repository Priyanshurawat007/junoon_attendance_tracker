import { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import bg from "../../assets/Second.gif";

export default function Home() {
  const { token, user, logout } = useContext(AuthContext);

  // Navigation & Data States
  const [screen, setScreen] = useState("home"); 
  const [msg, setMsg] = useState("");
  const [stats, setStats] = useState(null);
  const [todayRecord, setTodayRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  // Change Password States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);

  // 1. FETCH DATA LOGIC
  const fetchTodayData = async () => {
    try {
      setLoading(true);
      // Get overall stats
      const statsRes = await axios.get(`/attendance/percentage?studentId=${user.id}`);
      setStats(statsRes.data);

      // --- TIMEZONE FIX START ---
      // We use 'en-CA' because it returns YYYY-MM-DD, matching your DB format
      const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
      const now = new Date();
      const month = String(new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).getMonth() + 1).padStart(2, '0');
      const year = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).getFullYear();
      // --- TIMEZONE FIX END ---

      const res = await axios.get(
        `/attendance/calendar?studentId=${user.id}&month=${month}&year=${year}`
      );

      const todayDay = res.data.find(d => d.date === today);
      setTodayRecord(todayDay || { 
        checkIn: null, 
        checkOut: null, 
        totalHours: 0, 
        status: "ABSENT" 
      });

    } catch (err) {
      console.error("Fetch Error:", err);
      setMsg("Could not update attendance data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchTodayData();
  }, [user]);

  // 2. ATTENDANCE ACTIONS
  const handleCheckIn = async () => {
    try {
      await axios.post("/attendance/check-in", {}, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setMsg("✅ Checked In Successfully");
      await fetchTodayData(); 
    } catch (err) {
      setMsg(err.response?.data?.message || "Check-in failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      await axios.post("/attendance/check-out", {}, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setMsg("👋 Checked Out Successfully");
      await fetchTodayData(); 
    } catch (err) {
      setMsg(err.response?.data?.message || "Check-out failed");
    }
  };

  // 3. PASSWORD LOGIC
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return setMsg("Passwords do not match");
    if (newPassword.length < 6) return setMsg("Min 6 characters required");

    setLoadingPassword(true);
    try {
      await axios.put("/attendance/change-password", 
        { oldPassword, newPassword }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg("✅ Password updated!");
      setOldPassword(""); setNewPassword(""); setConfirmPassword("");
      setTimeout(() => { setScreen("home"); setMsg(""); }, 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Update failed");
    } finally {
      setLoadingPassword(false);
    }
  };

  // SCREEN RENDERING
  if (screen === "calendar") return <CalendarScreen goBack={() => setScreen("home")} user={user} />;

  if (screen === "changePassword") {
    return (
      <div style={styles.page}>
        <div style={styles.overlay}></div>
        <div style={styles.container}>
          <button onClick={() => setScreen("home")} style={styles.backBtn}>⬅ Back</button>
          <h1 style={styles.title}>Update Security</h1>
          <form onSubmit={handleChangePassword} style={styles.form}>
            <input type="password" placeholder="Current Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} style={styles.input} required />
            <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={styles.input} required />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={styles.input} required />
            <button type="submit" style={styles.primaryBtn} disabled={loadingPassword}>
              {loadingPassword ? "Processing..." : "Update Password"}
            </button>
          </form>
          {msg && <p style={styles.msg}>{msg}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Hi, {user?.name}</h1>
          <button onClick={logout} style={styles.logout}>Logout</button>
        </div>

        <div style={styles.todayCard}>
          <h3 style={{marginBottom: '10px'}}>Today's Status</h3>
          <p><strong>IN:</strong> {todayRecord?.checkIn || "--:--"}</p>
          <p><strong>OUT:</strong> {todayRecord?.checkOut || "--:--"}</p>
          <p><strong>Hours:</strong> {todayRecord?.totalHours || 0}h</p>
          <p><strong>Status:</strong> 
            <span style={{ 
              marginLeft: '8px', 
              color: todayRecord?.status === "PRESENT" ? "#22c55e" : todayRecord?.status === "HALF_DAY" ? "#f59e0b" : "#ef4444",
              fontWeight: 'bold' 
            }}>
              {todayRecord?.status || "ABSENT"}
            </span>
          </p>
        </div>

        <div style={styles.actions}>
          <button onClick={handleCheckIn} style={styles.primaryBtn}>Check In</button>
          <button onClick={handleCheckOut} style={styles.secondaryBtn}>Check Out</button>
          <button onClick={() => setScreen("calendar")} style={styles.outlineBtn}>📅 Calender</button>
          <button onClick={() => setScreen("changePassword")} style={styles.outlineBtn}>🔑 Change Password</button>
        </div>

        {msg && <p style={styles.msg}>{msg}</p>}

        {loading ? <p style={styles.loading}>Updating...</p> : stats && (
          <div style={styles.cards}>
            <Card title="Days" value={stats.totalDays} />
            <Card title="Present" value={stats.presentDays} />
            <Card title="Avg %" value={`${stats.percentage}%`} />
          </div>
        )}
      </div>
    </div>
  );
}

// SUB-COMPONENTS
const Card = ({ title, value }) => (
  <div style={styles.card}>
    <p style={styles.cardTitle}>{title}</p>
    <h2 style={styles.cardValue}>{value}</h2>
  </div>
);

function CalendarScreen({ goBack, user }) {
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [curr, setCurr] = useState({ month: new Date().getMonth() + 1, year: new Date().getFullYear() });

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/attendance/calendar?studentId=${user.id}&month=${String(curr.month).padStart(2,'0')}&year=${curr.year}`);
        setCalendar(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, [curr, user]);

  const changeMonth = (dir) => {
    setCurr(prev => {
      let m = prev.month + dir;
      let y = prev.year;
      if (m > 12) { m = 1; y++; }
      if (m < 1) { m = 12; y--; }
      return { month: m, year: y };
    });
  };

  const monthLabel = new Date(curr.year, curr.month - 1).toLocaleString('default', { month: 'long' });

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        <button onClick={goBack} style={styles.backBtn}>⬅ Back</button>
        <div style={styles.calendarHeader}>
          <button onClick={() => changeMonth(-1)} style={styles.navBtn}>←</button>
          <h2 style={styles.calendarTitle}>{monthLabel} {curr.year}</h2>
          <button onClick={() => changeMonth(1)} style={styles.navBtn}>→</button>
        </div>

        {loading ? <p style={styles.loading}>Loading...</p> : (
          <>
            <div style={styles.grid}>
              {calendar.map((day, i) => (
                <div key={i} 
                  title={`IN: ${day.checkIn || '-'}\nOUT: ${day.checkOut || '-'}`}
                  style={{...styles.day, backgroundColor: day.status === "PRESENT" ? "#22c55e" : day.status === "HALF_DAY" ? "#f59e0b" : "#ef4444"}}>
                  {day.date.split("-")[2]}
                </div>
              ))}
            </div>
            <div style={styles.legend}>
              <Legend color="#22c55e" label="P" />
              <Legend color="#f59e0b" label="HD" />
              <Legend color="#ef4444" label="A" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const Legend = ({ color, label }) => (
  <div style={styles.legendItem}>
    <div style={{ width: 12, height: 12, background: color, borderRadius: "3px" }}></div>
    <span style={{fontSize: '12px'}}>{label}</span>
  </div>
);

const styles = {
  page: { minHeight: "100vh", backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", fontFamily: "'Segoe UI', Tahoma, sans-serif" },
  overlay: { position: "absolute", width: "100%", height: "100%", background: "rgba(0,0,0,0.7)" },
  container: { position: "relative", zIndex: 2, width: "90%", maxWidth: "500px", padding: "25px", borderRadius: "24px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  title: { fontSize: "24px", fontWeight: "600" },
  todayCard: { background: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "15px", marginBottom: "20px", border: "1px solid rgba(255,255,255,0.1)" },
  actions: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" },
  primaryBtn: { padding: "12px", borderRadius: "10px", border: "none", background: "#00b894", color: "#fff", fontWeight: "600", cursor: "pointer" },
  secondaryBtn: { padding: "12px", borderRadius: "10px", border: "none", background: "#ef4444", color: "#fff", fontWeight: "600", cursor: "pointer" },
  outlineBtn: { padding: "12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer" },
  logout: { padding: "6px 12px", borderRadius: "6px", border: "none", background: "rgba(239, 68, 68, 0.2)", color: "#ef4444", cursor: "pointer", fontSize: "12px" },
  msg: { textAlign: "center", color: "#ffd700", fontSize: "14px", margin: "10px 0" },
  cards: { display: "flex", gap: "10px" },
  card: { flex: 1, padding: "15px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" },
  cardTitle: { opacity: 0.6, fontSize: "12px" },
  cardValue: { fontSize: "20px", marginTop: "5px" },
  loading: { textAlign: "center", opacity: 0.7 },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.2)", color: "#fff" },
  backBtn: { background: "none", border: "none", color: "#fff", cursor: "pointer", marginBottom: "15px", display: "block" },
  calendarHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" },
  navBtn: { background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: "35px", height: "35px", borderRadius: "50%", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" },
  day: { padding: "10px 0", textAlign: "center", borderRadius: "8px", fontSize: "12px", fontWeight: "bold" },
  legend: { display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" },
  legendItem: { display: "flex", alignItems: "center", gap: "5px" }
};