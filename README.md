# Smart Yield Agricultural Advisory System

A comprehensive full-stack web application that provides AI-powered agricultural guidance to Indian farmers. This system combines machine learning models, real-time weather data, and expert recommendations to help farmers make data-driven decisions.

## 🌾 Overview

Smart Yield is an intelligent agricultural platform designed to:
- **Predict crop yields** based on climate conditions using Random Forest ML
- **Detect plant diseases** from leaf images using Google Gemini Vision AI
- **Recommend suitable crops** based on soil and location
- **Provide fertilizer guidance** for optimal crop nutrition
- **Track weather forecasts** for farming regions
- **Connect farmers with experts** through Q&A system
- **Support bilingual interface** (English & Hindi)

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│  Frontend (React + TypeScript)          │
│  Port: 3001                             │
│  - Signup/Login                         │
│  - Yield Prediction                     │
│  - Disease Detection                    │
│  - Crop Recommendations                 │
│  - Farm Analytics Dashboard             │
└────────────────┬────────────────────────┘
                 │ HTTP/REST
┌────────────────┴────────────────────────┐
│  Backend (Express.js)                   │
│  Port: 8080                             │
│  - Authentication (JWT)                 │
│  - Crop/Fertilizer APIs                 │
│  - Weather Integration                  │
│  - Query Management                     │
│  - Admin Panel                          │
└────────────────┬────────────────────────┘
                 │ HTTP/REST
┌────────────────┴────────────────────────┐
│  ML Microservice (Flask)                │
│  Port: 5000                             │
│  - /predict_yield (Random Forest)       │
│  - /detect_disease (Gemini Vision)      │
└─────────────────────────────────────────┘
                 │
         ┌───────┴───────┐
         │               │
    ┌────▼──────┐  ┌────▼──────────┐
    │ Random     │  │ Google Gemini │
    │ Forest     │  │ Vision 2.5    │
    │ (Sklearn)  │  │ Flash API     │
    └────────────┘  └───────────────┘

Database: MongoDB Atlas
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast bundling
- **TailwindCSS** for styling
- **Shadcn/UI** component library
- **Framer Motion** for animations
- **Recharts** for data visualization
- **React Router** for navigation
- **Axios** for HTTP requests

### Backend
- **Node.js** runtime
- **Express.js** framework
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled
- **Nodemailer** for email (optional)

### ML Service
- **Flask** web framework
- **scikit-learn** for Random Forest
- **Pandas** & **NumPy** for data processing
- **Google Generative AI** for vision models
- **Pickle** for model serialization

## 📋 Features

### For Farmers
- ✅ User registration with location (state/district)
- ✅ Yield prediction based on crop and climate
- ✅ Plant disease detection with treatment recommendations
- ✅ Crop recommendations based on soil type and location
- ✅ Fertilizer guide for selected crops
- ✅ Weather forecasts for farming region
- ✅ Submit queries to agricultural experts
- ✅ Track farm analytics (profit, duration, yield)
- ✅ Bilingual interface (English/Hindi)

### For Admins
- ✅ View all farmer queries
- ✅ Provide expert answers
- ✅ Manage content and recommendations
- ✅ User management dashboard

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Python 3.11+
- MongoDB Atlas account
- Google Gemini API key (for disease detection)
- Git

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/Sheraz-udd-in/Capstone-project.git
cd Capstone-master
```

#### 2. Setup Backend
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
JWT_SECRET=your_jwt_secret_key
PORT=8080
NODE_ENV=development
CORS_ORIGIN=http://127.0.0.1:5173
EOF

# Start backend
npm run dev
```

#### 3. Setup Frontend
```bash
cd frontend
npm install

# Frontend runs on port 3000/3001
npm run dev
```

#### 4. Setup ML Service
```bash
cd ml_service
pip install -r requirements.txt

# Train the model (first time)
python train_yield.py

# Create .env file
cat > .env << EOF
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
EOF

# Start ML service
python app.py
```

## 📡 API Endpoints

### Backend (Port 8080)

#### Authentication
- `POST /api/auth/register` - User signup
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login
- `GET /api/auth/profile` - Get user profile (protected)

#### Crops
- `GET /api/crops/recommend?soilType=X&state=Y` - Get crop recommendations

#### Fertilizers
- `GET /api/fertilizers/guide/:crop` - Get fertilizer guide for crop

#### Weather
- `GET /api/weather/:district` - Get weather info for district

#### Queries
- `POST /api/queries` - Submit expert query
- `GET /api/queries/my-queries` - Get user's queries
- `GET /api/queries` - Get all queries (admin)
- `PATCH /api/queries/:id/answer` - Answer query (admin)

### ML Service (Port 5000)

#### Yield Prediction
```bash
POST /predict_yield
Content-Type: application/json

{
  "crop": "Rice",
  "temperature": 28,
  "rainfall": 150
}

Response:
{
  "success": true,
  "crop": "Rice",
  "predicted_yield_q_per_ha": 35.5,
  "predicted_yield_kg_per_acre": 1436.2
}
```

