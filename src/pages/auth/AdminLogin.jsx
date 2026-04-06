import { useState, useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

export default function AdminLogin() {
  const { login } = useContext(AuthContext);

  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(""); // Renamed from otp to token
  
  // UI Flow States
  const [step, setStep] = useState(1); // 1: Credentials, 2: Authenticator Code
  const [loading, setLoading] = useState(false);
  
  // 2FA Setup States (For the very first time)
  const [showQR, setShowQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  /**
   * STEP 1: Initial Login Check
   * This checks credentials and determines if we need to show the 2FA input.
   */
  const handleInitialLogin = async () => {
    if (!email || !password) return alert("Please fill all fields");
    
    // We move to Step 2 to ask for the code from the Google Authenticator App
    setStep(2);
  };

  /**
   * STEP 2: Verify Authenticator Token
   * Sends email, password, and the 6-digit code from the app.
   */
  const handleVerifyToken = async () => {
    if (!token) return alert("Please enter the 6-digit code from your app");

    setLoading(true);
    try {
      const res = await axios.post("/auth/admin/login", { 
        email, 
        password,
        token 
      });

      // If successful, log in
      login(res.data); 
    } catch (err) {
      // If 2FA isn't set up yet, the backend returns 403 with setupRequired: true
      if (err.response?.status === 403 && err.response?.data?.setupRequired) {
        handleSetup2FA();
      } else {
        alert(err.response?.data?.message || "Invalid code or credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * OPTIONAL: Setup 2FA
   * Only triggers if the admin hasn't linked an app yet.
   */
  const handleSetup2FA = async () => {
    try {
      const res = await axios.post("/auth/admin/setup-2fa", { email });
      setQrCodeUrl(res.data.qrCode);
      setShowQR(true);
    } catch (err) {
      alert("Failed to load setup QR code");
    }
  };

  const handleFinalVerifySetup = async () => {
    try {
      await axios.post("/auth/admin/verify-2fa", { email, token });
      alert("2FA Enabled! Now you can login.");
      setShowQR(false);
      setStep(1);
    } catch (err) {
      alert("Verification failed. Check the code.");
    }
  };

  return (
    <div style={formStyle}>
      {step === 1 ? (
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
            Continue
          </button>
        </>
      ) : showQR ? (
        // --- ONE-TIME SETUP VIEW ---
        <>
          <div style={infoBox}>
            <p style={{ margin: 0, fontSize: "13px" }}>Scan this with Google Authenticator:</p>
            <img src={qrCodeUrl} alt="QR Code" style={{ width: "150px", margin: "10px 0" }} />
          </div>
          <input
            type="text"
            placeholder="Enter Code from App"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleFinalVerifySetup} style={buttonStyle}>Verify & Enable</button>
        </>
      ) : (
        // --- STANDARD LOGIN VIEW ---
        <>
          <div style={infoBox}>
            <p style={{ margin: 0, fontSize: "14px" }}>Enter 6-digit code from your</p>
            <strong style={{ fontSize: "13px", color: "#00b894" }}>Authenticator App</strong>
          </div>
          <input
            type="text"
            placeholder="000000"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            maxLength="6"
            style={{ ...inputStyle, textAlign: "center", fontSize: "20px", letterSpacing: "4px" }}
          />
          <button 
            onClick={handleVerifyToken} 
            style={buttonStyle}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify & Enter"}
          </button>
          <button onClick={() => setStep(1)} style={backButtonStyle}>← Back</button>
        </>
      )}
    </div>
  );
}

/* 🎨 STYLES (Keep exactly as you had them) */
const formStyle = { display: "flex", flexDirection: "column", gap: "15px" };
const inputStyle = {
  padding: "12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.3)",
  background: "rgba(255,255,255,0.9)", color: "#333", outline: "none", width: "100%", boxSizing: "border-box"
};
const buttonStyle = {
  padding: "12px", backgroundColor: "#00b894", color: "#fff", border: "none", borderRadius: "10px",
  cursor: "pointer", fontWeight: "bold", fontSize: "16px", transition: "all 0.2s ease"
};
const backButtonStyle = { background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "13px", textDecoration: "underline", marginTop: "5px" };
const infoBox = { textAlign: "center", background: "rgba(0,0,0,0.2)", padding: "10px", borderRadius: "8px", marginBottom: "5px" };