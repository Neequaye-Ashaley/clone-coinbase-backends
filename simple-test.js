const test = async () => {
  try {
    console.log('Testing http://localhost:5000/api/crypto...');
    const res = await fetch('http://localhost:5000/api/crypto');
    const data = await res.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
};

test();
