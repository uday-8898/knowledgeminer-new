import React, { useState, useRef } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { IoSend } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import Navbar from "./Navbar";
import img1 from '../assets/modal.jpg'
import Loader from '../assets/chatloader.gif'


const DragUpload = () => {
  const location = useLocation();
  const { fileType } = location.state || {}; // Get fileType from the location state
  let typee = 'hello'; // Use let instead of const

  // Determine typee based on fileType
  if (fileType === 'scanned_pdf') {
    typee = 'Scanned Pdf';
  } else if (fileType === 'standard_pdf') {
    typee = 'Standard Pdf';
  } else if (fileType === 'word_files') {
    typee = 'Word Document';
  }else if (fileType === 'csv_files') {
    typee = 'CSV File';
  }

  const [fileName, setFileName] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // To store selected files
  const [folderName, setFolderName] = useState(""); // State to store the folder name
  const fileInputRef = useRef(null);
  const [isLoading, setLoading] = useState(false)

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) {
      toast.error("Folder does not contain any files");
      return;
    }

    setFileName(files[0].name);
    setSelectedFiles(files);
    setIsFileUploaded(true);

    // Extract the folder name from the first file's webkitRelativePath
    const firstFilePath = files[0].webkitRelativePath;

    if (firstFilePath) {
      // Assuming the folder name is the first directory in the relative path
      const extractedFolderName = firstFilePath.split("/")[0];
      setFolderName(extractedFolderName);
      console.log("Uploaded Folder Name:", extractedFolderName); // Log the folder name
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  function getUserEmail() {
    const keys = Object.keys(sessionStorage);
    for (const key of keys) {
      if (key.includes('login.windows.net')) {
        const data = JSON.parse(sessionStorage.getItem(key));
        if (data && data.username) {
          return data.username;
        }
      }
    }
    return null;
  }

  const userEmail = getUserEmail();

  // Function to create the database
  const createDatabase = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please upload files before creating the database");
      return;
    }

    // if (fileType !== 'application/pdf') {
    //   console.log("continuing")
    //   return;
    // }

    if (!userEmail) {
      toast.error("User email not found. Please make sure you are logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("folder_name", folderName);
    formData.append("email", userEmail);
    formData.append("file_type", fileType);

    for (const filee of selectedFiles) {
      try {
        const response = await fetch(filee.url);
        if (!response.ok) {
          throw new Error(`Error fetching file: ${filee.url}`);
        }
        const blob = await response.blob();
        //formData.append("files", blob, filee.name);
        formData.append("files", filee, filee.name);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error(`Error fetching file: ${filee.name}`);
        return;
      }
    }
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/database/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === 'Database not created') {
        toast.error(`Error: ${response.data.message}`);
      } else {
        toast.success("Database created successfully!");
        console.log("Response:", response.data);
      }

      setFileName("");
      setIsFileUploaded(false);
      setSelectedFiles([]);
      setFolderName("");
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        toast.error(`Backend Error: ${error.response.data.message || error.message}`);
      } else if (error.request) {
        console.error("No response from backend:", error.request);
        toast.error("No response from backend. Please try again later.");
      } else {
        console.error("Error:", error.message);
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false)
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen" style={{
        backgroundImage: `url(${img1})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // boxShadow: 'rgba(255, 255, 255, 0.35) 0px 5px 15px'
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
      }}>
        <div className="border-2 border-dashed border-gray-300 rounded-lg py-2 px-6 w-full max-w-4xl bg-white flex flex-col justify-between mt-[-3rem]">
          <div className="flex justify-center items-center">
            <dotlottie-player
              src="https://lottie.host/55303a12-e063-4de6-a38d-385e2adfa95b/2JcNMOv1PX.json"
              background="transparent"
              border="2px solid black"
              speed="1"
              loop
              autoplay
              style={{ width: '40%', height: '40%', margin: '-3rem' }}
            />
          </div>
          <div className="text-center mb-4">
            <h1 className="text-3xl font-semibold mb-2">Chat With Your Data</h1>
            <p className="text-1xl text-gray-600 mb-1">Upload Your Data or Try Existing Database</p>
            <p className="text-md text-gray-500 mb-1">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
            </p>
          </div>

          {fileName && (
            <div className="text-center mb-2">
              <p className="text-md text-indigo-500">Selected File: {fileName}</p>
            </div>
          )}
          <div className="flex justify-end space-x-4 mb-1">
            <button
              className="flex items-center bg-gray-100 border border-gray-300 rounded px-4 py-2 text-sm">
              {typee}
            </button>
            <div className="">
              <input
                type="file"
                webkitdirectory="true"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
                multiple
              />
              {isFileUploaded ? (
                <button
                  onClick={createDatabase}
                  className="flex items-center bg-indigo-600 text-white rounded px-4 py-2 text-sm hover:bg-indigo-500">
                  <span>Create Database</span>
                  <span className="ml-2 text-lg font-bold"><IoSend /></span>
                </button>
              ) : (
                <button
                  onClick={handleUploadClick}
                  className="flex items-center bg-indigo-600 text-white rounded px-4 py-2 text-sm hover:bg-indigo-500">
                  <span>Upload Database</span>
                  <span className="ml-2 text-lg font-bold"><IoSend /></span>
                </button>
              )}
            </div>
          </div>

        </div>
        <ToastContainer />

        {isLoading && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
              <div className="bg-white rounded-full">
              <img src={Loader} alt="Loader" className="w-40 h-40 rounded-full" />
              </div>
          </div>

        )}

      </div>
    </div>
  );
};

export default DragUpload;