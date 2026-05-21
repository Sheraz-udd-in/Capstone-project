@echo off
title Smart Yield Application - Startup Script
echo ==============================================================
echo 🌱 STARTING SMART YIELD APPLICATION SERVICES 🌱
echo ==============================================================
echo.

echo [1/3] Starting Python ML Microservice...
start "Smart Yield - Python ML Service" cmd /k "cd ml_service && venv\Scripts\activate && python app.py"

echo [2/3] Starting Node.js Backend Server...
start "Smart Yield - Express Backend" cmd /k "cd backend && npm run dev"

echo [3/3] Starting Vite Frontend App...
start "Smart Yield - React Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ==============================================================
echo ✅ All services triggered successfully!
echo 💻 Frontend will open at: http://localhost:3000
echo 🔌 Backend is listening on: http://localhost:8080
echo 🤖 ML Microservice is running on: http://localhost:5000
echo ==============================================================
echo.
pause
