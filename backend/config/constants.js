module.exports = {
  STATES: ['Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Karnataka'],
  
  SOIL_TYPES: ['Black Soil', 'Red Soil', 'Alluvial Soil', 'Clay Soil', 'Loamy Soil', 'Sandy Soil'],
  
  SEASONS: ['Kharif', 'Rabi', 'Year-round'],
  
  WATER_REQUIREMENTS: ['Low', 'Medium', 'High', 'Very High'],
  
  YIELD_TYPES: ['Low', 'Medium', 'High', 'Very High'],
  
  ROLES: ['farmer', 'admin'],
  
  QUERY_STATUSES: ['pending', 'answered'],
  
  QUERY_CATEGORIES: ['Crop', 'Fertilizer', 'Weather', 'Pest', 'Disease', 'Other'],
  
  APPLICATION_TYPES: ['Basal', 'Top Dressing', 'Foliar'],
  
  // Validation
  PASSWORD_MIN_LENGTH: 6,
  
  // JWT
  JWT_EXPIRY: '7d',
  
  // API
  ITEMS_PER_PAGE: 10,
};
