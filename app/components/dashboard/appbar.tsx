"use client";
import React from "react";
import { Profile } from "../auth/profile";
import { CreateChat } from "../room/createchat";

export default function Appbar({
  image,
  name,
  user,
}: {
  image?: string;
  name: string;
  user: any;
}) {
  return (
    <nav className="py-2 px-6 flex justify-between items-center bg-amber-300 ">
      <div className="flex justify-between items-center gap-4">
      <h1 className="text-xl md:text-2xl font-extrabold font-sans">Welcome</h1>
      <CreateChat user={user!} />
      </div>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
        < Profile name={name} image={image} />
      </div>
    </nav>
  );
}