import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import { ProtectedRoute } from "./components/ProtectedRoute"
import { HomePage } from "./pages/HomePage/HomePage"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { ResetPasswordPage  } from "./pages/LoginPage/ResetPasswordPage"

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route 
                path="/"
                element={
                    <ProtectedRoute minRole="User">
                        <HomePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/reset-password"
                element={
                    <ProtectedRoute minRole="User">
                        <ResetPasswordPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/login" Component={LoginPage} />
        </Routes>
    </BrowserRouter>
)

export default App
