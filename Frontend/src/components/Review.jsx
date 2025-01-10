import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const RandomReview = () => {
    const { businessId } = useParams();
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);
    const [businessData, setBusinessData] = useState(null);
    const [randomReview, setRandomReview] = useState(null);

    // Fetch business data
    const fetchBusinessData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/businesses/get/${businessId}`);
            var filterData = response.data.Review.filter(value => value.Status === "Incomplete")
            setBusiness(filterData);
            setBusinessData(response.data);
            // console.log(response.data.Review);
        } catch (error) {
            console.error("Error fetching business data", error);
        }
    };
    useEffect(() => {
        fetchBusinessData();
    }, [businessId]);

    const updateStatus = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/businesses/update-review-status/${businessId}/${randomReview.Description}`);
            console.log(response.data);
            if (response.data.message == "Review status updated to Approved") {
                window.location.assign(businessData.Link);
                fetchBusinessData();

            }
        } catch (err) {
            console.log(err);
        }
    }

    const copyToClipboard = (data) => {
        const textToCopy = `${data}`;
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                console.log("Copied!");
                updateStatus();
                // window.location.assign(businessData.Link)
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    };

    // Select a random review from the fetched business reviews
    useEffect(() => {
        if (business && business?.length > 0) {
            const randomIndex = Math.floor(Math.random() * business.length);
            setRandomReview(business[randomIndex]);
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
            <button onClick={() => copyToClipboard(randomReview.Description)}>Ok</button>
            <button onClick={() => window.history.back()}>Cancel</button>
        </div>
    );
};

export default RandomReview;
