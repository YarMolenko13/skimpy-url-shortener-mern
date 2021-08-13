

class ApiError extends Error {
    status
    error

    constructor(status, message, error='') {
        super(message)
        this.status = status
        this.error = error
    }

    static unprocessable(msg, res) {
        // return new ApiError(422)
        return res.status(422).json({message: msg, status: 422})
    }

    static forbidden(message='Forbidden') {
        return new ApiError(403, message)
    }

    static unauthhorizedError() {
        return new ApiError(401, 'Unauthorized')
    }

    static badRequest(message) {
        return new ApiError(400, message)
    }
}

module.exports = ApiError