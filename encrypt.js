const crypto = require('crypto');
const ENC= 'j1uy3lyq3ul3fg5i21z4ykhg63Hh5l7k';
const IV = "s9pr4k4h2lj1l163";
const ALGO = "aes-256-cbc"

exports.encrypt = (text) => {
    let cipher = crypto.createCipheriv(ALGO, ENC, IV);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

exports.decrypt = (text) => {
    let decipher = crypto.createDecipheriv(ALGO, ENC, IV);
    let decrypted = decipher.update(text, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
};

// const encrypted_key = encrypt("HelloWorld");
// console.log(encrypted_key)
// const decrypted_key = decrypt(encrypted_key);
// console.log(decrypted_key)
