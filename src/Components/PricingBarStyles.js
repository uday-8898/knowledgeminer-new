import styled from 'styled-components';

// Dark Theme Color Palette
const primaryColor = '#1DB954'; // Green accent
const secondaryColor = '#FFFFFF'; // White for text
const backgroundColor = '#121212'; // Dark background
const cardBackground = '#1F1F1F'; // Darker grey for cards
const cardBorderColor = '#333333'; // Border color
const hoverShadowColor = 'rgba(29, 185, 84, 0.4)'; // Accent color shadow

// Container Styles
export const Container = styled.div`
    // max-width: 1200px;
    // margin: 0 auto;
    padding: 20px;
    background-color:#0d0d0d; 
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    // border-radius: 12px;
`;

// Title Styles
export const Title = styled.h2`
    text-align: center;
    margin-bottom: 45px;
    font-size: 2.5em;
    font-weight: bold;
    color: ${secondaryColor};
    background: linear-gradient(45deg, ${primaryColor}, ${secondaryColor});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

// Cards Container Styles
export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
`;

// Card Styles
export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 260px;
    padding: 25px;
    background-color: ${cardBackground};
    border: 1px solid ${cardBorderColor};
    border-radius: 15px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px ${hoverShadowColor};
        background-color: #167ac69e;
        color: ${secondaryColor};
    }
`;

// Card Image Styles
export const CardImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: ${secondaryColor};
    padding: 10px;
`;

// Card Content Styles
export const CardContent = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 20px;
    color: ${secondaryColor}; 
`;

// Slider Styles
export const Slider = styled.input`
    width: 100%;
    background-color: ${cardBorderColor}; 
`;

// Slider Container Styles
export const SliderContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    text-align: center;

    .button-group {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
    }
`;

// Button Styles for + and - buttons
export const IncrementButton = styled.button`
background-color: #1E2348;
    color: #FFFFFF;
    border: 1px solid blue;
    border-radius: 25px;
    width: 40px;
    height: 40px;
    font-size: 1.4em;
    margin: 5px;
    margin-top: 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #14833b;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
`;

export const DecrementButton = styled(IncrementButton)`
    background-color: ${cardBorderColor};

    &:hover {
        background-color: #666;
    }
`;

// Total Details Styles
export const TotalDetails = styled.div`
    font-size: 1.4em;
    font-weight: bold;
    text-align: center;
    color: ${secondaryColor};
    margin-top: 30px;
    background-color: ${cardBackground};
    padding: 20px;
    border-radius: 15px;
    border: 1px solid ${cardBorderColor};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px ${hoverShadowColor};
    }

    h3 {
        margin-bottom: 20px;
        font-size: 1.8em;
        color: ${primaryColor}; 
        text-transform: uppercase;
        letter-spacing: 2px;
        background: linear-gradient(45deg, ${primaryColor}, ${secondaryColor});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .price-info {
        display: flex;
        justify-content: space-between;
        font-size: 1.2em;
        padding: 12px 0;
        border-bottom: 1px solid ${cardBorderColor};

        &:last-child {
            border-bottom: none;
        }

        .label {
            font-weight: normal;
            color: ${secondaryColor};
        }

        .value {
            font-weight: bold;
            color: ${primaryColor};
        }

        &.total {
            font-size: 1.6em;
            color: #ff5252; 
            padding-top: 18px;
            border-top: 2px solid ${primaryColor};
        }
    }
`;
