#!/bin/bash

# Smart Yield Application - Linux/macOS Startup Script

echo "=============================================================="
echo "🌱 STARTING SMART YIELD APPLICATION SERVICES 🌱"
echo "=============================================================="
echo ""

# Function to stop all background processes on exit
cleanup() {
    echo "Stopping all services..."
    kill $(jobs -p)
    exit
}
trap cleanup EXIT

# 1. Starting Python ML Microservice
echo "[1/3] Starting Python ML Microservice..."
cd ml_service && source venv/bin/activate && python app.py &
cd ..

# 2. Starting Node.js Backend Server
echo "[2/3] Starting Node.js Backend Server..."
cd backend && npm run dev &
cd ..

# 3. Starting Vite Frontend App
echo "[3/3] Starting Vite Frontend App..."
cd frontend && npm run dev &
cd ..

echo ""
echo "=============================================================="
echo "✅ All services triggered successfully!"
echo "💻 Frontend will open at: http://localhost:3000"
echo "🔌 Backend is listening on: http://localhost:8080"
echo "🤖 ML Microservice is running on: http://localhost:5000"
echo "=============================================================="
echo ""
echo "Press [Ctrl+C] to stop all services."

# Keep script running
while true; do
    sleep 1
done
