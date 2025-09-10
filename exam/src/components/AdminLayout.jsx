import React from 'react';
import AdminHeader from '../admin/AdminHeader';
import AdminFooter from '../admin/AdminFooter';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet /> 
      <AdminFooter />
    </div>
    
  );
};

export default AdminLayout;
