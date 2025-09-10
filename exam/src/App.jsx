import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import News from './components/News';
import NewsDetail from './components/NewsDetail';
import MyHome from './components/MyHome';
import Menu from './components/Menu';
import Requests from './components/Requests';
import CreateRequest from './components/CreateRequest';
import Complaint from './components/Complaints';
import Support from './components/Support';

import NewsAdmin from './admin/NewsAdmin';
import AddNews from './admin/AddNews';

import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';
import AdminMenu from './admin/MenuAdmin';
import AdminMyHome from './admin/AdminMyHome';
import SupportAdmin from './admin/SupportAdmin';
import SupportDetails from './admin/SupportDetails';
import ComplaintsAdmin from './admin/ComplaintsAdmin';
import ComplaintsDetails from './admin/ComplaintsDetails';
import RequestsAdmin from './admin/RequestsAdmin';
import RequestDetailsAdmin from './admin/RequestDetailsAdmin';
import Messages from './components/Messages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<UserLayout />}>
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/home" element={<MyHome />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/create-request" element={<CreateRequest />} />
          <Route path="/complaints" element={<Complaint />} />
          <Route path="/support" element={<Support />} />
          <Route path="/messages" element={<Messages />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/news-admin" element={<NewsAdmin />} />
          <Route path="/add" element={<AddNews />} />
          <Route path='/menu-admin' element={<AdminMenu />} />
          <Route path='/home-admin' element={<AdminMyHome />}/>
          <Route path='/support-admin' element={<SupportAdmin />}/>
          <Route path="/support-admin/:id" element={<SupportDetails />} />
          <Route path='/complaints-admin' element={<ComplaintsAdmin />}/>
          <Route path="/complaints-admin/:id" element={<ComplaintsDetails />} />
          <Route path='/requests-admin' element={<RequestsAdmin />} />
          <Route path='/requests-admin/:id' element={<RequestDetailsAdmin />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
