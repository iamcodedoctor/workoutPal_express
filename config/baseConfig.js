import dotenv from 'dotenv'
dotenv.config();

export default {
    port: process.env.PORT,
    dbUri: process.env.DATABASE_URI,
}