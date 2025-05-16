import React, { useState, useEffect } from "react";
import HeaderClient from "../../components/client/HeaderClient";
import BannerClient from "../../components/client/homeClient/bannerClient";

import Product from "../../components/client/homeClient/productClient";
import ProductSlider from "../../components/client/homeClient/sileder";
import ProductGrid from "../../components/client/homeClient/ProductGridClient";
import PromoGrid from "../../components/client/homeClient/PromoGridClient";
import FooterClient from "../../components/client/FooterClient";
import FeaturedBrands from "../../components/client/homeClient/FeaturedBrands";

export default function HomeClient() {

    return (
        <div className="bg-white">
            <HeaderClient />
            <BannerClient />
            <Product />
            <ProductSlider />
            <ProductGrid />
            <PromoGrid />
            <ProductSlider />

            <FeaturedBrands />
            <FooterClient />
        </div>

    );
}
