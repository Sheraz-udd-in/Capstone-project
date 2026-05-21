# Smart Yield Backend API Documentation

## Base URL
```
http://127.0.0.1:8080/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### 1. Register (Signup)
- **URL**: `POST /auth/register`
- **Auth Required**: No
- **Body**:
```json
{
  "name": "Farmer Name",
  "email": "farmer@example.com",
  "password": "password123",
  "state": "Maharashtra",
  "district": "Nashik",
  "soilType": "Black Soil"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": { ... },
    "token": "jwt_token"
  }
}
```

### 2. Login
- **URL**: `POST /auth/login`
- **Auth Required**: No
- **Body**:
```json
{
  "email": "farmer@example.com",
  "password": "password123"
}
```

### 3. Admin Login
- **URL**: `POST /auth/admin-login`
- **Auth Required**: No
- **Body**: Same as login

### 4. Get Current Profile
- **URL**: `GET /auth/profile`
- **Auth Required**: Yes

---

## 🌾 Crop Endpoints

### 1. Get All Crops
- **URL**: `GET /crops`
- **Auth Required**: No
- **Response**: Array of crops

### 2. Get Crop Recommendations
- **URL**: `GET /crops/recommend?soilType=Black Soil&state=Maharashtra`
- **Auth Required**: No
- **Query Params**:
  - `soilType` (required): Type of soil
  - `state` (optional): State name
- **Response**: Recommended crops

### 3. Get Single Crop
- **URL**: `GET /crops/:id`
- **Auth Required**: No

### 4. Create Crop (Admin)
- **URL**: `POST /crops`
- **Auth Required**: Yes (Admin)
- **Body**:
```json
{
  "name": "Rice",
  "season": "Kharif",
  "waterRequirement": "High",
  "duration": "120-150 days",
  "yield": "High",
  "soilTypes": ["Black Soil", "Alluvial Soil"]
}
```

### 5. Update Crop (Admin)
- **URL**: `PATCH /crops/:id`
- **Auth Required**: Yes (Admin)
- **Body**: Partial update

### 6. Delete Crop (Admin)
- **URL**: `DELETE /crops/:id`
- **Auth Required**: Yes (Admin)

---

## 💧 Fertilizer Endpoints

### 1. Get All Fertilizers
- **URL**: `GET /fertilizers`
- **Auth Required**: No

### 2. Get Fertilizer by Crop Name
- **URL**: `GET /fertilizers/crop/:cropName`
- **Auth Required**: No

### 3. Get Single Fertilizer
- **URL**: `GET /fertilizers/:id`
- **Auth Required**: No

### 4. Create Fertilizer (Admin)
- **URL**: `POST /fertilizers`
- **Auth Required**: Yes (Admin)
- **Body**:
```json
{
  "cropName": "Rice",
  "crop": "crop_id",
  "nitrogen": "120 kg/ha",
  "phosphorus": "60 kg/ha",
  "potassium": "40 kg/ha",
  "organic": "10 tons/ha",
  "applicationType": "Basal",
  "season": "Kharif"
}
```

### 5. Update Fertilizer (Admin)
- **URL**: `PATCH /fertilizers/:id`
- **Auth Required**: Yes (Admin)

### 6. Delete Fertilizer (Admin)
- **URL**: `DELETE /fertilizers/:id`
- **Auth Required**: Yes (Admin)

---

## ❓ Query Endpoints

### 1. Submit Query
- **URL**: `POST /queries`
- **Auth Required**: No
- **Body**:
```json
{
  "farmerName": "Farmer Name",
  "farmerEmail": "farmer@example.com",
  "district": "Nashik",
  "query": "How to control pests in wheat?",
  "category": "Pest"
}
```

### 2. Get All Queries (Admin)
- **URL**: `GET /queries`
- **Auth Required**: Yes (Admin)

### 3. Get Queries by Status (Admin)
- **URL**: `GET /queries/status/:status`
- **Auth Required**: Yes (Admin)
- **Params**: `status` = "pending" or "answered"

### 4. Get Single Query (Admin)
- **URL**: `GET /queries/:id`
- **Auth Required**: Yes (Admin)

### 5. Answer Query (Admin)
- **URL**: `PATCH /queries/:id/answer`
- **Auth Required**: Yes (Admin)
- **Body**:
```json
{
  "answer": "The answer to the query..."
}
```

### 6. Delete Query (Admin)
- **URL**: `DELETE /queries/:id`
- **Auth Required**: Yes (Admin)

---

## 🌦️ Weather Endpoints

### 1. Get All Weather
- **URL**: `GET /weather`
- **Auth Required**: No

### 2. Get Weather by District
- **URL**: `GET /weather/district/:district`
- **Auth Required**: No

### 3. Get Weather by Location
- **URL**: `GET /weather/location/:state/:district`
- **Auth Required**: No

### 4. Create/Update Weather (Admin)
- **URL**: `POST /weather`
- **Auth Required**: Yes (Admin)
- **Body**:
```json
{
  "district": "Nashik",
  "state": "Maharashtra",
  "temperature": 28,
  "humidity": 65,
  "rainfall": 12,
  "condition": "Partly Cloudy",
  "forecast": [
    { "day": "Today", "temp": 28, "condition": "Partly Cloudy", "rainfall": 0 }
  ]
}
```

### 5. Delete Weather (Admin)
- **URL**: `DELETE /weather/:id`
- **Auth Required**: Yes (Admin)

---

## 👤 User Endpoints

### 1. Get User Profile
- **URL**: `GET /users/:id`
- **Auth Required**: Yes

### 2. Update User Profile
- **URL**: `PATCH /users/:id`
- **Auth Required**: Yes
- **Body**:
```json
{
  "name": "Updated Name",
  "state": "Punjab",
  "district": "Ludhiana",
  "soilType": "Loamy Soil"
}
```

### 3. Get All Users (Admin)
- **URL**: `GET /users`
- **Auth Required**: Yes (Admin)

### 4. Get Farmers Count (Admin)
- **URL**: `GET /users/stats/farmers`
- **Auth Required**: Yes (Admin)

---

## 📊 Soil Types
- Black Soil
- Red Soil
- Alluvial Soil
- Clay Soil
- Loamy Soil
- Sandy Soil

## 🗽 States
- Maharashtra
- Punjab
- Haryana
- Uttar Pradesh
- Karnataka

## 🌱 Seasons
- Kharif
- Rabi
- Year-round

## 💧 Water Requirements
- Low
- Medium
- High
- Very High

## 📈 Yield Types
- Low
- Medium
- High
- Very High

---

## Error Responses
```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

Status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden (Admin only)
- `404`: Not Found
- `500`: Server Error
