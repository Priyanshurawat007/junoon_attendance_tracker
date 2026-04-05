import { useState, useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

export default function AdminLogin() {
  const { login } = useContext(AuthContext);

  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  
  // UI Flow States
  const [step, setStep] = useState(1); // 1: Credentials, 2: OTP
  const [loading, setLoading] = useState(false);

  /**
   * STEP 1: Request OTP
   * Sends email & password to backend. 
   * If correct, backend sends email to admin and we move to step 2.
   */
  const handleInitialLogin = async () => {
    if (!email || !password) return alert("Please fill all fields");
    
    setLoading(true);
    try {
      const res = await axios.post("/auth/admin/login", { email, password });
      
      // Notify user and switch to OTP input
      alert(res.data.message || "OTP sent to your email!");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * STEP 2: Verify OTP
   * Sends email & OTP to backend.
   * If correct, backend returns the JWT token and user object.
   */
  const handleVerifyOTP = async () => {
    if (!otp) return alert("Please enter the OTP");

    setLoading(true);
    try {
      const res = await axios.post("/auth/verify-admin", { 
        email, 
        otp 
      });

      // login() comes from your AuthContext to save token/user
      login(res.data); 
    } catch (err) {
      alert(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={formStyle}>
      {step === 1 ? (
        // --- VIEW 1: EMAIL & PASSWORD ---
        <>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button 
            onClick={handleInitialLogin} 
            style={buttonStyle}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Login & Send OTP"}
          </button>
        </>
      ) : (
        // --- VIEW 2: OTP VERIFICATION ---
        <>
          <div style={infoBox}>
            <p style={{ margin: 0, fontSize: "14px" }}>
              A 6-digit code was sent to:
            </p>
            <strong style={{ fontSize: "13px", color: "#00b894" }}>{email}</strong>
          </div>

          <input
            type="text"
            placeholder="Enter 6-Digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            style={{ ...inputStyle, textAlign: "center", fontSize: "20px", letterSpacing: "4px" }}
          />

          <button 
            onClick={handleVerifyOTP} 
            style={buttonStyle}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify & Enter Dashboard"}
          </button>

          <button 
            onClick={() => setStep(1)} 
            style={backButtonStyle}
          >
            ← Use different account
          </button>
        </>
      )}
    </div>
  );
}

/* 🎨 STYLES */
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.3)",
  background: "rgba(255,255,255,0.9)", // High opacity for readability on backgrounds
  color: "#333",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#00b894",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
  transition: "all 0.2s ease",
};

const backButtonStyle = {
  background: "transparent",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  fontSize: "13px",
  textDecoration: "underline",
  marginTop: "5px",
};

const infoBox = {
  textAlign: "center",
  background: "rgba(0,0,0,0.2)",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "5px",
};