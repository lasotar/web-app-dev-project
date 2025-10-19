import { useState } from "react";
import "./LoginPage.css";
import { BasicCard, BasicCardContent, BasicCardHeader } from "../../components/BasicCard/BasicCard";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { createRequest } from "../../services/api.service";

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
}

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, _] = useState(false);

    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("login")

        createRequest('POST', 'Auth/login', {
            email: email,
            password: password
        },
        ).subscribe({
            next: (_) => {
                navigate("/")
            }
        });
    }

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

                        <Button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                            onClick={handleLogin}
                        >
                            {loading ? "Loading..." : "Sign In"}
                        </Button>
                    </form>
                </BasicCardContent>
            </BasicCard>
        </div>
)};
