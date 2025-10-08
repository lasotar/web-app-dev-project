import { useState } from "react";
import "./LoginPage.css";
import { BasicCard, BasicCardContent, BasicCardHeader } from "../../components/BasicCard/BasicCard";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
}

// Uses the same CSS as login
export const ResetPasswordPage: React.FC = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="login-page">
            <BasicCard className="login-card">
                <BasicCardHeader className="login-card-header">
                    <h2 className="login-title">
                        Reset Password
                    </h2>
                </BasicCardHeader>
                <BasicCardContent>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-field">
                            <h3 className="form-label">Old Password</h3>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                                disabled={loading}
                                minLength={6} />
                        </div>
                        <div className="form-field">
                            <h3 className="form-label">New Password</h3>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                disabled={loading}
                                minLength={6} />
                        </div>

                        <Button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Reset Password"}
                        </Button>
                    </form>
                </BasicCardContent>
            </BasicCard>
        </div>
)};
