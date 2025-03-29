import React, { useEffect, useState } from 'react';
import { LoaderCircle, MessageSquare } from 'lucide-react';

// Mock data and utility functions since we can't import the original
const menuItemsTop = [
  { label: 'Dashboard', icon: 'Home', link: '/dashboard' },
  { label: 'Chats', icon: 'MessageSquare', link: '/chats' }
];

const menuItemsBottom = [
  { label: 'Settings', icon: 'Settings', link: '/settings' },
  { label: 'Logout', icon: 'LogOut', link: '/logout' }
];

const businessMenuItemsTop = [
  { label: 'Business Dashboard', icon: 'Home', link: '/business/dashboard' },
  { label: 'Business Chats', icon: 'MessageSquare', link: '/business/chats' }
];

const businessMenuItemsBottom = [
  { label: 'Business Settings', icon: 'Settings', link: '/business/settings' },
  { label: 'Logout', icon: 'LogOut', link: '/logout' }
];

// Mock components to replace imported components
const Header = ({ activeMenu, breadcrumbItems, searchPlaceholder }) => (
  <header className="p-4 bg-white shadow">
    <div className="flex justify-between items-center">
      <div>
        {breadcrumbItems.map((item, index) => (
          <span key={index} className="text-sm text-gray-600 mr-2">
            {item.label}
          </span>
        ))}
      </div>
      <input 
        type="text" 
        placeholder={searchPlaceholder} 
        className="border px-2 py-1 rounded"
      />
    </div>
  </header>
);

const SidebarMenu = ({ active }) => (
  <div className="w-64 bg-gray-100 p-4">
    <nav>
      <div className="mb-4">
        {menuItemsTop.map((item) => (
          <div 
            key={item.label} 
            className={`py-2 ${active === item.label ? 'bg-blue-100' : ''}`}
          >
            {item.label}
          </div>
        ))}
      </div>
    </nav>
  </div>
);

const ChatList = ({ conversations, setConversation, active }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-lg font-semibold mb-4">Conversations</h2>
    {conversations.map((conversation) => (
      <div 
        key={conversation.id} 
        onClick={() => setConversation(conversation)}
        className={`p-2 cursor-pointer ${active?.id === conversation.id ? 'bg-blue-100' : ''}`}
      >
        {conversation.participants.join(', ')}
      </div>
    ))}
  </div>
);

const CardsChat = ({ conversation }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-lg font-semibold">Chat with {conversation.participants.join(', ')}</h2>
    {conversation.lastMessage && (
      <p className="text-gray-600">{conversation.lastMessage}</p>
    )}
  </div>
);

// Mock subscribe function
const subscribeToUserConversations = (collection, userId, callback) => {
  // Simulated conversations data
  const mockConversations = [
    { 
      id: '1', 
      participants: ['John Doe', 'Jane Smith'], 
      lastMessage: 'Hello there!' 
    },
    { 
      id: '2', 
      participants: ['Alice Johnson', 'Bob Williams'], 
      lastMessage: 'Meeting tomorrow?' 
    }
  ];

  // Simulate async data fetch
  setTimeout(() => {
    callback(mockConversations);
  }, 1000);

  // Return an unsubscribe function
  return () => {};
};

const HomePage = () => {
  // Mock user state
  const user = {
    uid: 'user123',
    type: 'freelancer'
  };

  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    const fetchConversations = async () => {
      setLoading(true);
      unsubscribe = await subscribeToUserConversations(
        'conversations',
        user.uid,
        (data) => {
          setConversations(data);
          setLoading(false);
          if (data.length > 0) {
            setActiveConversation(data[0]);
          }
        }
      );
    };

    fetchConversations();

    // Cleanup on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user.uid]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <SidebarMenu
        menuItemsTop={user.type === 'business' ? businessMenuItemsTop : menuItemsTop}
        active="Chats"
      />
      <div className="flex flex-col mb-8 sm:gap-8 sm:py-0 sm:pl-14">
        <Header
          activeMenu="Chats"
          breadcrumbItems={[
            { label: 'Freelancer', link: '/dashboard/freelancer' },
            { label: 'Chats', link: '/dashboard/chats' }
          ]}
          searchPlaceholder="Search..."
        />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4 lg:grid-cols-3 xl:grid-cols-3">
          {loading ? (
            <div className="col-span-3 flex justify-center items-center p-5">
              <LoaderCircle className="h-6 w-6 text-blue-500 animate-spin" />
            </div>
          ) : conversations.length > 0 ? (
            <>
              <ChatList
                conversations={conversations}
                active={activeConversation}
                setConversation={setActiveConversation}
              />
              <CardsChat conversation={activeConversation} />
            </>
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center h-full px-4 py-16 text-center text-gray-500">
              <MessageSquare className="w-10 h-10 mb-2" />
              <p className="text-lg font-medium">No conversations found</p>
              <p className="text-sm">
                Start a new chat or wait for others to connect!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;