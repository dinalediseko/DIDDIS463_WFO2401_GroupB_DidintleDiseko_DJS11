import React, { useState, useEffect } from 'react';
import './ScrollUpButton.css'; // Import corresponding CSS file for styling

// ScrollUpButton component displays a button to scroll to the top of the page
const ScrollUpButton = () => {
    const [isVisible, setIsVisible] = useState(false); // State to manage visibility of the scroll button

    useEffect(() => {
        // Function to toggle visibility of the scroll button based on scroll position
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true); // Show scroll button when page is scrolled down beyond 300px
            } else {
                setIsVisible(false); // Hide scroll button when page is not scrolled down enough
            }
        };

        window.addEventListener('scroll', toggleVisibility); // Event listener to monitor scroll position

        return () => {
            window.removeEventListener('scroll', toggleVisibility); // Clean up: remove event listener on component unmount
        };
    }, []); // Empty dependency array ensures effect runs only once on mount

    // Function to scroll to the top of the page smoothly
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
