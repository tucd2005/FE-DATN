import React from 'react'
import { Outlet } from 'react-router-dom';

const ClientLayout = () => {
  return (
    <>
    <div>

    
     <main >
        <Outlet/>
     </main>
     

    </div>
    </>
  )
}

export default ClientLayout