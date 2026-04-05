import { useEffect, useState, useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { Pie } from "react-chartjs-2";
import CreateStudent from "./CreateStudent";
import StudentList from "./StudentList";
import bg from "../../assets/Second.gif";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    if (!token) return;
    fetchDashboard();
  }, [token]);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 FIXED: Reset Password Logic (Variable names aligned)
  const handleResetPassword = async () => {
    const studentIdInput = prompt("Enter the Student UserID to reset password to '123456':");
    
    if (!studentIdInput) return;

    try {
      // Corrected the template literal to use studentIdInput
      const res = await axios.post(`/admin/reset-password/${studentIdInput}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`✅ Success: ${res.data.message}\nNew Password: ${res.data.newPassword}`);
    } catch (err) {
      alert(err.response?.data?.error || "Reset failed. Check the Student ID.");
    }
  };

  // 🔁 PAGE ROUTING
  if (page === "create") {
    return <CreateStudent goBack={() => setPage("dashboard")} />;
  }

  if (page === "students") {
    return <StudentList goBack={() => setPage("dashboard")} />;
  }

  if (!data) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.container}>

        {/* 🔥 HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Dashboard</h1>

          <div style={styles.headerActions}>
            {/* 🔑 NEW: Reset Button integrated into existing UI */}
            <button 
              onClick={handleResetPassword} 
              style={{ ...styles.secondaryBtn, borderColor: "#f59e0b", color: "#f59e0b" }}
            >
              🔑 Reset Pass
            </button>

            <button onClick={() => setPage("create")} style={styles.primaryBtn}>
              + Create Student
            </button>

            <button onClick={() => setPage("students")} style={styles.secondaryBtn}>
              Student List
            </button>

            <button onClick={logout} style={styles.logout}>
              Logout
            </button>
          </div>
        </div>

        {/* 🔥 STATS */}
        <div style={styles.cards}>
          <Card title="Total Students" value={data.summary.totalStudents} />
          <Card title="Present" value={data.summary.present} />
          <Card title="Absent" value={data.summary.absent} />
        </div>

        {/* 📊 CHART */}
        <div style={styles.chart}>
          <h3 style={styles.chartTitle}>Attendance Overview</h3>

          <Pie
            redraw={true}
            data={{
              labels: data.chartData.map(d => d.label),
              datasets: [
                {
                  data: data.chartData.map(d => d.value),
                  backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
                  borderWidth: 0
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* 🔥 CARD */
const Card = ({ title, value }) => (
  <div style={styles.card}>
    <p style={styles.cardTitle}>{title}</p>
    <h2 style={styles.cardValue}>{value}</h2>
  </div>
);

/* 🎨 PREMIUM GLASS UI (UNCHANGED) */
const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    fontFamily: "Poppins"
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.65)"
  },
  container: {
    position: "relative",
    zIndex: 2,
    width: "95%",
    maxWidth: "1000px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
    color: "#fff"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px"
  },
  title: {
    fontSize: "28px",
    fontWeight: "700"
  },
  headerActions: {
    display: "flex",
    gap: "10px"
  },
  primaryBtn: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#00b894",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600"
  },
  secondaryBtn: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    color: "#fff",
    cursor: "pointer"
  },
  logout: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer"
  },
  cards: {
    display: "flex",
    gap: "15px",
    marginBottom: "25px"
  },
  card: {
    flex: 1,
    padding: "20px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    textAlign: "center",
    transition: "0.3s",
  },
  cardTitle: {
    opacity: 0.7,
    fontSize: "14px"
  },
  cardValue: {
    fontSize: "26px",
    fontWeight: "700",
    marginTop: "5px"
  },
  chart: {
    padding: "25px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)"
  },
  chartTitle: {
    marginBottom: "15px",
    fontSize: "18px"
  },
  loading: {
    color: "#fff",
    textAlign: "center",
    marginTop: "100px",
    fontSize: "20px"
  }
};