#### Disease Detection
```bash
POST /detect_disease
Content-Type: multipart/form-data

Form Data:
- image: [leaf_image.jpg]

Response:
{
  "success": true,
  "status": "Mild Infection",
  "disease_name": "Early Blight",
  "confidence": 87,
  "disease_percentage": 25,
  "recommendation_en": "Apply fungicide XYZ...",
  "recommendation_hi": "कवकनाशी XYZ लागू करें..."
}
```

## 📊 ML Models

### Yield Prediction Model
- **Type**: Random Forest Regressor
- **Training Samples**: 5000 synthetic data points
- **Features**: Crop (one-hot encoded), Temperature, Rainfall
- **Target**: Yield (quintals/hectare)
- **Performance**: R² Score = 0.9976 (99.76% variance explained)
- **Crops Supported**: 13 Indian agricultural crops
  - Wheat, Rice, Maize, Sugarcane, Cotton
  - Soybean, Mustard, Millets, Jowar, Groundnut
  - Tomato, Potato, Onion

### Disease Detection Model
- **Type**: Google Gemini 2.5 Flash Vision AI
- **Input**: Leaf image (JPEG/PNG)
- **Output**: Disease diagnosis + bilingual treatment recommendations
- **Supported**: 30+ plant diseases
- **Languages**: English + Hindi recommendations

## 🔑 Environment Variables

### Backend (.env)
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_min_32_chars
PORT=8080
NODE_ENV=development
CORS_ORIGIN=http://127.0.0.1:3001
```

### ML Service (.env)
```
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://127.0.0.1:8080/api
VITE_ML_URL=http://127.0.0.1:5000
```

## 📁 Project Structure

```
Capstone-master/
├── backend/                    # Express.js server
│   ├── config/                # Database & environment config
│   ├── controllers/           # Route handlers
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth, error handling
│   ├── utils/                # Helpers & validators
│   ├── index.js              # Main server file
│   └── package.json
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API client
│   │   ├── context/          # Auth & Language context
│   │   ├── hooks/            # Custom hooks
│   │   ├── lib/              # Utilities
│   │   ├── data/             # Static data (crops, regions)
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   ├── vite.config.ts        # Vite configuration
│   ├── tailwind.config.ts    # TailwindCSS config
│   └── package.json
│
├── ml_service/                # Flask ML microservice
│   ├── app.py                # Flask application
│   ├── train_yield.py        # Model training script
│   ├── yield_model.pkl       # Trained Random Forest model
│   ├── requirements.txt       # Python dependencies
│   └── Procfile              # Deployment config
│
├── .env                       # Environment variables
├── README.md                  # This file
└── .gitignore               # Git ignore rules
```

## 🧪 Testing

### Test Yield Prediction
```bash
curl -X POST http://127.0.0.1:5000/predict_yield \
  -H "Content-Type: application/json" \
  -d '{"crop":"Rice","temperature":28,"rainfall":150}'
```

### Test Disease Detection
```bash
curl -X POST http://127.0.0.1:5000/detect_disease \
  -F "image=@leaf_photo.jpg"
```

### Test Backend Health
```bash
curl http://127.0.0.1:8080/api/health
```

## 🌐 Deployment

### Frontend (Vercel)
```bash
npm run build
# Upload dist/ folder to Vercel
```

### Backend (Render)
- Connect GitHub repository
- Set environment variables
- Deploy with build command: `npm install && npm start`

### ML Service (Render)
- Python runtime
- Command: `gunicorn app:app`

### Database (MongoDB Atlas)
- Create cluster
- Add IP whitelist
- Set connection string in .env

## 👥 User Roles

### Farmer
- Can sign up and manage profile
- Access yield prediction tool
- Upload images for disease detection
- Get crop recommendations
- Submit queries to experts
- View farm analytics

### Admin
- View all farmer queries
- Provide expert answers
- Manage system content
- Access admin dashboard

## 🔐 Security

- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing
- ✅ CORS protection
- ✅ Input validation & sanitization
- ✅ Error handling middleware
- ✅ Rate limiting (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 💬 Support

For issues and questions:
- Open an issue on GitHub
- Contact: uddinsheraz319@gmail.com

## 🎯 Future Enhancements

- [ ] Real agricultural dataset integration
- [ ] Soil health monitoring
- [ ] Pest prediction models
- [ ] Market price forecasting
- [ ] Mobile app (React Native)
- [ ] IoT sensor integration
- [ ] Blockchain for supply chain
- [ ] Drone imagery analysis
- [ ] Advanced analytics dashboard
- [ ] Video tutorials in regional languages

## 📚 Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [scikit-learn ML Guide](https://scikit-learn.org/)
- [Google Generative AI](https://ai.google.dev/)
- [Flask Documentation](https://flask.palletsprojects.com/)

---

**Made with ❤️ for Indian Farmers**

Last Updated: May 21, 2026
