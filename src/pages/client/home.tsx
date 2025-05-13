import React, { useState, useEffect } from "react";
import HeaderClient from "../../components/client/HeaderClient";
import BannerClient from "../../components/client/bannerClient";

import Product from "../../components/client/productClient";
import ProductSlider from "../../components/client/sileder";
import ProductGrid from "../../components/client/ProductGridClient";
import PromoGrid from "../../components/client/PromoGridClient";
import FooterClient from "../../components/client/FooterClient";
import FeaturedBrands from "../../components/client/FeaturedBrands";

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
