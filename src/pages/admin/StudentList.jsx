import { useEffect, useState, useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import bg from "../../assets/Second.gif";

export default function StudentList({ goBack }) {
  const { token } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data.students || []);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [token]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete student: ${name}?`)) return;

    try {
      await axios.delete(`/admin/delete-student/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Student deleted successfully");
      fetchStudents(); 
    } catch (err) {
      alert(err.response?.data?.message || "Deletion failed");
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={goBack} style={styles.backBtn}>⬅ Back</button>
          <h2 style={styles.heading}>Student Management</h2>
        </div>

        {loading ? (
          <p style={styles.loading}>Loading student data...</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone No.</th> {/* 👈 Added Header */}
                  <th>Desk No.</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id || s._id} style={styles.row}>
                    <td style={styles.nameCell}>{s.name}</td>
                    {/* Displaying s.phone or s.userId since you used phone as ID */}
                    <td style={styles.phoneCell}>{s.userId || s.phone || "—"}</td> 
                    <td style={styles.deskCell}>{s.deskNumber || "N/A"}</td>
                    <td style={styles.timeCell}>{formatTime(s.checkIn)}</td>
                    <td style={styles.timeCell}>{formatTime(s.checkOut)}</td>
                    <td style={{
                      ...styles.statusCell,
                      color: s.status === "PRESENT" ? "#22c55e" : s.status === "HALF_DAY" ? "#f59e0b" : "#ef4444"
                    }}>
                      {s.status || "ABSENT"}
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDelete(s.id || s._id, s.name)} 
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {students.length === 0 && !loading && (
          <p style={styles.noData}>No students found.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative", fontFamily: "'Poppins', sans-serif" },
  overlay: { position: "absolute", width: "100%", height: "100%", background: "rgba(0,0,0,0.6)" },
  container: { position: "relative", zIndex: 2, width: "95%", maxWidth: "1200px", padding: "40px", borderRadius: "20px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(15px)", WebkitBackdropFilter: "blur(15px)", color: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  heading: { fontSize: "26px", fontWeight: "700" },
  backBtn: { padding: "10px 18px", borderRadius: "8px", border: "none", background: "#00b894", color: "#fff", cursor: "pointer", fontWeight: "600", transition: "0.3s" },
  tableWrapper: { overflowX: "auto", borderRadius: "12px", background: "rgba(255,255,255,0.05)", padding: "5px" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left" },
  row: { borderBottom: "1px solid rgba(255,255,255,0.15)", transition: "0.2s" },
  nameCell: { padding: "16px 12px", fontWeight: "500" },
  phoneCell: { padding: "16px 12px", color: "#ddd", fontSize: "14px" }, // 👈 Phone style
  deskCell: { padding: "16px 12px", fontWeight: "700", color: "#00b894" },
  timeCell: { padding: "16px 12px", fontFamily: "monospace", fontSize: "15px" },
  statusCell: { padding: "16px 12px", fontWeight: "600", textTransform: "uppercase" },
  deleteBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s"
  },
  loading: { textAlign: "center", color: "#ddd", fontSize: "18px", marginTop: "50px" },
  noData: { textAlign: "center", color: "#aaa", fontSize: "18px", marginTop: "50px" }
};