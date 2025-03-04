import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/HomePage.css";

// ייבוא התמונות מהתיקייה assets
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";

const reviews = [
    { id: 1, text: "שירות מדהים ואיכות גבוהה!", author: "דנה" },
    { id: 2, text: "המוצרים היו בדיוק מה שחיפשתי!", author: "אורי" },
    { id: 3, text: "משלוח מהיר ושירות מעולה!", author: "נטע" },
];

const HomePage = () => {
    const images = [image1, image2, image3, image4];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <>
            <div className="carousel-container">
                <button className="arrow left" onClick={goToPrevious}>{"<"}</button>

                <div className="carousel">
                    <div className="overlay">
                        <h1>Timber & Style</h1>
                    </div>
                    <img src={images[currentImageIndex]} alt="carousel" />
                </div>

                <button className="arrow right" onClick={goToNext}>{">"}</button>
            </div>

            <Reviews />
        </>
    );
};

const Reviews = () => {
    return (
        <div className="reviews-container">
            <p id="title">המלצות מלקוחות מרוצים!!!!!</p>
            {reviews.map((review, index) => (
                <Review key={review.id} text={review.text} author={review.author} index={index} />
            ))}
        </div>
    );
};

const Review = ({ text, author, index }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.9 }}
            className={`review-box ${index % 2 === 0 ? "bg-blue-100" : "bg-green-100"}`}
        >
            <p className="review-text">"{text}"</p>
            <p className="review-author">- {author}</p>
        </motion.div>
    );
};

export default HomePage;
