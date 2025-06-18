import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
} from 'react-icons/fa';
import { MdPrivacyTip } from 'react-icons/md';
import { RiFilePaper2Fill } from 'react-icons/ri';
import { BiSitemap } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 text-sm text-gray-700 pt-5">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 px-32 py-5">
        {/* Cột logo & info */}
        <div>
          <h2 className="text-4xl font-bold text-black mb-4">
            SPORT<span className="text-red-600">Z</span>Y
          </h2>
          <p>123 Main Street Chicago, IL 60601 United States</p>
          <p className="mt-2">📞 +1 (312) 555-1234</p>
          <p>✉️ hello@sportzystore.com</p>
        </div>

        {/* Cột Company */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Testimonials</li>
            <li>Products</li>
            <li>Terms & Condition</li>
            <li>Latest Update</li>
          </ul>
        </div>

        {/* Cột Account */}
        <div>
          <h3 className="font-semibold mb-3">Account</h3>
          <ul className="space-y-1">
            <li>Orders</li>
            <li>Wishlist</li>
            <li>Payment Info</li>
            <li>Addresses</li>
            <li>Personal Info</li>
          </ul>
        </div>

        {/* Cột Support */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-1">
            <li>Payment Guide</li>
            <li>Help Centre</li>
            <li>Privacy Policy</li>
            <li>Return Policy</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Cột Newsletter */}
        <div>
          <h3 className="font-semibold mb-3">Newsletter</h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email address …"
              className="border border-gray-300 px-3 py-2 w-full"
            />
            <button className="bg-red-600 text-white px-4">→</button>
          </div>

          <h3 className="font-semibold mt-4 mb-2">Payment</h3>
          <div className="flex gap-3 text-gray-700 text-2xl">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
            <FaCcApplePay />
          </div>
        </div>
      </div>

      {/* Footer dưới */}
      <div className="bg-black text-white text-center py-3 text-xs flex justify-between px-32">
        <div className="flex gap-4 text-lg">
          <FaFacebookF />
          <FaInstagram />
          <FaTwitter />
        </div>
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1"><MdPrivacyTip /> Privacy Policy</span>
          <span className="flex items-center gap-1"><RiFilePaper2Fill /> Terms</span>
          <span className="flex items-center gap-1"><BiSitemap /> Sitemap</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
