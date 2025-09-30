import bcrypt from 'bcryptjs';

const password = 'darinmasov9';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);
console.log('Hash for password "darinmasov9":', hash);
