import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RandomReview = () => {
    const { businessId } = useParams();
    const [business, setBusiness] = useState(null);
    const [randomReview, setRandomReview] = useState(null);

    // Fetch business data
    useEffect(() => {
        const fetchBusinessData = async () => {
            try {
                const response = await axios.get(`http:localhost:5000/businesses/get/${businessId}`);
                setBusiness(response.data);
            } catch (error) {
                console.error("Error fetching business data", error);
            }
        };

        fetchBusinessData();
    }, [businessId]);

    // Select a random review from the fetched business reviews
    useEffect(() => {
        if (business && business?.Review?.length > 0) {
            const randomIndex = Math.floor(Math.random() * business.Review.length);
            setRandomReview(business.Review[randomIndex]);
        }
    }, [business]);

    if (!business) {
        return <div>Loading business data...</div>;
    }

    if (!randomReview) {
        return <div>No reviews available.</div>;
    }

    return (
        <div>
            <h2>Random Review</h2>
            <p><strong>Description:</strong> {randomReview.Description}</p>
            <p><strong>Status:</strong> {randomReview.Status}</p>
        </div>
    );
};

export default RandomReview;
