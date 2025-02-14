"use client"
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Getsocket } from "@/lib/socket";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from "uuid";
export default function Chats({
  group,
  oldMessages,
  chatUser,
}: {
  group: any;
  oldMessages: Array<any> | [];
  chatUser?: any;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<any>>(oldMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let socket = useMemo(() => {
    const socket = Getsocket();
    socket.auth = {
      room: group.id,
    };
    return socket.connect();
  }, []);
  useEffect(() => {
    socket.on("message", (data: any) => {
      console.log("The message is", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    return () => {
      socket.close();
    };
  }, []);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: any = {
      id: uuidv4(),
      message: message,
      name: chatUser?.name ?? "Unknown",
      created_at: new Date().toISOString(),
      group_id: group.id,
    };
    socket.emit("message", payload);
    setMessage("");
   
  };

  return (
    <div className="flex flex-col h-[94vh]  p-4">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse no-scrollbar">
        <div ref={messagesEndRef} />
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-sm rounded-lg p-2 ${
                message.name === chatUser?.name
                  ? "bg-gradient-to-r from-amber-200 to-amber-300  text-white self-end"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
              }`}
            >
              {message.message}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex items-center">
        <Input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-400"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}