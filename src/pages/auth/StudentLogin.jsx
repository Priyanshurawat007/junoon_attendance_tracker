import { useState, useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

export default function StudentLogin() {
  const { login } = useContext(AuthContext);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/auth/student/login", {
        userId,
        password
      });

      login(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={formStyle}>
      <input
        placeholder="User ID"
        onChange={e => setUserId(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        style={inputStyle}
      />

      <button onClick={handleLogin} style={buttonStyle}>
        Login
      </button>
    </div>
  );
}

/* 🎨 SAME STYLES */
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.3)",
  background: "rgba(255,255,255,0.15)",
  color: "#000",
  outline: "none",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#00b894",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};