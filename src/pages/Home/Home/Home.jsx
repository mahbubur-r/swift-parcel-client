import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../OurServices/OurServices';

const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <title>SwiftParcel-Home</title>
            <Banner></Banner>  
            <OurServices></OurServices>
            <HowItWorks></HowItWorks>
            <Brands></Brands>
            <Reviews reviewsPromise= {reviewsPromise}></Reviews>
        </div>
    );
};

export default Home;