Dockerized Node.js & PostgreSQL Web App

A full-stack web application containerized with Docker and orchestrated using Docker Compose.

🚀 Overview

This project demonstrates:

Node.js Express Server: Connects to PostgreSQL and displays real-time timestamps.

PostgreSQL Database: Isolated and persistent using Docker volumes.

Docker Compose: Manages multi-container networking and startup.

🛠️ Project Structure

my-docker-app/
├── package.json
├── index.js
├── Dockerfile
└── docker-compose.yml


⚙️ How to Run

Run the application using Docker Compose:

docker compose up --build -d


Open your browser and go to: http://localhost:3000

🎛️ Useful Commands

Stop containers: docker compose down

View logs: docker compose logs web
