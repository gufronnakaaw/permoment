import bcrypt from 'bcrypt';

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

function verifyPassword(password, hashpassword) {
    return bcrypt.compare(password, hashpassword);
}

export { hashPassword, verifyPassword };
