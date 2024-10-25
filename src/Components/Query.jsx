import React, { useState, useEffect , useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import bot from '../assets/bot.gif';
import { IoSend } from "react-icons/io5";
import loader from '../assets/loaderbg.gif';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/profile.gif';
import { MdDelete } from "react-icons/md";
import dot from '../assets/dot.png'

function Query() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDb: initialSelectedDb, databases } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadinghistory, setloadinghistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedDb, setSelectedDb] = useState(initialSelectedDb || null);
  const [messagesByDb, setMessagesByDb] = useState({});
  const [historyByDb, setHistoryByDb] = useState({});
  const [citationDict, setCitationDict] = useState([]); // New state for citation_dict
  const [citationHistory, setCitationHistory] = useState([]);
  const [showCitations, setShowCitations] = useState({});
  const [dummyState, setDummyState] = useState(0); // Add a dummy state
  const [pdfUrl, setPdfUrl] = useState(null); // For the selected PDF URL
  const [showPdfViewer, setShowPdfViewer] = useState(false); // To control PDF viewer visibility
  const lastMessageRef = useRef(null);
  const iframeRef = useRef(null);

  
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

  function dotClick() {
    navigate("/tools")
  }

  const userEmail = getUserEmail();

  const fetchUserId = async (userEmail) => {
    try {
      const formData = new FormData();
      formData.append('userEmail', userEmail);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/fetch_id`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.user_id;
    } catch (error) {
      throw error.response.data;
    }
  };

  const toggleCitations = (index) => {
    setShowCitations((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the visibility for the specific index
    }));
  };

  const fetchDatabaseHistory = async (database) => {
    setloadinghistory(true); // Start loading
    try {
      const fetchedUserId = await fetchUserId(userEmail);
      const payload = { database, user_id: fetchedUserId };
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat/history`, payload);
      console.log('historyyy', response)

      if (Array.isArray(response.data)) {
        const allCitations = []; // Array to collect citations as an array of arrays
        response.data.forEach((item) => {
          if (item.answer && item.answer.citation_dict) {
            allCitations.push(item.answer.citation_dict); // Add the citation_dict array to allCitations
          } else {
            allCitations.push([]); // If no citation_dict, add an empty array to maintain the structure
          }
        });
        setCitationHistory(allCitations);
        console.log('All Citations (Array of Arrays):', allCitations);

      } else {
        console.error("The data is not an array or is undefined.");
      }
      // console.log('Citations',citationHistory )

      setHistoryByDb(prevHistory => ({
        ...prevHistory,
        [database]: response.data
      }));

      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching database history:', error);
    } finally {
      setloadinghistory(false); // Stop loading
    }
  };

  useEffect(() => {
    console.log('Updated citationHistory:', citationHistory);
  }, [citationHistory]);


  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [historyByDb]);
  

  // const handleCitationClick = (citation) => {
  //   setPdfUrl(citation.file_link);
  //   setShowPdfViewer(true);
  // };

  const handleCitationClick = (citation) => {
    // Set the PDF URL and open the viewer
    setPdfUrl(`${citation.file_link}#page=${citation.page_numbers}`);
    setShowPdfViewer(true);
};


  const clearChat = () => {
    console.log('Before clear:', messages, messagesByDb);
    setMessages([]);
    setHistory([]);

    if (selectedDb) {
      setMessagesByDb(prevMessages => ({
        ...prevMessages,
        [selectedDb]: [] // Clear messages for the selected database
      }));
    }
    console.log('After clear:', messages, messagesByDb);
    setDummyState(prev => prev + 1); // Increment dummy state
  };

  const handleDbClick = async (db) => {
    setSelectedDb(db);
    navigate('/query', { state: { selectedDb: db, databases } });
    setMessages(messagesByDb[db] || []);
    await fetchDatabaseHistory(db);
  };

  useEffect(() => {
    if (selectedDb) {
      fetchDatabaseHistory(selectedDb);
    }
  }, [selectedDb]);

  const handleSendMessage = async () => {
    if (!input) return;
    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);
    setMessagesByDb(prevMessages => ({
      ...prevMessages,
      [selectedDb]: [...(prevMessages[selectedDb] || []), newMessage]
    }));
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/query`, {
        query: input,
        database: selectedDb,
        email: userEmail
      });
      console.log(response)
      const botResponseText = response.data.bot_answer;
      const botResponse = { text: botResponseText, sender: 'bot' };
      const citt = response.data.citation_dict; // Assuming this is the citation_dict returned
      // console.log('citt', citt);

      setCitationDict(citt);
      console.log('hello', citationDict);
      setMessages(prevMessages => [...prevMessages, botResponse]);

      setMessagesByDb(prevMessages => ({
        ...prevMessages,
        [selectedDb]: [...(prevMessages[selectedDb] || []), botResponse]
      }));

    } catch (error) {
      console.error('Error querying database:', error);
      const errorMessage = { text: 'Failed to get a response from the server.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 flex-shrink-0 bg-white shadow-lg ">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl text-indigo-800">DataDiscover</div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Available Databases</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {databases ? databases.length : 0}
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-auto overflow-y-auto px-2" style={{ maxHeight: '78vh' }}>
              {databases && databases.map((db, index) => (
                <button
                  key={index}
                  onClick={() => handleDbClick(db)}
                  className={`flex flex-row items-center rounded-xl p-2 ${selectedDb === db ? 'bg-indigo-300' : 'hover:bg-gray-100'}`}

                >
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    {db.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-2 text-sm font-semibold">{db}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-auto h-full py-2 px-4">
          <div className='flex justify-between items-center rounded-md py-2'>
            <div className='bg-gray-500 text-white p-2 rounded-md'>
              {userEmail}
            </div>
            <div className='flex'>
              <button className='px-2' onClick={dotClick}>
                <img src={dot} className="w-9 h-9 " />
              </button>
              <button className='flex items-center p-2 bg-gray-500 text-white rounded-md hover:bg-gray-700' onClick={clearChat}>
                <MdDelete className='mr-1' />
                Clear Chat
              </button>
            </div>
          </div>
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-[87vh] ">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid gap-y-2">
                {loadinghistory ? (
                  <div className="flex justify-center items-center h-full">
                    <img src={loader} alt="Loading history..." className="w-10 h-10 m-4" />
                  </div>
                ) : (
                  history.length > 0 && history.map((msg, index) => (
                    <div key={index} className="flex">
                      <div className="">
                        {msg.user_question && (
                          <div className="flex justify-end">
                            <div className="max-w-[70%] col-start-6 col-end-13 p-3 rounded-lg">
                              <div className="flex flex-row-reverse items-center">
                                <img src={profile} alt="User" className="w-10 h-10 rounded-full" />
                                <div className="relative mr-3 bg-indigo-100 text-sm py-2 px-4 shadow rounded-xl">
                                  <div>{msg.user_question}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {msg.answer.bot_answer && (
                          <div className="flex justify-start" ref={index === history.length - 1 ? lastMessageRef : null}>
                            <div className="max-w-[70%] col-start-1 col-end-8 p-3 rounded-lg">
                              <div className="flex items-center">
                                <img src={bot} alt="Bot" className="w-10 h-10 rounded-full" />
                                <div className="relative ml-3 bg-white text-sm py-2 px-4 shadow rounded-xl">
                                  <div>{msg.answer.bot_answer}</div>

                                  {/* Render citations only for bot's messages */}
                                  {citationHistory && citationHistory.length > 0 && citationHistory[index].length > 0 && (
                                    <div className="mt-2 flex flex-col">
                                      <h1 className='font-bold'>Citations:</h1>
                                      {/* <h1>{citationHistory[index]?.length || 0}</h1> */}
                                      <ul className="flex flex-wrap">
                                        {/* Use only the citation array corresponding to the current index */}
                                        {citationHistory[index] && citationHistory[index].length > 0 && (
                                          citationHistory[index].slice(0, showCitations[index] ? 3 : citationHistory[index].length ).map((citation, citationIndex) => (
                                            <li key={citationIndex}>
                                              <button
                                                onClick={() => handleCitationClick(citation)} // Use the handler
                                                rel="noopener noreferrer"
                                                className="flex py-1 px-2 mx-1 my-1 bg-indigo-200 rounded-lg text-indigo-950 mb-2"
                                              >
                                                Page {citation.page_numbers} , Name: {citation.file_name}
                                              </button>
                                            </li>
                                          ))
                                        )}
                                        {/* Show Read More button only if there are more than 3 citations */}
                                        {citationHistory[index]?.length > 3 && (
                                          <button
                                            className="mt-2 text-indigo-600 hover:underline flex"
                                            onClick={() => toggleCitations(index)}
                                          >
                                            {!showCitations[index] ? 'Read Less' : ' Read More'}
                                          </button>
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )))}
                  
                  {messages.length > 0 && messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`} >
                      <div className={`max-w-[70%] col-start-${msg.sender === 'user' ? 6 : 1} col-end-${msg.sender === 'user' ? 13 : 8} p-3 rounded-lg`}>
                        <div className={`flex ${msg.sender === 'user' ? 'flex-row-reverse' : ''} items-center`}>
                          <img src={msg.sender === 'user' ? profile : bot} alt={`${msg.sender} gif`} className="w-10 h-10 rounded-full" />
                          <div className={`relative ${msg.sender === 'user' ? 'mr-3' : 'ml-3'} ${msg.sender === 'user' ? 'bg-indigo-100' : 'bg-white'} text-sm py-2 px-4 shadow rounded-xl`}>

                            <div>{msg.text}</div>
                            {/* Render citations only for bot's messages */}
                            {msg.sender === 'bot' && citationDict.length > 0 && (
                              <div className="mt-2 flex flex-col ">
                                <h2 className="font-bold">Citations:</h2>
                                <ul className=' flex flex-wrap'>
                                  {citationDict.slice(0, showCitations[index] ? citationDict.length : 3).map((citation, index) => (
                                    <li key={index}>
                                      {/* Uncomment to enable link */}
                                      <button
                                        onClick={() => handleCitationClick(citation)} // Use the handler
                                        className='flex py-1 px-2 mx-1 my-1 bg-indigo-200 rounded-lg text-indigo-950 mb-2'>
                                       
                                        Page {citation.page_numbers} , Name: {citation.file_name}
                                      </button>
                                    </li>
                                  ))}
                                  {citationDict.length > 3 && (
                                    <button
                                      className="mt-2 text-indigo-600 hover:underline flex"
                                      onClick={() => toggleCitations(index)}
                                    >
                                      {!showCitations[index] ? 'Read More' : ' Read Less'}
                                    </button>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="max-w-[70%] col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex items-center">
                          <img src={bot} alt="Bot" className="w-10 h-10 rounded-full" />
                          <div className="relative ml-3 bg-white text-sm py-2 px-4 shadow rounded-xl">
                            <img src={loader} alt="Loader" className="w-10 h-10 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4" >
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Enter your message..."
                  />
                </div>
              </div>
              <div className="ml-4">
                <button
                  onClick={handleSendMessage}
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-6 py-2 flex-shrink-0">
                  <span>Send</span>
                  <IoSend className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {pdfUrl && (
          <div className="pdf-container mt-4 pr-2">
            <button className='py-2 w-full bg-red-500 text-white font-semibold form-control rounded-t-xl' onClick={() => setPdfUrl(null)}>Close</button>
            <iframe
              ref={iframeRef}
              src={pdfUrl}
              className='pdf-iframe h-[90%]'
              title='PDF Viewer'
              style={{ width: '500px', border: 'none' }}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

export default Query;

