# Smart Yield Backend Server

A comprehensive Node.js/Express backend for the Smart Yield agricultural advisory platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- MongoDB running locally or Atlas connection string
- npm or yarn package manager

### Installation

1. **Navigate to server directory**:
```bash
cd server
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment variables** in `.env`:
```env
PORT=8080
MONGO_URI=process.env.MONGO_URI
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
CORS_ORIGIN=http://127.0.0.1:5173
```

4. **Seed database with mock data**:
```bash
npm run seed
```

5. **Start the server**:
```bash
npm run dev    # Development with auto-reload
npm start      # Production mode
```

Server will run on `http://127.0.0.1:8080`

---

## 📁 Project Structure

```
server/
├── controllers/          # Business logic
│   ├── authController.js
│   ├── cropController.js
│   ├── fertilizerController.js
│   ├── queryController.js
│   ├── weatherController.js
│   └── userController.js
├── models/             # MongoDB schemas
│   ├── User.js
│   ├── Crop.js
│   ├── Fertilizer.js
│   ├── Query.js
│   └── Weather.js
├── routes/             # API endpoints
│   ├── auth.js
│   ├── crops.js
│   ├── fertilizers.js
│   ├── queries.js
│   ├── weather.js
│   └── users.js
├── middleware/         # Express middleware
│   ├── auth.js
│   ├── admin.js
│   └── errorHandler.js
├── utils/             # Utilities
│   ├── validators.js
│   └── response.js
├── index.js           # Main server file
├── seed.js            # Database seeder
├── .env               # Environment variables
└── package.json       # Dependencies
```

---

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT authentication
- **dotenv**: Environment variable management

### Dev Dependencies
- **nodemon**: Auto-reload development server

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/admin-login` - Admin login
- `GET /api/auth/profile` - Get current profile

### Crops
- `GET /api/crops` - Get all crops
- `GET /api/crops/recommend?soilType=...` - Get crop recommendations
- `GET /api/crops/:id` - Get single crop
- `POST /api/crops` - Create crop (Admin)
- `PATCH /api/crops/:id` - Update crop (Admin)
- `DELETE /api/crops/:id` - Delete crop (Admin)

### Fertilizers
- `GET /api/fertilizers` - Get all fertilizers
- `GET /api/fertilizers/crop/:cropName` - Get fertilizer by crop
- `GET /api/fertilizers/:id` - Get single fertilizer
- `POST /api/fertilizers` - Create fertilizer (Admin)
- `PATCH /api/fertilizers/:id` - Update fertilizer (Admin)
- `DELETE /api/fertilizers/:id` - Delete fertilizer (Admin)

### Expert Queries
- `POST /api/queries` - Submit query
- `GET /api/queries` - Get all queries (Admin)
- `GET /api/queries/status/:status` - Get queries by status (Admin)
- `GET /api/queries/:id` - Get single query (Admin)
- `PATCH /api/queries/:id/answer` - Answer query (Admin)
- `DELETE /api/queries/:id` - Delete query (Admin)

### Weather
- `GET /api/weather` - Get all weather
- `GET /api/weather/district/:district` - Get weather by district
- `GET /api/weather/location/:state/:district` - Get weather by location
- `POST /api/weather` - Create/update weather (Admin)
- `DELETE /api/weather/:id` - Delete weather (Admin)

### Users
- `GET /api/users/:id` - Get user profile (Protected)
- `PATCH /api/users/:id` - Update profile (Protected)
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/stats/farmers` - Get farmers count (Admin)

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed endpoint documentation.

---

## 🔐 Authentication

### JWT Token
- Generated on successful login/registration
- Valid for 7 days
- Required for protected endpoints
- Pass in header: `Authorization: Bearer <token>`

### Roles
- **farmer**: Regular user
- **admin**: Can manage crops, fertilizers, queries, weather

### Protected Routes
- All routes with `auth` middleware require valid JWT token
- Admin routes require both `auth` and `admin` middleware

---

## 📝 Database Seeding

Run the seeder to populate initial data:
```bash
npm run seed
```

This will:
- Clear existing data
- Add 5 crops (Rice, Wheat, Cotton, Sugarcane, Maize)
- Add fertilizer guides for each crop
- Add weather data for 3 districts
- Show success message

---

## 🧪 Testing Endpoints

### Using cURL
```bash
# Get all crops
curl http://127.0.0.1:8080/api/crops

# Get crop recommendations
curl http://127.0.0.1:8080/api/crops/recommend?soilType=Black%20Soil

# Register
curl -X POST http://127.0.0.1:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Farmer",
    "email": "john@example.com",
    "password": "pass123",
    "state": "Maharashtra",
    "district": "Nashik",
    "soilType": "Black Soil"
  }'
```

### Using Postman
1. Import the collection endpoints
2. Set Authorization header for protected routes
3. Test each endpoint

---

## ⚙️ Configuration

### Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `NODE_ENV`: Environment (development/production)
- `CORS_ORIGIN`: Frontend URL for CORS

### MongoDB Connection
- Local: process.env.MONGO_URI
- Atlas: `mongodb+srv://username:password@cluster.mongodb.net/smart-yield`

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify network access for MongoDB Atlas

### Port Already in Use
- Change PORT in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### JWT Errors
- Verify token format in header
- Check JWT_SECRET in .env matches
- Ensure token hasn't expired

### CORS Errors
- Check CORS_ORIGIN in .env
- Ensure frontend URL is correct
- Frontend should include credentials in requests

---

## 📚 Additional Resources

- [API Documentation](./API_DOCUMENTATION.md)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express Documentation](https://expressjs.com/)
- [JWT Documentation](https://jwt.io/)

---

## 📄 License

ISC License

---

## 👨‍💼 Support

For issues or questions, refer to the API documentation or create an issue in the repository.
