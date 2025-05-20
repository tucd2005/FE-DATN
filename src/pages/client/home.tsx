import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HeaderClient from "../../components/client/HeaderClient";
import BannerClient from "../../components/client/homeClient/bannerClient";
import Product from "../../components/client/homeClient/productClient";
import ProductSlider from "../../components/client/homeClient/sileder";
import ProductGrid from "../../components/client/homeClient/ProductGridClient";
import PromoGrid from "../../components/client/homeClient/PromoGridClient";
import FooterClient from "../../components/client/FooterClient";
import FeaturedBrands from "../../components/client/homeClient/FeaturedBrands";

export default function HomeClient() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="bg-white">
      <HeaderClient />

      <div data-aos="fade-up">
        <BannerClient />
      </div>

      <div data-aos="fade-up" data-aos-delay="100">
        <Product />
      </div>

      <div data-aos="fade-up" data-aos-delay="200">
        <ProductSlider />
      </div>

      <div data-aos="fade-up" data-aos-delay="300">
        <ProductGrid />
      </div>

      <div data-aos="zoom-in-up" data-aos-delay="400">
        <PromoGrid />
      </div>

      <div data-aos="fade-up" data-aos-delay="500">
        <ProductSlider />
      </div>

      <div data-aos="fade-up" data-aos-delay="600">
        <FeaturedBrands />
      </div>

      <FooterClient />
    </div>
  );
}
