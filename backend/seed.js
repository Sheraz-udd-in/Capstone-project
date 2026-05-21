const connectDB = require('./config/db');
const Crop = require('./models/Crop');
const Fertilizer = require('./models/Fertilizer');
const Weather = require('./models/Weather');
require('dotenv').config();

const seedData = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Crop.deleteMany({});
    await Fertilizer.deleteMany({});
    await Weather.deleteMany({});
    console.log('✓ Cleared existing data');

    // Seed Crops
    const cropsData = [
      {
        name: 'Rice',
        season: 'Kharif',
        waterRequirement: 'High',
        duration: '120-150 days',
        yield: 'High',
        soilTypes: ['Black Soil', 'Alluvial Soil', 'Clay Soil'],
      },
      {
        name: 'Wheat',
        season: 'Rabi',
        waterRequirement: 'Medium',
        duration: '120-130 days',
        yield: 'High',
        soilTypes: ['Alluvial Soil', 'Black Soil', 'Loamy Soil'],
      },
      {
        name: 'Cotton',
        season: 'Kharif',
        waterRequirement: 'High',
        duration: '150-180 days',
        yield: 'Medium',
        soilTypes: ['Black Soil', 'Red Soil', 'Loamy Soil'],
      },
      {
        name: 'Sugarcane',
        season: 'Year-round',
        waterRequirement: 'Very High',
        duration: '12-18 months',
        yield: 'Very High',
        soilTypes: ['Alluvial Soil', 'Black Soil', 'Clay Soil'],
      },
      {
        name: 'Maize',
        season: 'Kharif',
        waterRequirement: 'Medium',
        duration: '80-120 days',
        yield: 'Medium',
        soilTypes: ['Black Soil', 'Red Soil', 'Alluvial Soil'],
      },
    ];

    const crops = await Crop.insertMany(cropsData);
    console.log(`✓ Seeded ${crops.length} crops`);

    // Seed Fertilizers
    const fertilizersData = [
      {
        crop: crops[0]._id,
        cropName: 'Rice',
        nitrogen: '120 kg/ha',
        phosphorus: '60 kg/ha',
        potassium: '40 kg/ha',
        organic: '10 tons/ha',
        applicationType: 'Basal',
        season: 'Kharif',
      },
      {
        crop: crops[1]._id,
        cropName: 'Wheat',
        nitrogen: '100 kg/ha',
        phosphorus: '50 kg/ha',
        potassium: '30 kg/ha',
        organic: '8 tons/ha',
        applicationType: 'Basal',
        season: 'Rabi',
      },
      {
        crop: crops[2]._id,
        cropName: 'Cotton',
        nitrogen: '150 kg/ha',
        phosphorus: '70 kg/ha',
        potassium: '50 kg/ha',
        organic: '12 tons/ha',
        applicationType: 'Top Dressing',
        season: 'Kharif',
      },
    ];

    const fertilizers = await Fertilizer.insertMany(fertilizersData);
    console.log(`✓ Seeded ${fertilizers.length} fertilizer guides`);

    // Seed Weather Data for major districts
    const weatherData = [
      {
        district: 'Nashik',
        state: 'Maharashtra',
        temperature: 28,
        humidity: 65,
        rainfall: 12,
        condition: 'Partly Cloudy',
        forecast: [
          { day: 'Today', temp: 28, condition: 'Partly Cloudy', rainfall: 0 },
          { day: 'Tomorrow', temp: 30, condition: 'Sunny', rainfall: 0 },
          { day: 'Day 3', temp: 27, condition: 'Rainy', rainfall: 25 },
        ],
      },
      {
        district: 'Pune',
        state: 'Maharashtra',
        temperature: 26,
        humidity: 60,
        rainfall: 8,
        condition: 'Clear',
        forecast: [
          { day: 'Today', temp: 26, condition: 'Clear', rainfall: 0 },
          { day: 'Tomorrow', temp: 28, condition: 'Sunny', rainfall: 0 },
          { day: 'Day 3', temp: 25, condition: 'Partly Cloudy', rainfall: 10 },
        ],
      },
      {
        district: 'Ahmednagar',
        state: 'Maharashtra',
        temperature: 29,
        humidity: 70,
        rainfall: 15,
        condition: 'Cloudy',
        forecast: [
          { day: 'Today', temp: 29, condition: 'Cloudy', rainfall: 5 },
          { day: 'Tomorrow', temp: 31, condition: 'Sunny', rainfall: 0 },
          { day: 'Day 3', temp: 28, condition: 'Rainy', rainfall: 30 },
        ],
      },
    ];

    const weatherRecords = await Weather.insertMany(weatherData);
    console.log(`✓ Seeded ${weatherRecords.length} weather records`);

    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
