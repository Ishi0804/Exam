import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PostForm from './components/PostForm'
import Header from './components/Header'
import ShowPost from './components/ShowPost'
import LoginForm from './components/LoginForm'
import Protect from './auth/Protect'
import RegisterForm from './components/Register'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<ShowPost />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/addpost' element={<Protect element={<PostForm />} />} />
        <Route path='/addpost/:id' element={<Protect element={<PostForm />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
