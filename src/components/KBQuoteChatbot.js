import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const KBQuoteChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello, press the get a quote button to get started!',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const formatMessage = (text) => {
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '|||BREAK|||');

    const lines = formatted.split('|||BREAK|||');
    const processedLines = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('- ')) {
        if (!inList) {
          processedLines.push('<ul style="margin: 6px 0 10px 0; padding-left: 18px; list-style-type: disc;">');
          inList = true;
        }
        const listItem = line.substring(2).trim();
        processedLines.push(`<li style="margin: 3px 0; line-height: 1.4;">${listItem}</li>`);
      } else {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        if (line) {
          processedLines.push(`<p style="margin: 6px 0; line-height: 1.5;">${line}</p>`);
        }
      }
    }

    if (inList) {
      processedLines.push('</ul>');
    }

    return processedLines.join('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOpenChatbot = () => {
      openChat();
    };

    window.addEventListener('openKBChatbot', handleOpenChatbot);
    return () => window.removeEventListener('openKBChatbot', handleOpenChatbot);
  }, []);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://flowise.summitautomation.io/api/v1/prediction/bfb46271-0d71-4945-8c91-51bb562e5744', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: data.text || data.answer || 'Sorry, I could not process your request.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble connecting right now. Please try again later or call us at 724-698-9643.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleStarterPrompt = async (prompt) => {
    const userMessage = {
      id: Date.now().toString(),
      text: prompt,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('https://flowise.summitautomation.io/api/v1/prediction/bfb46271-0d71-4945-8c91-51bb562e5744', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: data.text || data.answer || 'Sorry, I could not process your request.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble connecting right now. Please try again later or call us at 724-698-9643.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setIsVisible(true);
    setShowTooltip(false);
  };

  const closeChat = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Tooltip */}
      {!isVisible && showTooltip && (
        <div 
          className="absolute bottom-16 right-0 mb-2 px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white text-sm rounded-2xl shadow-2xl whitespace-nowrap animate-bounce"
          style={{ fontSize: '14px', fontWeight: '500' }}
        >
          💬 Get your free quote instantly!
          <div className="absolute bottom-[-8px] right-5 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-slate-800"></div>
        </div>
      )}

      {/* Chat Button */}
      {!isVisible && (
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-slate-400 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-slate-500 animate-pulse opacity-30"></div>
          
          <button
            onClick={openChat}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 hover:from-slate-800 hover:via-slate-900 hover:to-black text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group overflow-hidden"
            style={{ 
              width: '65px', 
              height: '65px',
              boxShadow: '0 10px 30px rgba(51, 65, 85, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
            aria-label="Open quote generator"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <MessageCircle className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform duration-200 relative z-10" />
            
            <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse"></div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isVisible && (
        <div 
          className="bg-white rounded-3xl shadow-2xl flex flex-col border-2 border-gray-200/50 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ 
            width: '420px', 
            height: '680px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12), 0 12px 40px rgba(0, 0, 0, 0.08)',
            animation: isOpen ? 'scaleIn 0.3s ease-in-out forwards' : 'scaleOut 0.3s ease-in-out forwards'
          }}
        >
          <style jsx>{`
            @keyframes scaleIn {
              0% {
                transform: scale(0.5) translateY(20px);
                opacity: 0;
              }
              100% {
                transform: scale(1) translateY(0);
                opacity: 1;
              }
            }
            @keyframes scaleOut {
              0% {
                transform: scale(1) translateY(0);
                opacity: 1;
              }
              100% {
                transform: scale(0.5) translateY(20px);
                opacity: 0;
              }
            }
          `}</style>
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-6 flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
            </div>
            
            <div className="flex items-center space-x-4 relative z-10">
              <div className="w-12 h-12 bg-slate-600/20 rounded-2xl flex items-center justify-center border border-slate-400/30">
                <MessageCircle className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <h3 className="font-bold text-lg">KB Quote Generator</h3>
                <p className="text-gray-300 text-sm">Get your free estimate!</p>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="text-gray-400 hover:text-white hover:bg-white/10 rounded-2xl p-2.5 transition-all duration-200 relative z-10"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ backgroundColor: '#fafafa' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md px-4 py-3 rounded-lg leading-relaxed`}
                  style={{
                    fontSize: '16px',
                    backgroundColor: message.isUser ? '#2563eb' : '#ffffff',
                    color: message.isUser ? '#ffffff' : '#1f2937',
                    border: message.isUser ? 'none' : '1px solid #e5e7eb',
                    boxShadow: message.isUser ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(message.text)
                  }}
                />
              </div>
            ))}
            
            {/* Starter Prompt */}
            {messages.length === 1 && !isLoading && (
              <div className="space-y-2">
                <div className="flex justify-start">
                  <button
                    onClick={() => handleStarterPrompt('Get a quote!')}
                    className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg border-2 border-slate-400/20"
                    style={{ 
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    💰 Get a quote!
                  </button>
                </div>
              </div>
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div 
                  className="px-4 py-3 rounded-2xl flex items-center space-x-2"
                  style={{ 
                    backgroundColor: '#ffffff',
                    color: '#1f2937',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-700 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">Calculating your quote...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-5 border-t-2 border-gray-200 bg-white">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your project details..."
                className="flex-1 border-2 border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                style={{
                  fontSize: '15px'
                }}
                disabled={isLoading}
                autoFocus
                maxLength={200}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="rounded-2xl p-3 transition-all duration-200 hover:scale-105 shadow-lg"
                style={{ 
                  backgroundColor: !inputValue.trim() || isLoading ? '#d1d5db' : '#475569',
                  color: 'white'
                }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            {inputValue.length > 180 && (
              <p className="text-xs text-red-500 mt-2 px-1">
                You exceeded the characters limit. Please input less than 200 characters.
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-white text-center border-t border-gray-200">
            <p style={{ fontSize: '11px', color: '#6b7280' }}>
              Powered by{' '}
              <a 
                href="https://summitautomation.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline font-medium"
                style={{ color: '#475569' }}
              >
                Summit Automation
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KBQuoteChatbot;