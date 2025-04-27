const config = {
    development: {
      apiUrl: 'http://localhost:5001',
    },
    production: {
      apiUrl: 'https://trisonic-backend.onrender.com', // Update this with your actual backend URL
    },
  };
  
  const environment = process.env.NODE_ENV || 'development';
<<<<<<< HEAD
  export default config[environment];
=======
  export default config[environment];
>>>>>>> 4c6174c4320e116f63106e18f9077b92e8e58771
