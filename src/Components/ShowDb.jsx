import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/modal.jpg';
import '../Styles/ShowDb.css';

const ShowDb = ({ isOpen, onClose, databases }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isOpen) {
            setSearchTerm('');
            setLoading(true); // Reset loading state when modal closes
        } else {
            // Simulate fetching databases (replace with actual fetching logic)
            const fetchDatabases = async () => {
                // Simulate a delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
            };

            fetchDatabases();
        }
    }, [isOpen]);

    const handleDbClick = async (db) => {
        try {
            navigate('/query', { state: { selectedDb: db, databases } });
        } catch (error) {
            console.error('Error querying database:', error);
        }
    };

    if (!isOpen) return null;

    const filteredDatabases = databases.filter(db =>
        db.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-5 w-3/4 max-w-3xl h-3/4 flex relative" style={{
                backgroundImage: `url(${img1})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
            }}>
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    <AiOutlineClose size={24} />
                </button>

                <div className="w-1/2 flex items-center justify-center">
                    <dotlottie-player
                        src="https://lottie.host/df37380d-761e-4429-883c-274fd94b4134/LmtWU3WVXP.json"
                        background="transparent"
                        border="2px solid black"
                        speed="1"
                        loop
                        autoplay
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>

                <div className="w-1/2 flex flex-col mt-4 mb-4">
                    <h2 className="text-xl font-bold mb-4 text-center text-indigo-500">Your Databases</h2>

                    <input
                        type="text"
                        placeholder="Search databases..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4 p-2 border border-gray-300 rounded"
                    />
                    <ul className="max-h-[calc(100%_-_4rem)] custom-scrollbar overflow-y-auto flex-1">
                        {loading ? (
                            <li className="text-center py-4 font-bold">Processing...</li>
                        ) : databases.length === 0 ? (
                            <li className="text-center py-4">No databases created</li>
                        ) : filteredDatabases.length > 0 ? (
                            filteredDatabases.map((db, index) => (
                                <li
                                    key={index}
                                    className="py-2 px-2 border-b hover:bg-gray-300 hover:font-bold transition-colors duration-300 cursor-pointer"
                                    onClick={() => handleDbClick(db)}
                                >
                                    {index + 1}. {db}
                                </li>
                            ))
                        ) : (
                            <li className="text-center py-4 font-bold">No matching databases found</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ShowDb;
