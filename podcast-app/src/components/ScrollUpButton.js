import React, { useState, useEffect } from 'react';
import './ScrollUpButton.css'; // Import corresponding CSS file for styling

const ScrollUpButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`scroll-up-button ${isVisible ? 'show' : 'hide'}`}>
            <button onClick={scrollToTop} title="Scroll to top">
                &#9650;
            </button>
        </div>
    );
};

export default ScrollUpButton;
