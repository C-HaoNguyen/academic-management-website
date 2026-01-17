import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage.tsx';
import Login from '../pages/auth/Login.tsx';
import Signup from '../pages/auth/Signup.tsx';
import PublicLayout from '../components/layout/PublicLayout.tsx';
import CourseList from '../pages/courses/CourseListPage.tsx';
import LecturerPage from '../pages/lecturer/LecturerPage.tsx';
import ContactPage from '../pages/about/ContacePage.tsx';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected routes */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/lecturer" element={<LecturerPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;