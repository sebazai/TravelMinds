"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [location, setLocation] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  return (
    <div>
      <p>Location: {JSON.stringify(location)}</p>
      <input
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            setMessages((currentMessages) => [
              ...currentMessages,
              { role: "user", content: input },
            ]);

            const response = await fetch("/api/places/chat", {
              method: "POST",
              body: JSON.stringify({
                messages: [...messages, { role: "user", content: input }],
                data: { location },
              }),
            });

            const { messages: newMessages, ...rest } = await response.json();

            console.log(rest);

            setMessages((currentMessages) => [
              ...currentMessages,
              ...newMessages,
            ]);
          }
        }}
      />

      {messages.map((message, index) => (
        <div key={`${message.role}-${index}`}>
          {message.role === "user" ? "User: " : "AI: "}
          {typeof message.content === "string"
            ? message.content
            : message.content
                .filter((part) => part.type === "text")
                .map((part, partIndex) => (
                  <span key={partIndex}>{part.text}</span>
                ))}
        </div>
      ))}
    </div>
  );
}
