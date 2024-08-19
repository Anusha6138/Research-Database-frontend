import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./components/Home";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from "./components/Dashboard";
import Unauthorized from "./components/Unauthorized";
import AddForm from './components/AddForm';
import Journal from './components/Journal';
import Conference from './components/Conference';
import BookChapter from './components/BookChapter';
import JournalForm from './components/Forms/JournelForm';
import ConferenceForm from './components/Forms/ConferenceForm';
import BookStoreForm from './components/Forms/BookStoreForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./components/context/AuthContext";
import PrivateRoute from './components/PrivateRoute';  // Import the PrivateRoute component

export default function App() {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        const response = await axios.get('http://127.0.0.1:5000/accounts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        dispatch({ type: "LOGIN", payload: { account: response.data } });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerIn = () => {
    toast("Successfully Registered !!!");
  };

  const loggedIn = () => {
    toast("Successfully Logged In !!!");
  };

  const JournalIn = () => {
    toast("Successfully  submitted Journal form ");
  };

  
  const ConferenceIn = () => {
    toast("Successfully  submitted Conference form ");
  };
  
  const BookChapterIn = () => {
    toast("Successfully  submitted BookChapter form ");
  };




  const handleNavigation = (path) => {
    if (user.isLoggedIn) {
      navigate(path);
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <Container className="py-3 flex-grow-1">
        <Routes>
          <Route path="/" element={<Home handleNavigation={handleNavigation} />} />
          <Route path="/login" element={<Login loggedIn={loggedIn} />} />
          <Route path="/register" element={<Register registerIn={registerIn} />} />
          <Route path='dashboard' element = {<Dashboard/>}/>

          {/* Use PrivateRoute for protected routes */}
      
          <Route
            path="/add-form"
            element={
              <PrivateRoute permittedRoles={['Admin']}>
                <AddForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <PrivateRoute permittedRoles={['Admin', 'Candidate']}>
                <Journal />
              </PrivateRoute>
            }
          />
          <Route
            path="/conference"
            element={
              <PrivateRoute permittedRoles={['Admin', 'Candidate']}>
                <Conference  />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookChapters"
            element={
              <PrivateRoute permittedRoles={['Admin', 'Candidate']}>
                <BookChapter/>
              </PrivateRoute>
            }
          />
          <Route
            path="/journalForm"
            element={
              <PrivateRoute permittedRoles={['Admin', 'Candidate']}>
                <JournalForm  JournalIn = {JournalIn} />
              </PrivateRoute>
            }
          />
          <Route
            path="/conferenceForm"
            element={
              <PrivateRoute permittedRoles={['Admin', 'Candidate']}>
                <ConferenceForm ConferenceIn = {ConferenceIn} />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookChaptersForm"
            element={
              <PrivateRoute permittedRoles={['Admin', 'Candidate']}>
                <BookStoreForm  BookChapterIn = { BookChapterIn} />
              </PrivateRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Container>
      <Footer />
      <ToastContainer 
      position="top-center"autoClose={2000}/>
    </div>
  );
}
