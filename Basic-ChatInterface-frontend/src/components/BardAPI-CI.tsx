// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Skeleton } from "@/components/ui/skeleton";

// type Message = {
//   text: string;
//   sender: "You" | "Chat";
// };
// function BardAPI() {
//   const [inputText, setInputText] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const autoscroll = useRef<HTMLDivElement>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const scrollToBottom = () => {
//     if (autoscroll.current) {
//       autoscroll.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleGenerate = () => {
//     if (!inputText.trim()) {
//       return;
//     }
//     setMessages([...messages, { text: inputText, sender: "You" }]);
//     setIsLoading(true);

//     axios
//       .post("http://127.0.0.1:5000/api", { message: inputText })
//       .then((response) => {
//         const botResponse = response.data.response;

//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { text: botResponse, sender: "Chat" },
//         ]);

//         setInputText("");
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="flex flex-col items-center py-6 bg-gradient-to-b from-blue-200 to-purple-400 h-[800px]">
//       <ScrollArea className="w-2/3 h-[600px] overflow-y-scroll rounded-lg shadow-lg border-3 border-purple-300 mb-6 shadow-purple-light">
//         <div className="p-4">
//           {messages.map(({ text, sender }, index) => (
//             <div
//               key={index}
//               className={`flex mb-4 ${
//                 sender === "You" ? "justify-end" : "justify-start"
//               }`}
//             >
//               {sender === "You" ? (
//                 <>
//                   <div
//                     className={`px-4 py-2 rounded-lg bg-blue-200 text-blue-700`}
//                   >
//                     {text}
//                   </div>
//                   <div
//                     className={`flex items-center justify-center rounded-full ml-3 `}
//                   >
//                     <div className="rounded-full w-8 h-8  flex items-center justify-center ">
//                       <img
//                         src="Madhavilatha.jpg"
//                         alt="Zen icon"
//                         className="w-35 h-15 rounded-full"
//                       />
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                 {isLoading ? (
//                     <div className="flex items-center space-x-4">
//                       <Skeleton className="h-12 w-12 rounded-full" />
//                       <div className="space-y-2">
//                         <Skeleton className="h-4 w-[250px]" />
//                         <Skeleton className="h-4 w-[200px]" />
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                   <div
//                     className={`flex items-center justify-center rounded-full w-8 h-8  mr-3`}
//                   >
//                     <img
//                       src="public/zen.webp"
//                       alt="Zen icon"
//                       className="w-15 h-15 rounded-full"
//                     />
//                   </div>
//                   <div
//                     className={`px-4 py-2 rounded-lg bg-orange-200 text-orange-700`}
//                   >
//                     {text}
//                   </div>
//                 </>
//               )}
//               </>
//               )}
//             </div>
//           ))}
//           <div ref={autoscroll} />
//         </div>
//       </ScrollArea>

//       <div className="flex w-2/3 items-center shadow-lg border border-purple-400 rounded-lg p-4">
//         <Input
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           type="text"
//           placeholder="Enter your message..."
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === "Enter") {
//               handleGenerate();
//             }
//           }}
//         />
//         <Button
//           className="ml-4 px-6 py-2 text-white bg-blue-600 hover:bg-purple-700 rounded-lg"
//           onClick={handleGenerate}
//         >
//           Send
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default BardAPI;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Button, ConfigProvider } from "antd"; // Importing ConfigProvider from Ant Design
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Skeleton } from "@/components/ui/skeleton";
// import { ColorInput, TinyColor } from "@ctrl/tinycolor";
// import { useEffect, useRef, useState } from "react";

// const colors1 = ['#6253E1', '#04BEFE']; // Color gradient for Gradient 1
// const getHoverColors = (colors: (ColorInput | undefined)[]) =>
//   colors.map((color: ColorInput | undefined) => new TinyColor(color).lighten(5).toString());
// const getActiveColors = (colors: any[]) =>
//   colors.map((color) => new TinyColor(color).darken(5).toString());

// type Message = {
//   text: string;
//   sender: "You" | "Chat";
// };

// function BardAPI() {
//   const [inputText, setInputText] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const autoscroll = useRef<HTMLDivElement>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const scrollToBottom = () => {
//     if (autoscroll.current) {
//       autoscroll.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleGenerate = () => {
//     if (!inputText.trim()) {
//       return;
//     }
//     setMessages([...messages, { text: inputText, sender: "You" }]);
//     setIsLoading(true);

//     axios
//       .post("http://127.0.0.1:5000/api", { message: inputText })
//       .then((response) => {
//         const botResponse = response.data.response;

//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { text: botResponse, sender: "Chat" },
//         ]);

