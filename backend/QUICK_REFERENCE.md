# 🚀 Smart Yield Backend - Quick Reference

## Installation & Running

```bash
cd server
npm install
npm run seed          # Optional: seed database
npm run dev           # Start development server
```

**URL**: `http://127.0.0.1:8080`

---

## Quick API Tests

### 1️⃣ Get All Crops (No Auth Required)
```bash
curl http://127.0.0.1:8080/api/crops
```

### 2️⃣ Register User
```bash
curl -X POST http://127.0.0.1:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Farmer Name",
    "email": "farmer@example.com",
    "password": "password123",
    "state": "Maharashtra",
    "district": "Nashik",
    "soilType": "Black Soil"
  }'
```

### 3️⃣ Login
```bash
curl -X POST http://127.0.0.1:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@example.com",
    "password": "password123"
  }'
```
**Save the token from response**

### 4️⃣ Use Token (Protected Routes)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://127.0.0.1:8080/api/auth/profile
```

---

## API Endpoints Summary

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | /api/auth/register | ❌ | - | Register user |
| POST | /api/auth/login | ❌ | - | Login user |
| GET | /api/crops | ❌ | - | Get all crops |
| GET | /api/crops/recommend?soilType=... | ❌ | - | Get recommendations |
| POST | /api/queries | ❌ | - | Submit query |
| GET | /api/weather | ❌ | - | Get all weather |
| GET | /api/auth/profile | ✅ | farmer | Get profile |
| GET | /api/queries | ✅ | admin | Get all queries |
| POST | /api/crops | ✅ | admin | Create crop |
| POST | /api/fertilizers | ✅ | admin | Create fertilizer |

---

## File Structure

```
server/
├── models/           → Database schemas
├── controllers/      → Business logic
├── routes/          → API endpoints
├── middleware/      → Auth, validation
├── utils/           → Helpers
├── config/          → Configuration
├── index.js         → Main server
└── seed.js          → Database seeder
```

---

## Key Information

| Item | Value |
|------|-------|
| **Port** | 5000 |
| **Database** | MongoDB (Atlas / MONGO_URI) |
| **Database Name** | smart-yield |
| **JWT Expiry** | 7 days |
| **Password Hash** | bcrypt (10 rounds) |
| **Framework** | Express.js |

---

## Environment Variables (.env)

```env
PORT=8080
MONGO_URI=process.env.MONGO_URI
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CORS_ORIGIN=http://127.0.0.1:5173
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection error | Ensure MongoDB is running: `mongod` |
| Port 8080 in use | Change PORT in .env or kill process |
| CORS error | Check CORS_ORIGIN in .env matches frontend |
| JWT token invalid | Ensure token format: `Bearer <token>` |
| Seed fails | Check MongoDB connection, verify schemas |

---

## Important Roles

- **farmer** - Regular user (default)
- **admin** - Can manage all data

---

## Response Format

**Success:**
```json
{
  "success": true,
  "message": "Success message",
  "data": { /* response data */ }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

---

## Documentation Files

- 📖 **README.md** - Setup guide
- 📚 **API_DOCUMENTATION.md** - Full API reference
- ✅ **SETUP_CHECKLIST.md** - Complete checklist
- 📋 **IMPLEMENTATION_SUMMARY.md** - Overview
- 📦 **postman_collection.json** - Postman collection

---

## Database Models

- **User** - Farmers & admins
- **Crop** - Crops with seasons/yields
- **Fertilizer** - NPK recommendations
- **Query** - Expert queries
- **Weather** - District weather

---

## Scripts

```bash
npm install          # Install dependencies
npm run dev          # Start with auto-reload
npm start            # Production start
npm run seed         # Seed database
```

---

## Frontend Integration

Update `src/services/api.ts`:
```typescript
const api = axios.create({
  baseURL: 'http://127.0.0.1:8080/api'
});
```

---

**Need help?** Check the documentation files! 📚
