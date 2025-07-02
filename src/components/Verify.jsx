import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth.service";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying...");

    useEffect(() => {
        const userId = searchParams.get("userId");
        const secret = searchParams.get("secret");
        if (userId && secret) {
            authService.account.updateVerification(userId, secret)
                .then(() => {
                    setMessage("Email verified! You can now log in.");
                    setTimeout(() => navigate("/login"), 2000);
                })
                .catch(() => setMessage("Verification failed or link expired."));
        } else {
            setMessage("Invalid verification link.");
        }
    }, [searchParams, navigate]);

    return <div className="flex justify-center items-center h-screen">{message}</div>;
};

export default Verify;