import React, { useState } from 'react'
import { FaBars, FaCartShopping, FaMagnifyingGlass, FaPhone } from 'react-icons/fa6'
import AuthModal from '../../components/authModal/AuthModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <header className=' '>
        <div className='flex justify-between border-b border-gray-300 px-32 py-3 text-gray-400'>
          <div>Địa chỉ : sơn trung yên sơn quốc oai hà nội</div>
          <div className='' >
            <select name="" id="" className='border-r-2 border-gray-300'>
              <option value="">USD </option>
              <option value="">VND</option>
              <option value="">USD</option>
            </select>
            <select name="" id="" className='border-r-2 border-gray-300'  >
              <option value="">EN</option>
              <option value="">VIE</option>
              <option value="">UAE</option>
            </select>
            <span className=''>Track Your Order</span>
          </div>
        </div>

        <div className='flex justify-between items-center px-32 py-5'>
          <div className='flex items-center'>
            <button className='text-red-500 pr-3'><FaMagnifyingGlass /></button>
            <input type="text" name="" id="" placeholder='Enter your search keywords ...' />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-black pr-36">SPORT<span className="text-red-600">Z</span>Y</h2>

          </div>
          <div className='flex items-center'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='border-r border-gray-300 pr-3 text-gray-500 hover:text-black'
          >
            SIGN IN
          </button>
          <a href="#" className='pl-3'><FaCartShopping /></a>
        </div>
      {/* </header> */}

      <AuthModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
        <section>
        <div className='bg-black py-5 px-32 flex justify-between'>
          <div className='text-white flex items-center gap-20 '>
            <a href="" className='flex items-center gap-2'>
              <FaBars /> Browse Categories
            </a>
            <a href="">Products</a>
            <a href="">Blog</a>
            <a href="">Contact</a>
          </div>

          <div className='text-white flex items-center flex items-center gap-3'>
            <FaPhone />
            Customer Care: 0333140287
          </div>

        </div>
      </section>
      </header>
    </>
  )
}

export default Header