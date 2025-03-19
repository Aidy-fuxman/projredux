import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/HomePage.scss";
import Typography from '@mui/material/Typography';


import image1 from "/image1.jpg";
import image2 from "/image2.jpg";
import image3 from "/image3.jpg";
import image4 from "/image4.jpg";
import profile1 from "/profil1.jpg";
import profile2 from "/profil2.jpg";
import profile3 from "/profil3.jpg";
import profile4 from "/profil4.jpg";

const reviews = [
    { id: 1, text: "!שירות מדהים ואיכות גבוהה", author: "דנה", profile: profile1 },
    { id: 2, text: "!המוצרים היו בדיוק מה שחיפשתי", author: "אורי", profile: profile2 },
    { id: 3, text: "!משלוח מהיר ושירות מעולה", author: "נטע", profile: profile3 },
    { id: 4, text: "!!!!! מוצרים באיכות גבוה סטייל ורמה מעולה", author: "סלע", profile: profile4 },
];

const HomePage = () => {
    const images = [image3, image1, image2, image4];
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
            <Typography variant="h3" component="h2" align="center" sx={{
                fontWeight: 700,
                color: '#4a3f35',
                letterSpacing: 2,
                textTransform: 'uppercase',
                textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
                marginBottom: '20px',
                fontFamily: "Roboto Slab"
            }}>
                המלצות מלקוחות מרוצים
            </Typography>
            {reviews.map((review, index) => (
                <Review key={review.id} text={review.text} author={review.author} profile={review.profile} index={index} />
            ))}
        </div>
    );
};

const Review = ({ text, author, profile, index }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.5 }}
            className={`review-box ${index % 2 === 0 ? "bg-blue-100" : "bg-green-100"}`}
        >
            <img src={profile} alt={author} className="client-img" />
            <p className="review-text">"{text}"</p>
            <p className="review-author">- {author}</p>
        </motion.div>
    );
};

export default HomePage;