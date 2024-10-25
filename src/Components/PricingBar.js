import React, { useState } from 'react';
import { Container, Title, CardsContainer, Card, SliderContainer, Slider, CardImage, CardContent, TotalDetails, IncrementButton, DecrementButton } from './PricingBarStyles';
import nousers from '../assets/nousers.gif';
import noqueries from '../assets/noqueries.gif';

// Define constants
// let PRICE_PER_USER = 50;
const MAX_PAGES = 5000000;
const per_query=0.01;


const PricingBar = () => {
    const [numUsers, setNumUsers] = useState(50);
    const [numPages, setNumPages] = useState(500);
    const calculateTotalPrice = () => {

        let total = numUsers * numPages * per_query  ;
        return total.toFixed(2);
    };

    // Handle slider change
    const handleSliderChange = (setter, step, maxValue) => (event) => {
        const value = parseInt(event.target.value, 10) * step;
        setter(Math.min(maxValue, value));
    };

    // Handle increment
    const handleIncrement = (setter, value, step, maxValue) => () => {
        setter(Math.min(maxValue, value + step));
    };

    // Handle decrement
    const handleDecrement = (setter, value, step, minValue) => () => {
        setter(Math.max(minValue, value - step));
    };

    return (
        <Container id='pricing'>
            <Title>Pricing Overview</Title>
            <CardsContainer>
                {/* Card 1: Number of Users */}
                <Card>
    <CardImage src={nousers} alt="Users" />
    <CardContent>
        <h3>Number of Users</h3>
        <SliderContainer>
            <Slider
                type="range"
                min="50" // Start at 50
                max="400" // Slider corresponds to 10,000 users (400 * 25)
                step="2"  // Steps for each 50-user increment (50 / 25 = 2)
                value={Math.ceil(numUsers / 25)} // Convert numUsers to slider value
                onChange={handleSliderChange(setNumUsers, 25, 10000)} // Slider changes in steps of 50
            />
            <div>{numUsers} users</div> {/* Now displays numUsers directly */}
        </SliderContainer>
        
        {/* Increment / Decrement Buttons */}
        <div className="button-group">
            <DecrementButton onClick={handleDecrement(setNumUsers, numUsers, 50, 50)}>−</DecrementButton>
            <IncrementButton onClick={handleIncrement(setNumUsers, numUsers, 50, 10000)}>+</IncrementButton>
        </div>
    </CardContent>
</Card>


                {/* Card 2: Number of Pages */}
                <Card>
    <CardImage src={noqueries} alt="queries" />
    <CardContent>
        <h3>Per User Queries</h3>
        <SliderContainer>
            <Slider
                type="range"
                min="5" // Start at 5 (500 / 100)
                max="150" // Slider corresponds to 15,000 pages (150 * 100)
                step="1" // Each step equals 100 pages (because of 100 multiplier)
                value={Math.ceil(numPages / 100)} // Convert numPages to slider value (500 -> 5, 600 -> 6, etc.)
                onChange={handleSliderChange(setNumPages, 100, MAX_PAGES)} // Adjust by 100 increments
            />
            <div>{numPages} Queries</div> {/* Display numPages directly */}
        </SliderContainer>
        
        {/* Increment / Decrement Buttons */}
        <div className="button-group">
            <DecrementButton onClick={handleDecrement(setNumPages, numPages, 100, 500)}>−</DecrementButton>
            <IncrementButton onClick={handleIncrement(setNumPages, numPages, 100, MAX_PAGES)}>+</IncrementButton>
        </div>
    </CardContent>
</Card>

            </CardsContainer>
            <TotalDetails>
                <div className="price-info">
                    <span className="label">Total Users :</span>
                    <span className="value">{numUsers === 0 ? 1 : numUsers}</span>
                </div>
                <div className="price-info total">
                    <span className="label">Total Price :</span>
                    <span className="value">${calculateTotalPrice()}</span>
                </div>
            </TotalDetails>
        </Container>
    );
};

export default PricingBar;
