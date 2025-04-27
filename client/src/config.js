const config = {
    development: {
      apiUrl: 'http://localhost:5001',
    },
    production: {
      apiUrl: 'https://trisonic-backend.onrender.com', // Update this with your actual backend URL
    },
  };
  
  const environment = process.env.NODE_ENV || 'development';
  export default config[environment];