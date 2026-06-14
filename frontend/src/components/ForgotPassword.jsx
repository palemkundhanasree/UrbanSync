import React, { useState } from "react";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    // SEND OTP
    const handleSendOTP = async () => {
        const response = await fetch(
            "http://localhost:5000/api/auth/forgot-password",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            }
        );
        const data = await response.json();
        if (response.ok) {
            alert("OTP sent successfully");
            setOtpSent(true);
        } else {
            alert(data.message);
        }
    };

   // VERIFY OTP
const handleVerifyOTP = async () => {
    try {
        const response = await fetch(
            "http://localhost:5000/api/auth/verify-otp",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    otp
                })
            }
        );
        const data = await response.json();
        if (response.ok) {
            alert("OTP verified successfully");
            setOtpVerified(true);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.log(error);
        alert("OTP verification failed");
    }
};
   // RESET PASSWORD
const handleResetPassword = async () => {
    try {
        const response = await fetch(
            "http://localhost:5000/api/auth/reset-password",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    newPassword
                })
            }
        );
        const data = await response.json();
        if (response.ok) {
            alert("Password updated successfully");
            window.location.href = "/login";
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};
      return (

    <div
        style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#133215",
            color: "#f3e8d3"
        }} >
        <div
            style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                padding: "40px",
                borderRadius: "15px",
                width: "100%",
                maxWidth: "400px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)"
            }} >
            <h2
                style={{
                    textAlign: "center",
                    color: "#baf087",
                    marginBottom: "10px",
                    fontSize: "2rem"
                }}>Forgot Password
            </h2>
            <p
                style={{
                    textAlign: "center",
                    marginBottom: "30px",
                    color: "#ccc"
                }} > Reset your UrbanSync account password
            </p>

            {/* EMAIL INPUT */}

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #444",
                    backgroundColor: "#1a3d1c",
                    color: "#fff",
                    fontSize: "1rem",
                    marginBottom: "20px",
                    boxSizing: "border-box",
                    outline: "none"
                }}/>

            {/* SEND OTP BUTTON */}
            {
                !otpSent && (
                    <button
                        onClick={handleSendOTP}
                        style={{
                            width: "100%",
                            padding: "12px",
                            backgroundColor: "#baf087",
                            color: "#133215",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}> Send OTP
                    </button>
                )
            }
            {/* OTP VERIFICATION */}
            {
                otpSent && !otpVerified && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #444",
                                backgroundColor: "#1a3d1c",
                                color: "#fff",
                                fontSize: "1rem",
                                marginBottom: "20px",
                                boxSizing: "border-box",
                                outline: "none"
                            }}/>
                        <button
                            onClick={handleVerifyOTP}
                            style={{
                                width: "100%",
                                padding: "12px",
                                backgroundColor: "#baf087",
                                color: "#133215",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}> Verify OTP
                        </button>
                    </>

                )
            }
            {/* RESET PASSWORD */}
            {
                otpVerified && (
                    <>
                        <input
                            type="password"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #444",
                                backgroundColor: "#1a3d1c",
                                color: "#fff",
                                fontSize: "1rem",
                                marginBottom: "20px",
                                boxSizing: "border-box",
                                outline: "none"
                            }}/>
                        <button
                            onClick={handleResetPassword}
                            style={{
                                width: "100%",
                                padding: "12px",
                                backgroundColor: "#baf087",
                                color: "#133215",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}>  Reset Password
                        </button>
                    </>
                )
            }
        </div>                  
    </div>

  )};

export default ForgotPassword;