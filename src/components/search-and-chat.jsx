"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Search, Send, User, Bot } from "lucide-react"

export function SearchAndChat() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Simulate search results
      setSearchResults([
        `Result for "${searchQuery}" - Document 1`,
        `Result for "${searchQuery}" - Document 2`,
        `Result for "${searchQuery}" - Document 3`,
      ])
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
      }

      setMessages([...messages, userMessage])

      // Simulate bot response
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: `I found some documents related to "${newMessage}". Would you like me to analyze them?`,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      }, 1000)

      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-73px)]">
      {/* Search Section */}
      <div className="flex flex-col h-1/2 border-b border-zinc-800">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-medium">Search</h2>
        </div>

        <div className="p-4 bg-zinc-900">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-800 border-zinc-700 focus-visible:ring-blue-300"
            />
            <Button type="submit" size="icon" className="bg-blue-300 text-black hover:bg-blue-400">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-4 space-y-2 max-h-[calc(50vh-130px)] overflow-y-auto">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 cursor-pointer transition-colors"
              >
                {result}
              </div>
            ))}
            {searchQuery && searchResults.length === 0 && (
              <div className="text-center text-zinc-500 py-4">No results found. Try a different search term.</div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col h-1/2">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-medium">Chat</h2>
        </div>

        <div className="flex-1 flex flex-col bg-zinc-900">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-zinc-500">
                <p>Start a conversation about your documents</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`p-1 rounded-full ${
                        message.sender === "user" ? "bg-blue-300 text-black" : "bg-zinc-700"
                      }`}
                    >
                      {message.sender === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === "user" ? "bg-blue-300 text-black" : "bg-zinc-800"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-800 flex gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-zinc-800 border-zinc-700 focus-visible:ring-blue-300"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-blue-300 text-black hover:bg-blue-400"
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}