//         setInputText("");
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="flex flex-col items-center py-6 bg-gradient-to-b from-blue-200 to-purple-400 h-[800px]">
//       <ScrollArea className="w-2/3 h-[600px] overflow-y-scroll rounded-lg shadow-lg border-3 border-purple-300 mb-6 shadow-purple-light">
//         <div className="p-4">
//           {messages.map(({ text, sender }, index) => (
//             <div
//               key={index}
//               className={`flex mb-4 ${
//                 sender === "You" ? "justify-end" : "justify-start"
//               }`}
//             >
//               {sender === "You" ? (
//                 <>
//                   <div
//                     className={`px-4 py-2 rounded-lg bg-blue-200 text-blue-700`}
//                   >
//                     {text}
//                   </div>
//                   <div
//                     className={`flex items-center justify-center rounded-full ml-3 `}
//                   >
//                     <div className="rounded-full w-8 h-8  flex items-center justify-center ">
//                       <img
//                         src="Madhavilatha.jpg"
//                         alt="Zen icon"
//                         className="w-35 h-15 rounded-full"
//                       />
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                 {isLoading ? (
//                     <div className="flex items-center space-x-4">
//                       <Skeleton className="h-12 w-12 rounded-full" />
//                       <div className="space-y-2">
//                         <Skeleton className="h-4 w-[250px]" />
//                         <Skeleton className="h-4 w-[200px]" />
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                   <div
//                     className={`flex items-center justify-center rounded-full w-8 h-8  mr-3`}
//                   >
//                     <img
//                       src="public/zen.webp"
//                       alt="Zen icon"
//                       className="w-15 h-15 rounded-full"
//                     />
//                   </div>
//                   <div
//                     className={`px-4 py-2 rounded-lg bg-orange-200 text-orange-700`}
//                   >
//                     {text}
//                   </div>
//                 </>
//               )}
//               </>
//               )}
//             </div>
//           ))}
//           <div ref={autoscroll} />
//         </div>
//       </ScrollArea>

//       <div className="flex w-2/3 items-center shadow-lg border border-purple-400 rounded-lg p-4">
//         <Input
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           type="text"
//           placeholder="Enter your message..."
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === "Enter") {
//               handleGenerate();
//             }
//           }}
//         />

//         {/* ConfigProvider with Gradient 1 Button */}
//         <ConfigProvider
//           theme={{
//             components: {
//               Button: {
//                 colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
//                 colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
//                 colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
//                 lineWidth: 0,
//               },
//             },
//           }}
//         >
//           <Button
//             type="primary"
//             size="large"
//             onClick={handleGenerate}
//             className="ml-3"
//           >
//             Generate
//           </Button>
//         </ConfigProvider>
//       </div>
//     </div>
//   );
// }

// export default BardAPI;

import axios from "axios";
import { Button, ConfigProvider, Input } from "antd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { AudioOutlined } from "@ant-design/icons";
import { TinyColor, ColorInput } from "@ctrl/tinycolor";
import { useEffect, useRef, useState } from "react";

const colors1 = ["#6253E1", "#04BEFE"];
const getHoverColors = (colors: (ColorInput | undefined)[]) =>
  colors.map((color: ColorInput | undefined) =>
    new TinyColor(color).lighten(5).toString()
  );
const getActiveColors = (colors: any[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

type Message = {
  text: string;
  sender: "You" | "Chat";
};

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

function BardAPI() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const autoscroll = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    if (autoscroll.current) {
      autoscroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGenerate = () => {
    if (!inputText.trim()) {
      return;
    }
    setMessages([...messages, { text: inputText, sender: "You" }]);
    setIsLoading(true);

    axios
      .post("http://127.0.0.1:5000/api", { message: inputText })
      .then((response) => {
        const botResponse = response.data.response;

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: "Chat" },
        ]);

        setInputText("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center py-6 bg-gradient-to-b from-blue-200 to-purple-400 h-[800px]">
      <ScrollArea className="w-2/3 h-[600px] overflow-y-scroll rounded-lg shadow-lg border-3 border-purple-300 mb-6 shadow-purple-light">
        {" "}
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
                    className={`flex items-center justify-center rounded-full ml-3 `}
                  >
                    <div className="rounded-full w-8 h-8  flex items-center justify-center ">
                      <img
                        src="Madhavilatha.jpg"
                        alt="Zen icon"
                        className="w-35 h-15 rounded-full"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {isLoading ? (
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`flex items-center justify-center rounded-full w-8 h-8  mr-3`}
                      >
                        <img
                          src="public/zen.webp"
                          alt="Zen icon"
                          className="w-15 h-15 rounded-full"
                        />
                      </div>
                      <div
                        className={`px-4 py-2 rounded-lg bg-orange-200 text-orange-700`}
                      >
                        {text}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
          <div ref={autoscroll} />
        </div>
      </ScrollArea>

      <div className="flex w-2/3 items-center shadow-lg border border-purple-400 rounded-lg p-4">
        <Input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          suffix={suffix}
          placeholder="Enter your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleGenerate();
            }
          }}
        />

        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: `linear-gradient(135deg, ${colors1.join(", ")})`,
                colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                  colors1
                ).join(", ")})`,
                colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                  colors1
                ).join(", ")})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button
            type="primary"
            size="large"
            onClick={handleGenerate}
            className="ml-4"
          >
            Generate
          </Button>
        </ConfigProvider>
      </div>
    </div>
  );
}

export default BardAPI;
