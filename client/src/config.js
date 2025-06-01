const config = {
    development: {
      apiUrl: 'http://localhost:5001',
    },
    production: {
      apiUrl: 'https://trisonic-backend.onrender.com', // Update this with your actual backend URL
    },
    watchOptions: {
      ignored: [
        '**/node_modules',
        'C:\\DumpStack.log.tmp',
        'C:\\hiberfil.sys',
        'C:\\pagefile.sys',
        'C:\\swapfile.sys',
      ],
    }
    
  };
  
  const environment = process.env.NODE_ENV || 'development';
  export default config[environment];
