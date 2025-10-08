import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import { ProtectedRoute } from "./components/ProtectedRoute"
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher"
import { HomePage } from "./pages/HomePage/HomePage"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { ResetPasswordPage  } from "./pages/LoginPage/ResetPasswordPage"

const App = () => (
    <BrowserRouter>
        <ThemeSwitcher />
        <Routes>
            <Route 
                path="/"
                element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/reset-password"
                element={
                    <ProtectedRoute>
                        <ResetPasswordPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/login" Component={LoginPage} />
        </Routes>
    </BrowserRouter>
)

export default App
