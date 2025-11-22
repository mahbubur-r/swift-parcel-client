import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Marquee from 'react-fast-marquee';
import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import start_people from '../../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';

const brandLogo = [amazon, amazon_vector, casio, moonstar, randstad, star, start_people]


const Brands = () => {
    return (
        <section className="py-12 overflow-hidden">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10">We've helped thousands of sales teams</h2>
                <div className="relative w-full">
                    {/* <div className="flex gap-8 animate-slide"> */}
                    <Marquee gradient={false} loop={0} speed={30} pauseOnHover={false}>
                        {
                            brandLogo.map((logo, index) => (
                                <div key={index} className="flex-shrink-0 mx-5 md:mx-10 xl:mx-20">
                                    <img src={logo} alt={`Client ${index + 1}`} className="" />
                                </div>
                            ))
                        }
                    </Marquee>
                    {/* </div> */}
                </div>
            </div>
        </section>
        // <Swiper
        //     slidesPerView={4}
        //     centeredSlides={true}
        //     spaceBetween={30}
        //     loop={true}
        //     grabCursor={true}
        //     autoplay={{
        //         delay: 2000,
        //         disableOnInteraction: false,
        //     }}
        //     modules={[Autoplay]}
        // >
        //     {
        //         brandLogo.map((logo, index) => <SwiperSlide key={index}><img src={logo} /></SwiperSlide>)
        //     }
        // </Swiper>

    );
};

export default Brands;