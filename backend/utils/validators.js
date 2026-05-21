const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  // Minimum 6 characters
  return password && password.length >= 6;
};

const validateSoilType = (soilType) => {
  const validTypes = ['Black Soil', 'Red Soil', 'Alluvial Soil', 'Clay Soil', 'Loamy Soil', 'Sandy Soil'];
  return validTypes.includes(soilType);
};

const validateState = (state) => {
  const validStates = ['Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Karnataka'];
  return validStates.includes(state);
};

module.exports = {
  validateEmail,
  validatePassword,
  validateSoilType,
  validateState,
};
