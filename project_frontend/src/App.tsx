import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import { ProtectedRoute } from "./components/ProtectedRoute"
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher"
import { HomePage } from "./pages/HomePage/HomePage"
import { LoginPage } from "./pages/LoginPage/LoginPage"

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
            <Route path="/login" Component={LoginPage} />
        </Routes>
    </BrowserRouter>
)

export default App
