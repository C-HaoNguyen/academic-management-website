import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/home/Homepage.tsx';
import Login from '../pages/auth/LoginPage.tsx';
import Dashboard from '../pages/dashboard/DashboardPage';
import CourseList from '../pages/courses/CourseList';
import Layout from '../components/layout/Layout';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />

                {/* Protected routes */}
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/courses" element={<CourseList />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;