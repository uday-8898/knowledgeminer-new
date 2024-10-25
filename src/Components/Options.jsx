import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import img1 from '../assets/docs.svg';
import img2 from '../assets/pdf-scan.svg';
import img3 from '../assets/pdf-stand.svg';
import bgg from '../assets/bgg2.png';
import img4 from '../assets/csv.svg'
// import gif1 from '../assets/pdf1.gif'
// import gif2 from '../assets/pdf2.gif'
// import gif3 from '../assets/docss.gif'


function Options() {
    // State to hold the selected file type
    const [fileType, setFileType] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    

    // Function to handle file type selection and navigation
    const handleFileTypeSelect = (type) => {
        setFileType(type);
        console.log(`Selected file type: ${type}`); // You can log it or handle it as needed

        // Navigate to DragUpload and pass fileType as state
        navigate('/uploads', { state: { fileType: type } });
    };

    return (
        <div className=" h-screen bg-cover bg-center z-0" style={{ backgroundImage: `url(${bgg}) ` , marginTop: '-2.5rem'}}>
            <div className="flex justify-center mt-10 text-center z-0"> {/* Added z-10 for text visibility */}
                <div>
                    <h1 className="text-5xl font-bold text-indigo-500 mx-auto mt-6">
                        DataDiscover: Unlock Answers from Your PDFs
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-600 mx-auto mt-4">
                        Uncover hidden insights instantly with cutting-edge knowledge mining tools
                    </h2>
                </div>
            </div>
            <div className="flex justify-center mt-12 text-center flex-wrap "> {/* Added z-10 for text visibility */}

                {/* Card 1 */}
                <div className="animate__animated animate__bounce bg-white rounded-2xl border border-gray-200 shadow-lg transition-all duration-150 hover:shadow-xl m-4" style={{ width: '15rem' }}>
                    <div className="mt-3 mx-auto w-5/6 bg-[#F0EEF8] rounded-2xl h-36 flex items-center justify-center">
                        <img
                            src={img2}
                            className="h-24 w-24 transition-transform duration-400 hover:scale-125"
                            alt="..."
                        />
                    </div>
                    <div className="p-4">
                        <div className='mb-6'>
                            <h5 className="text-xl font-bold text-gray-900 mb-3">Scanned PDF</h5>
                            <p className="text-sm text-gray-600 mb-4">Click here to upload the Scanned PDF</p>
                        </div>
                        <div className='w-full mb-4'>
                            <button
                                className="bg-[#EEECF7] text-[#5535F0] font-bold rounded-full py-2 px-16 w-full transition-all duration-200 hover:bg-[#441CFF] focus:bg-[#441CFF] focus:outline-none hover:text-white"
                                onClick={() => handleFileTypeSelect('scanned_pdf')} // Set file type on click
                            >
                                Try now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="animate__animated animate__bounce bg-white rounded-2xl border border-gray-200 shadow-lg transition-all duration-150 hover:shadow-xl m-4" style={{ width: '15rem' }}>
                    <div className="mt-3 mx-auto w-5/6 bg-[#F0EEF8] rounded-2xl h-36 flex items-center justify-center">
                        <img
                            src={img1}
                            className="h-24 w-24 transition-transform duration-400 hover:scale-125"
                            alt="..."
                        />
                    </div>
                    <div className="p-4">
                        <div className='mb-6'>
                            <h5 className="text-xl font-bold text-gray-900 mb-3">DOC File</h5>
                            <p className="text-sm text-gray-600 mb-4">Click here to upload the Word Document</p>
                        </div>
                        <div className='w-full mb-4'>
                            <button
                                className="bg-[#EEECF7] text-[#5535F0] font-bold rounded-full py-2 px-16 w-full transition-all duration-200 hover:bg-[#441CFF] focus:bg-[#441CFF] focus:outline-none hover:text-white"
                                onClick={() => handleFileTypeSelect('word_files')} // Set file type on click
                            >
                                Try now
                            </button>
                        </div>
                    </div>
                </div>


                <div className="animate__animated animate__bounce bg-white rounded-2xl border border-gray-200 shadow-lg transition-all duration-150 hover:shadow-xl m-4" style={{ width: '15rem' }}>
                    <div className="mt-3 mx-auto w-5/6 bg-[#F0EEF8] rounded-2xl h-36 flex items-center justify-center">
                        <img
                            src={img3}
                            className="h-24 w-24 transition-transform duration-400 hover:scale-125"
                            alt="..."
                        />
                    </div>
                    <div className="p-4">
                        <div className='mb-6'>
                            <h5 className="text-xl font-bold text-gray-900 mb-3">Standard PDF</h5>
                            <p className="text-sm text-gray-600 mb-4">Click here to upload the Standard PDF</p>
                        </div>
                        <div className='w-full mb-4'>
                            <button
                                className="bg-[#EEECF7] text-[#5535F0] font-bold rounded-full py-2 px-16 w-full transition-all duration-200 hover:bg-[#441CFF] focus:bg-[#441CFF] focus:outline-none hover:text-white"
                                onClick={() => handleFileTypeSelect('standard_pdf')} // Set file type on click
                            >
                                Try now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="animate__animated animate__bounce bg-white rounded-2xl border border-gray-200 shadow-lg transition-all duration-150 hover:shadow-xl m-4" style={{ width: '15rem' }}>
                    <div className="mt-3 mx-auto w-5/6 bg-[#F0EEF8] rounded-2xl h-36 flex items-center justify-center">
                        <img
                            src={img4}
                            className="h-24 w-24 transition-transform duration-400 hover:scale-125"
                            alt="..."
                        />
                    </div>
                    <div className="p-4">
                        <div className='mb-6'>
                            <h5 className="text-xl font-bold text-gray-900 mb-3">CSV File</h5>
                            <p className="text-sm text-gray-600 mb-4">Click here to upload the CSV file Document</p>
                        </div>
                        <div className='w-full mb-4'>
                            <button
                                className="bg-[#EEECF7] text-[#5535F0] font-bold rounded-full py-2 px-16 w-full transition-all duration-200 hover:bg-[#441CFF] focus:bg-[#441CFF] focus:outline-none hover:text-white"
                                onClick={() => handleFileTypeSelect('csv_files')} // Set file type on click
                            >
                                Try now
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Options;
