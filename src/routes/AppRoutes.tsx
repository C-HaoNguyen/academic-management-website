import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/public/home/HomePage";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import PublicLayout from "../components/layout/PublicLayout";
import StudentLayout from "../components/layout/StudentLayout";

import CourseList from "../pages/public/courses/CourseListPage";
import CourseDetail from "../pages/public/courses/CourseDetail";

import LecturerPage from "../pages/public/lecturer/LecturerPage";
import ContactPage from "../pages/public/about/ContacePage";

import Checkout from "../pages/public/payment/Checkout";

import Dashboard from "../pages/student/dashboard/Dashboard";
import MyCourses from "../pages/student/my-courses/MyCourses";
import LearningProfile from "../pages/student/learning-profile/LearningProfile";
import TestPractice from "../pages/student/test-practice/TestPractice";

import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/student/learning-profile/Profile";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* ===== AUTH ===== */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                {/* ===== PUBLIC WEBSITE ===== */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/courses/:courseId" element={<CourseDetail />} />
                    <Route path="/lecturer" element={<LecturerPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    {/* Checkout: cần login */}
                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                {/* ===== STUDENT (PRIVATE) ===== */}
                <Route
                    path="/student"
                    element={
                        <ProtectedRoute>
                            <StudentLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="profile" element={<Profile />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="my-courses" element={<MyCourses />} />
                    <Route path="learning-profile" element={<LearningProfile />} />
                    <Route path="test-practice" element={<TestPractice />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
