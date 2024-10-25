import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import img1 from '../assets/image.png'; // Ensure this path is correct
import img2 from '../assets/meridian_logo.png';
import { FaHome, FaDatabase } from "react-icons/fa"; // Correct import for FaHome and FaDatabase
import { IoPersonSharp } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import SignOutButton from './SignOutButton'; // Import the SignOutButton component\
import axios from 'axios';
import ShowDb from './ShowDb';

const Navbar = () => {

    const [databases, setDatabases] = useState([]); // State to hold the databases
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling
    console.log("Session Storage Content:", sessionStorage);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);


    // Function to get the user's email from session storage
    function getUserEmail() {
        // Retrieve all keys in session storage
        const keys = Object.keys(sessionStorage);

        // Loop through each key to find the relevant data
        for (const key of keys) {
            // Check if the key indicates it may contain user info, particularly the name
            if (key.includes('login.windows.net')) { // or any other relevant keyword
                // Parse the JSON string to get the data object
                const data = JSON.parse(sessionStorage.getItem(key));
                // Check if the data object contains a name field
                if (data && data.username) {
                    return data.username; // Return the user's name
                }
            }
        }
        return null; // Return null if no name is found
    }

    // Usage
    const userEmail = getUserEmail();
    if (userEmail) {
        console.log(`User's email: ${userEmail}`);
    } else {
        console.log("Email not found in session storage.");
    }

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };


    // Function to get the user's name from session storage
    function getUserName() {
        // Retrieve all keys in session storage
        const keys = Object.keys(sessionStorage);

        // Loop through each key to find the relevant data
        for (const key of keys) {
            // Check if the key indicates it may contain user info, particularly the name
            if (key.includes('login.windows.net')) { // or any other relevant keyword
                // Parse the JSON string to get the data object
                const data = JSON.parse(sessionStorage.getItem(key));
                // Check if the data object contains a name field
                if (data && data.name) {
                    return data.name; // Return the user's name
                }
            }
        }
        return null; // Return null if no name is found
    }

    // Usage
    const userName = getUserName();
    if (userName) {
        console.log(`User's name: ${userName}`);
    } else {
        console.log("Name not found in session storage.");
    }



    const fetchDatabases = async () => {
        const email = getUserEmail(); // Get user email
        if (!email) {
            console.log("User email not found.");
            return;
        }

        try {
            setLoading(true); // Set loading state to true
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/databases`,
                { email }
            );
            //const fetchedUserId = await fetchUserId(email);
            // console.log(fetchedUserId);
            console.log("response krao", response)

            setDatabases(response.data.databases); // Set the fetched databases in state
            // console.log("Fetched databases:", response.data.databases); // Log the databases to console
        } catch (err) {
            setError(err); // Set error state
            console.error("Error fetching databases:", err); // Log the error
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    // Fetch databases when the component mounts
    useEffect(() => {
        fetchDatabases(); // Call the fetch function
    }, []);

    const handleDatabasesClick = () => {
        setIsModalOpen(true); // Open the modal when databases are clicked
    };


    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <body className="bg-gray-800"> {/* Dark background color */}
            <nav className="relative px-2 py-2 flex justify-between items-center bg-white shadow-md" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;' }}> {/* Lighter navbar background with custom shadow */}
                <Link to="/" className="text-3xl font-bold leading-none"> {/* Use Link for navigation */}
                    <img src={img2} alt="Company Logo" className="h-10 mx-4" /> {/* Adjust height as needed */}
                </Link>
                <ul className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-lg shadow-md transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'} lg:flex lg:static lg:bg-transparent lg:shadow-none lg:transform lg:translate-x-0 lg:translate-y-0`}>
                    <li className="flex items-center p-4">
                        <Link to="/tools" className="flex items-center text-black hover:text-indigo-500 relative group transition-transform transform hover:scale-105"> {/* Scale on hover */}
                            <span className="invisible group-hover:visible transition-opacity duration-300 ease-in-out"> {/* Use invisible by default */}
                                <FaHome className="mr-2" />
                            </span>
                            <span className="transition duration-300 ease-in-out"><b>Tools</b></span>
                        </Link>
                    </li> {/* Home link */}
                    <li className="flex items-center p-4">
                        <button onClick={handleDatabasesClick} className="flex items-center text-black hover:text-indigo-500 relative group transition-transform transform hover:scale-105">
                            <span className="invisible group-hover:visible transition-opacity duration-300 ease-in-out">
                                <FaDatabase className="mr-2" />
                            </span>
                            <span className="transition duration-300 ease-in-out"><b>Databases</b></span>
                        </button>
                    </li> {/* About Us link */}
                    <li className="relative flex items-center p-4 z-50  " >
                        
                        <button onClick={toggleProfileDropdown} className="flex items-center text-black hover:text-indigo-500 relative group transition-transform transform hover:scale-105">
                        <span className="invisible group-hover:visible transition-opacity duration-300 ease-in-out">
                            <IoPersonSharp className="mr-2" />
                        </span>
                            <b>Profile</b>
                        </button>
                        {isProfileDropdownOpen && (
                            <div className="absolute top-12 right-4 bg-gray-300 shadow-md rounded-md p-2 max-w-sm z-10  border-b-4 border-black" style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.5) 0px 8px 16px -8px;'}}>
                                <div className="px-4 py-3">
                                    <span className="block text-md font-bold">{userName}</span>
                                    <span className="block text-sm font-medium text-gray-600 truncate">{userEmail}</span>
                                </div>
                                <hr/>
                                <ul className="py-2">
                                    <li className='cursor-pointer group'>
                                        <Link to="/billing"  className="block p-2 border-transparent border-l-4 group-hover:border-black group-hover:bg-gray-100">Billing</Link>
                                    </li>
                                    <li className='cursor-pointer group border-t'>
                                        <Link to="#" className="block p-2 border-transparent border-l-4 group-hover:border-black group-hover:bg-gray-100">Databases Created : {databases.length}</Link>
                                    </li>
                                    <hr/>
                                    <li>
                                    <SignOutButton /> {/* Use SignOutButton component for logout */}
                                    </li>

                                </ul>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
            <ShowDb isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} databases={databases} />

        </body>
    );
};

export default Navbar;
