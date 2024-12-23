import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Register/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile from "./pages/Profile/index.jsx";
import Admin from "./pages/Admin/index.jsx";
import SingleMovie from "./pages/SingleMovie/SingleMovie.jsx";
import BookShow from "./pages/BookShow/BookShow.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/movie/:id"
                        element={
                            <ProtectedRoute>
                                <SingleMovie />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <Admin />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route
                        path="/book-show/:id"
                        element={
                            <ProtectedRoute>
                                <BookShow />
                            </ProtectedRoute>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
