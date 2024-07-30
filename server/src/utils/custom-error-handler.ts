class CustomError extends Error {
    statusCode: number;
    data: any;

    constructor(statusCode: number, message: string, data?: any) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;

        // Ensures the name of this error is the same as the class name
        this.name = this.constructor.name;

        // Captures the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;
