const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a simple logo for favicon.ico
const faviconCanvas = createCanvas(32, 32);
const faviconCtx = faviconCanvas.getContext('2d');
faviconCtx.fillStyle = '#1976d2';
faviconCtx.fillRect(0, 0, 32, 32);
faviconCtx.fillStyle = 'white';
faviconCtx.font = 'bold 20px Arial';
faviconCtx.textAlign = 'center';
faviconCtx.textBaseline = 'middle';
faviconCtx.fillText('B', 16, 16);

// Create a simple logo for logo192.png
const logo192Canvas = createCanvas(192, 192);
const logo192Ctx = logo192Canvas.getContext('2d');
logo192Ctx.fillStyle = '#1976d2';
logo192Ctx.fillRect(0, 0, 192, 192);
logo192Ctx.fillStyle = 'white';
logo192Ctx.font = 'bold 120px Arial';
logo192Ctx.textAlign = 'center';
logo192Ctx.textBaseline = 'middle';
logo192Ctx.fillText('B', 96, 96);

// Create a simple logo for logo512.png
const logo512Canvas = createCanvas(512, 512);
const logo512Ctx = logo512Canvas.getContext('2d');
logo512Ctx.fillStyle = '#1976d2';
logo512Ctx.fillRect(0, 0, 512, 512);
logo512Ctx.fillStyle = 'white';
logo512Ctx.font = 'bold 320px Arial';
logo512Ctx.textAlign = 'center';
logo512Ctx.textBaseline = 'middle';
logo512Ctx.fillText('B', 256, 256);

// Save the images
const faviconBuffer = faviconCanvas.toBuffer('image/png');
const logo192Buffer = logo192Canvas.toBuffer('image/png');
const logo512Buffer = logo512Canvas.toBuffer('image/png');

fs.writeFileSync('favicon.ico', faviconBuffer);
fs.writeFileSync('logo192.png', logo192Buffer);
fs.writeFileSync('logo512.png', logo512Buffer);

console.log('Logo files created successfully!'); 