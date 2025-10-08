import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { BasicCard, BasicCardContent, BasicCardHeader } from "../../components/BasicCard/BasicCard";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
}

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="login-page">
            <BasicCard className="login-card">
                <BasicCardHeader className="login-card-header">
                    <h2 className="login-title">
                        Login
                    </h2>
                </BasicCardHeader>
                <BasicCardContent>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-field">
                            <h3 className="form-label">Email</h3>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading} />
                        </div>
                        <div className="form-field">
                            <h3 className="form-label">Password</h3>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                minLength={6} />
                        </div>

                        <div className="forgot-password">
                            <Link
                                to="/reset-password"
                                className="forgot-password-link"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Sign In"}
                        </Button>
                    </form>
                </BasicCardContent>
            </BasicCard>
        </div>
)};
