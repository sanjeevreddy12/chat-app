# Real Time Chat-Application

## Overview
This is a real-time chat application built using Next.js for the frontend and Express.js for the backend. The application allows users to log in, generate room links, and chat in real-time. No chat history is stored, ensuring privacy. Redis is used for scalable Pub/Sub messaging.

## Features
- Real-time messaging using WebSockets (Socket.io)
- Redis adapter for scalable Pub/Sub communication
- User authentication and room-based chatting
- Link-based room invitations
- No message history for privacy
- Styled using Tailwind CSS and ShadCN UI

## Tech Stack
- **Frontend:** Next.js, Tailwind CSS, ShadCN UI
- **Backend:** Express.js
- **WebSockets:** Socket.io
- **Caching & Pub/Sub:** Redis
