const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent'); // Import as function, not constructor

const username = 'Teja';  // Replace with your actual ProxyMesh username
const password = 'Spidey@123';  // Replace with your actual ProxyMesh password
const proxyHost = 'us-ca.proxymesh.com';
const proxyPort = 31280;

// Proxy URL and Authentication
const proxyUrl = `http://${username}:${password}@${proxyHost}:${proxyPort}`;

// Create Proxy Agent using the correct API
const agent = new HttpsProxyAgent(proxyUrl);

// Axios request configuration to fetch the public IP address
const config = {
  method: 'get',
  url: 'https://api.ipify.org?format=json',  // Service to get the public IP
  httpsAgent: agent,
};

axios(config)
  .then((response) => {
    console.log('Proxy IP Address:', response.data.ip);  // Print the IP address being used by the proxy
  })
  .catch((error) => {
    console.error('Error fetching IP:', error);
  });
