class BaseError extends Error {
    override message: string;
    args: string[];

    constructor(message: string, args: string[] = []) {
        super();
        this.message = message;
        this.args = args;
    }
}

export class InternalError extends BaseError {}

export class ApiValidationError extends BaseError {
    code?: number;
    options: { field?: string };

    constructor(
        message: string,
        args: string[] = [],
        options: { field?: string } = {}
    ) {
        super(message, args);
        this.options = options;
    }
}