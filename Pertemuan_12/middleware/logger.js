const loggerMiddleware = (req, res, next) => {
    console.log("Logger Middleware");

    next();
};

export default loggerMiddleware;