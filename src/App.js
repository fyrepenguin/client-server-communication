import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";
import TodoList from "./components/TodoList";
import './App.css'
import Login from "./components/Login";
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import NotFound from './components/NotFound';
import { useDispatch } from 'react-redux';
import { fetchTasks } from "./reducers/tasksSlice";

function App() {

  const dispatch = useDispatch();

  const defaultTask = {
    title: "",
    id: null,
    description: "",
    deadline: null,
    tags: [],
    priority: false,
    image: "",
    completed: false,
    createdAt: null
  };

  useEffect(() => {    
    dispatch(fetchTasks());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <TodoList defaultTask={defaultTask} />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
