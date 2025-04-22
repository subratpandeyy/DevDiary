import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRegister from './pages/AdminRegister';
import PostDetail from './pages/PostDetail';
import AdminDashboard from './pages/AdminDashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import AdminRoute from './components/AdminRoute';

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/admin/register', element: <AdminRegister /> },
  { path: '/posts/:id', element: <PostDetail /> },
];

export const protectedRoutes = [
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/posts/create',
    element: (
      <AdminRoute>
        <CreatePost />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/posts/edit/:id',
    element: (
      <AdminRoute>
        <EditPost />
      </AdminRoute>
    ),
  },
]; 