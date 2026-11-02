import "dotenv/config"; // this line reads the .env file and loads the variables into node.js's process.env

export default {
    port: process.env.PORT || 3000,
    database_url: process.env.DATABASE_URL,
    app_url: process.env.APP_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.ACCESS_SECRET!,
    jwt_refresh_secret: process.env.REFRESH_SECRET!,
    jwt_access_expires_in: process.env.ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.REFRESH_EXPIRES_IN,
    client_url: process.env.CLIENT_URL,
}