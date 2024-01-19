// middleware\logger.js

const LoggerMiddleware = (req, res, next) => {
    console.log(`LOGGER MIDDLEWARE`);
    next();
}

export default LoggerMiddleware;