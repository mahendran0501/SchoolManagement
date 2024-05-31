import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import './Homepg.css';
import About from "./About";
import Navbar from "./Navbar";
import Content from "./Content"
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import About from "./About";
// import { Navbar } from "react-bootstrap";
const Carousel = ({ Data }) => {
    let [slide, setSlide] = useState(0);
    let nexSlide = () => {
        setSlide(slide === Data.length - 1 ? 0 : slide + 1);
    }
    let prevSlide = () => {
        setSlide(slide === 0 ? Data.length - 1 : slide - 1);
    }
    console.log(Data);
    return (
        <div className="carouselContainer">
            <BsArrowLeftCircleFill className="carouselArrow carouselArrow-left" onClick={prevSlide} />
            {Data.map((item, idx) => (
                <img
                    src={item.src}
                    alt={item.alt}
                    key={idx}
                    className={slide === idx ? "carouselImageSlide" : "carouselImageSlide carouselImageSlide-hidden"}
                />
            ))}
            <BsArrowRightCircleFill className="carouselArrow carouselArrow-right" onClick={nexSlide} />
            <span className="carouselIndicators">
                {Data.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSlide(idx)}
                        className={slide === idx ? "carouselIndicator" : "carouselIndicator carouselIndicator-inactive"}
                    ></button>
                ))}
            </span>
        </div>
    );
};

function Homepg ({ slides }) {
    return (
        <>
        <div><Navbar/></div>
        <div className='App'>
            <Carousel Data={slides} />
        </div>
        <div><About/></div>
        <div><Content/></div>
        </>
    );
}

export default Homepg;
