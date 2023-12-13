import { UnauthenticatedError, UnauthorizedError, BadRequestError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtil.js";

export const authenticateUser = (req, res, next) => {
    const {token} = req.cookies;
 
    // Check if there is a token cookie.
    if(!token) throw new UnauthenticatedError('Authentication invalid');

    try {
        const {userId, role} = verifyJWT(token);
        const testUser = userId === '65796a6d77860b6708ec97c2'
        req.user = { userId, role, testUser };
        next();

    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }

};

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized access.')
        }
        next();
    };
}

export const checkForTestUser = (req, res, next) => {
    if(req.user.testUser) throw new BadRequestError('Demo user. Read Only!'); // Checks for demo user.
    next();
}