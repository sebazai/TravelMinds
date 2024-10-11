"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [location, setLocation] = useState();
  const { messages, input, setInput, append } = useChat();
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
      <input
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            append(
              {
                content: input,
                role: "user",
              },
              { data: { location } }
            );
          }
        }}
      />

      {messages.map((message, index) => (
        <div key={index}>{message.content}</div>
      ))}
    </div>
  );
}
