import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

function ChatInterface() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [lastMessage, setLastMessage] = useState("");
  const autoscroll = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (autoscroll.current) {
      autoscroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchLastMessage = () => {
    axios
      .get("http://127.0.0.1:5000/getmessages")
      .then((response) => {
        const messages = response.data.messages;
        if (messages.length > 0) {
          setLastMessage(messages[messages.length - 1].message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchLastMessage();
  }, []);

  const handleGenerate = () => {
    console.log("Sending message:", inputText);
    axios
      .post("http://127.0.0.1:5000/api/messages", { message: inputText })
      .then((response) => {
        console.log("Response:", response.data);
        setMessages([
          ...messages,
          { text: inputText, sender: "You" },
          { text: inputText, sender: "Chat" },
        ]);
        setInputText("");
        fetchLastMessage();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col items-center py-6 bg-gradient-to-b from-blue-200 to-purple-400 h-[800px]">
      <ScrollArea className="w-2/3 h-[600px] overflow-y: scroll rounded-lg shadow-lg border-3 border-purple-300 mb-6 shadow-purple-light">
        <div className="p-4">
          {messages.map(({ text, sender }, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              {sender === "You" ? (
                <>
                  <div
                    className={`px-4 py-2 rounded-lg bg-blue-200 text-blue-700`}
                  >
                    {text}
                  </div>
                  <div
                    className={`flex items-center justify-center rounded-full text-white w-8 h-8 ml-3 bg-blue-600 p-5`}
                  >
                    {sender}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`flex items-center justify-center rounded-full text-white w-8 h-8 mr-3 bg-orange-600 p-5`}
                  >
                    {sender}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg bg-orange-200 text-orange-700`}
                  >
                    {text}
                  </div>
                </>
              )}
            </div>
          ))}
          <div ref={autoscroll} />
        </div>
      </ScrollArea>

      <div className="flex w-2/3 items-center  shadow-lg border border-purple-400 rounded-lg p-4 mt-0">
        <Input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleGenerate();
            }
          }}
        />
        <Button
          className="ml-4 px-6 py-2 text-white bg-blue-600 hover:bg-purple-700 rounded-lg"
          onClick={handleGenerate}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default ChatInterface;
