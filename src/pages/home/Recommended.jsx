import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import BookCard from "../books/BookCard.jsx"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi.js';

const Recommended = () => {

       const {data: books = [] } = useFetchAllBooksQuery();

  return (
    <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>Recommended For You</h2>

        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1400: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1400: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1600: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
         {
            books.length > 0 && books.slice(8, 18).map((book, index) => (
                <SwiperSlide>
                    <BookCard key={index} book={book}/>
                </SwiperSlide>        
            ))
        }

        
        
      </Swiper>   
    </div>
  )
}

export default Recommended