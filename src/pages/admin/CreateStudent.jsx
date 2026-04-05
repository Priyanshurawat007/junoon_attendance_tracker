import { useState, useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import bg from "../../assets/Second.gif";

export default function CreateStudent({ goBack }) {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deskNumber, setDeskNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name || !phone || !deskNumber) {
      return setResult({ error: "Please fill all fields" });
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "/admin/create-student",
        { name, phone, deskNumber },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setResult(res.data);
      // Clear inputs on success
      setName("");
      setPhone("");
      setDeskNumber("");
    } catch (err) {
      setResult({
        error: err.response?.data?.message || "Something went wrong"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.container}>
        {/* 🔙 HEADER */}
        <div style={styles.header}>
          <button onClick={goBack} style={styles.backBtn}>⬅ Back</button>
          <h2 style={styles.heading}>Create Student</h2>
        </div>

        {/* INPUTS */}
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Student Full Name"
          style={styles.input}
        />

        <input
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone Number (User ID)"
          style={styles.input}
        />

        <input
          value={deskNumber}
          onChange={e => setDeskNumber(e.target.value)}
          placeholder="Assign Desk/Chair No."
          style={styles.input}
        />

        {/* BUTTON */}
        <button onClick={handleCreate} style={styles.btn} disabled={loading}>
          {loading ? "Creating..." : "Create Student"}
        </button>

        {/* RESPONSE UI */}
        {result && (
          <div style={styles.resultBox}>
            {result.error ? (
              <p style={{ color: "#ef4444", margin: 0 }}>{result.error}</p>
            ) : (
              <>
                <p style={{ color: "#00b894", fontWeight: "bold", marginBottom: "10px" }}>{result.message}</p>
                <p><strong>User ID (Phone):</strong> {result.userId}</p>
                <p><strong>Desk No:</strong> {result.deskNumber}</p>
                <p><strong>Default Password:</strong> {result.defaultPassword}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* 🎨 INLINE STYLES (NO CHANGES) */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    fontFamily: "'Poppins', sans-serif",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
  },
  container: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "420px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    color: "#fff",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "700",
  },
  backBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#00b894",
    color: "#fff",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    outline: "none",
    marginBottom: "15px",
    boxSizing: "border-box"
  },
  btn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#00b894",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
  resultBox: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "10px",
    background: "rgba(0,0,0,0.4)",
  }
};