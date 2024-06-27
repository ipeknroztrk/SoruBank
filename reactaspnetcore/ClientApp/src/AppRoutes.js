import TeacherExamManagementPage from './components/TeacherExamManagementPage';
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from './components/Auth/RegisterPage';
import StudentProfilePage from './components/StudentProfilePage';
import ExamListPage from './components/ExamListPage';
import ExamDetailsPage from './components/ExamDetailsPage';
import HomePage from './components/HomePage';

const AppRoutes = [
    {
        index: true,
        element: <LoginPage />
    },
    {
        path: '/teacherExamManagementPage',
        element: <TeacherExamManagementPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/studentprofilepage',
        element: <StudentProfilePage />
    },
    {
        path: '/examlistpage',
        element: <ExamListPage />
    },
    {
        path: '/examdetailspage/:examId', // examId parametresi dinamik olarak değişecek
        element: <ExamDetailsPage />
    },
    {
        path: '/home',
        element: <HomePage />
    }
];

export default AppRoutes;
