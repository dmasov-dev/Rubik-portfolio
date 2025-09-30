import crypto from 'crypto';

// Function to generate SHA-256 hash
const generateHash = (plaintext) => {
  return crypto.createHash('sha256').update(plaintext).digest('hex');
};

// Generate hash for your plain password
const plainPassword = '123'; // Your plain password
const hashedPassword = generateHash(plainPassword);

console.log('Plain password:', plainPassword);
console.log('Hashed password:', hashedPassword);
