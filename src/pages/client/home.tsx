

import anhcogaichay from '../../assets/anhcogaichay.webp';
import bannerSport from '../../assets/banner.webp';
import logoChel from '../../assets/logo-chelsea.jpg';
import { ArrowRight, Lock, Package, Truck } from 'lucide-react';

const HomeClient = () => {
  return (
    <>
      

      {/* banner */}
      <section>
      <img 
  src={bannerSport}
  alt="Ảnh" 
  className="w-full h-[800px] rounded-xl object-cover shadow-md"
/>

      </section>
      {/*  */}


      {/* Thương hiệu  */}
      <section className="px-32 py-10">
  <div>
    <h2 className="font-bold text-red-600 text-xl text-center">B R A N D S</h2>
  </div>
  <div className="grid grid-cols-5 gap-x-12 mt-4">
    <img src={logoChel} alt="Brand Logo" className="h-40 mx-auto" />
    <img src="https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-nike-inkythuatso-2-01-04-15-43-59.jpg" alt="Brand Logo" className="h-40 mx-auto" />
    <img src="https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-psg-inkythuatso-2-01-06-10-14-45.jpg" alt="Brand Logo" className="h-40 mx-auto" />
    <img src="http://rubee.com.vn/admin/webroot/upload/image//images/tin-tuc/puma-logo-3.jpg" alt="Brand Logo" className="h-40 mx-auto" />
    <img src="https://images.seeklogo.com/logo-png/25/1/mlb-logo-png_seeklogo-250501.png" alt="Brand Logo" className="h-40 mx-auto" />
  </div>
</section>



      {/* phần có 2 cái ảnh  */}
    <section className='flex justify-center px-32 py-10 gap-3'>
        <div className='w-1/2'>
            <img
            src="https://giaybongro.vn/upload/images/jersey/8693_1556215657.jpg"
            alt=""
            className='w-full h-80 object-cover rounded'
            />
        </div>
        <div className='w-1/2'>
            <img
            src="https://choibongro.vn/wp-content/uploads/2024/11/ao-bong-ro-lakers-icon-edition-2022-23-2-mat-768x768.webp"
            alt=""
            className='w-full h-80 object-cover rounded'
            />
        </div>
    </section>

    <section className='px-32 py-3 flex justify-between border-b border-gray-300'>
      <div className='flex gap-2 font-bold text-2xl'>
        <h2 className='border-r border-gray-300 pr-3'>Featured</h2>
        <div>NEW</div>
      </div>
      <div className='flex gap-3 text-black font-sans'>
        <a href="" className='hover:text-red-500 '>ALL</a>
        <a href=""className='hover:text-red-500 '>SHOES</a>
        <a href=""className='hover:text-red-500 '>APPAREL</a>
        <a href=""className='hover:text-red-500 '>EQUIPMENT</a>
      </div>
    </section>

    <section className="px-32 py-3 grid grid-cols-4 gap-4">
  {[1, 2, 3, 4].map((_, index) => (
    <div key={index} className="group relative overflow-hidden">
      {/* Container ảnh sản phẩm */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-lg">
        <img
          src="https://choibongro.vn/wp-content/uploads/2024/11/ao-bong-ro-lakers-icon-edition-2022-23-2-mat-768x768.webp"
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Nút icon - hiện lên khi hover */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 transform translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">

          <button className="w-8 h-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded flex items-center justify-center hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button> 
          <button className="w-8 h-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded flex items-center justify-center hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 12v1a9 9 0 009 9h1m4-9h-1a9 9 0 00-9-9V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="w-8 h-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded flex items-center justify-center hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 10l4.553 2.276A1 1 0 0120 13.118V17a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.882a1 1 0 01.447-.842L9 10m6-6v6m0 0H9m6 0L9 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Thêm vào giỏ hàng */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-center py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="text-white hover:text-gray-300 font-medium">THÊM VÀO GIỎ HÀNG</button>
        </div>
      </div>

      {/* Tên sản phẩm */}
      <div className="mt-3">
        <div className="text-xs font-medium mb-1 text-red-500">A P P A R E L</div>
        <h3 className="font-medium text-gray-900 mb-2">Áo bóng rổ Lakers Icon Edition</h3>
        <span className="text-sm  text-gray-900">850.000₫</span>
      </div>
    </div>

  ))}

</section>

<section>

  <div className='flex justify-center py-6'>
    <button className='border-2 border-gray-800 px-2 py-2 hover:bg-gray-300 '>

    LOAD MORE
    </button>
  </div>
</section>

<section className="w-full px-32 py-5 bg-gray-100">
  <div className="w-full h-[700px]">
    <img
      src={anhcogaichay}
      alt="Cô gái chạy trên biển"
      className="w-full h-full "
    />
  </div>
</section>


<section >
    <div className='flex justify-between px-32 border-b border-gray-300'>
        <h3 className='text-2xl font-bold'>BEST SELLER</h3> 
        <div className='flex'>
            <div className='border-r border-gray-400 px-3'>Sort </div>
            <div className='px-3'>All Product</div>
        </div>
    </div>
</section>

<section className="px-32 py-3 grid grid-cols-4 gap-4">
  {[1, 2, 3, 4, 5, 6 ,7, 8].map((_, index) => (
    <div key={index} className="group relative overflow-hidden">
      {/* Container ảnh sản phẩm */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-lg">
        <img
          src="https://choibongro.vn/wp-content/uploads/2024/11/ao-bong-ro-lakers-icon-edition-2022-23-2-mat-768x768.webp"
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Nút icon - hiện lên khi hover */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 transform translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">

          <button className="w-8 h-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded flex items-center justify-center hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button> 
          <button className="w-8 h-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded flex items-center justify-center hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 12v1a9 9 0 009 9h1m4-9h-1a9 9 0 00-9-9V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="w-8 h-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded flex items-center justify-center hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 10l4.553 2.276A1 1 0 0120 13.118V17a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.882a1 1 0 01.447-.842L9 10m6-6v6m0 0H9m6 0L9 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Thêm vào giỏ hàng */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-center py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="text-white hover:text-gray-300 font-medium">THÊM VÀO GIỎ HÀNG</button>
        </div>
      </div>

      {/* Tên sản phẩm */}
      <div className="mt-3">
        <div className="text-xs font-medium mb-1 text-red-500">A P P A R E L</div>
        <h3 className="font-medium text-gray-900 mb-2">Áo bóng rổ Lakers Icon Edition</h3>
        <span className="text-sm  text-gray-900">850.000₫</span>
      </div>
    </div>

  ))}

</section>

<section className="py-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-32 gap-6">
        {/* Khối bên trái - Ảnh */}
        <div className="w-full md:w-1/2">
          <img
            src="https://i1-dulich.vnecdn.net/2022/07/08/TG1-2822-1657270118.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=qOR7V6U7mi0hfDYnj3lRVQ"
            alt="Cảnh đẹp"
            className="w-full h-[300px] object-cover rounded-lg shadow"
          />
        </div>

        {/* Khối bên phải - Nội dung */}
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold mb-3">QUESTION</h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
            veniam voluptates aut illum, eos molestiae.
          </p>
        </div>
      </div>
    </section>

  {/* Features Section */}
  <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center px-32">
        <div className="bg-pink-50 p-6 rounded-lg">
          <Truck className="mx-auto text-red-600" />
          <h4 className="font-semibold mt-2">Worldwide Shipping</h4>
          <p className="text-sm text-gray-600">You will always get your order, no matter where you are.</p>
        </div>
        <div className="bg-pink-50 p-6 rounded-lg">
          <Package className="mx-auto text-red-600" />
          <h4 className="font-semibold mt-2">Free Delivery</h4>
          <p className="text-sm text-gray-600">No more additional fees other than what you pay for what you want.</p>
        </div>
        <div className="bg-pink-50 p-6 rounded-lg">
          <Lock className="mx-auto text-red-600" />
          <h4 className="font-semibold mt-2">Secure Transaction</h4>
          <p className="text-sm text-gray-600">Verified marketplace since 2018. Safety guaranteed.</p>
        </div>
      </section>

      <section className='px-32 py-5'>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Latest Updates</h2>
          <button className="text-sm font-semibold text-red-600 flex items-center gap-1">
            See All Articles <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'The Ultimate Guide to Choosing the Right Sportswear for Your Workout',
              author: 'Michael Davis',
              date: '2 FEB',
              img: 'https://i.ibb.co/hWNjsyF/yoga.jpg',
            },
            {
              title: 'Mastering Your Sports Nutrition: Essential Tips for Optimal Performance',
              author: 'Sarah Thompson',
              date: '15 APR',
              img: 'https://i.ibb.co/7NKT4X1/food.jpg',
            },
            {
              title: 'Staying Motivated: Strategies to Overcome Challenges in Your Fitness Journey',
              author: 'Emily Wilson',
              date: '18 SEP',
              img: 'https://i.ibb.co/xC3KPRW/hiking.jpg',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow">
              <div className="relative">
                <img src={item.img} alt={item.title} className="w-full h-[200px] object-cover" />
                <div className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded shadow">
                  {item.date}
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-semibold text-sm leading-snug">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


    
    </>
  )
}

export default HomeClient 