import { useState, useEffect } from 'react';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(0);

  useEffect(() => {
    const storedMessages = localStorage.getItem(`conversation_${currentConversation}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [currentConversation]);

  useEffect(() => {
    localStorage.setItem(`conversation_${currentConversation}`, JSON.stringify(messages));
  }, [currentConversation, messages]);

  const conversations = [
    [
      { text: "Hi there!", sender: 'user' },
      { text: "Hello! How can I assist you today?", sender: 'ChatBot' },
      { text: "I'm having trouble with my computer.", sender: 'user' },
      { text: "I can help with that. What seems to be the issue?", sender: 'ChatBot' }
    ],
    [
      { text: "Hi!", sender: 'user' },
      { text: "Hey, what's up?", sender: 'ChatBot' },
      { text: "Not much, just chilling.", sender: 'user' },
      { text: "Cool. Anything I can help with?", sender: 'ChatBot' }
    ]
  ];

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = { text: inputText, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleConversationChange = (conversationIndex) => {
    setCurrentConversation(conversationIndex);
    setIsMenuOpen(false); // Close the sidebar on mobile when conversation changes
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Hamburger menu for mobile */}
      <div className="md:hidden">
        <button
          className="p-4 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6H20V5H4V6ZM4 11H20V10H4V11ZM4 16H20V15H4V16Z"
              />
            )}
          </svg>
        </button>
      </div>
      {/* Sidebar with conversation list */}
      <div
        className={`w-max bg-gray-800 border-2 border-gray-900 md:block ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="p-4 w-full border-b border-gray-700">ChatBot</div>
        <ul className="p-4 w-max">
          <li onClick={() => handleConversationChange(0)} className={`cursor-pointer ${currentConversation === 0 ? 'font-bold' : ''}`}>Conversation 1</li>
          <li onClick={() => handleConversationChange(1)} className={`cursor-pointer ${currentConversation === 1 ? 'font-bold' : ''}`}>Conversation 2</li>
        </ul>
      </div>
      {/* Main chat area */}
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-center bg-gray-700 py-4 border-b border-gray-800">
          {/* Add your name or username here */}
          <span className="text-lg font-bold">ChatBot</span>
        </div>
        <div className="flex-1 bg-gray-800 p-4 overflow-y-auto">
          {conversations[currentConversation].map((message, index) => (
            <div
              key={index}
              className={`rounded-lg p-2 mb-2 ${
                message.sender === 'user' ? 'bg-blue-900 self-start' : 'bg-green-900 self-end'
              }`}
            >
              {message.text}
            </div>
          ))}
          {messages.map((message, index) => (
            <div
              key={index + conversations[currentConversation].length}
              className={`rounded-lg p-2 mb-2 ${
                message.sender === 'user' ? 'bg-blue-900 self-start' : 'bg-green-900 self-end'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="bg-gray-800 p-4 border-t border-gray-700 flex">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write your message..."
            className="w-full border border-gray-700 rounded-md py-2 px-4 bg-gray-900 text-white focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white rounded-md py-2 px-4 ml-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
