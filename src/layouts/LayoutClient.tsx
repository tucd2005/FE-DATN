import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './client/Header';
import Footer from './client/Footer';

const ClientLayout = () => {
  return (
    <>
    <div>

     <Header/>
     <main >
        <Outlet/>
     </main>
     <Footer/>
    </div>
    </>
  )
}

export default ClientLayout