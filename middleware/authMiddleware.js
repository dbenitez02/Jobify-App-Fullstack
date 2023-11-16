import { UnauthenticatedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtil.js";

export const authenticateUser = async (req, res, next) => {
    const {token} = req.cookies;
 
    // Check if there is a token cookie.
    if(!token) throw new UnauthenticatedError('Authentication invalid');

    try {
        const {userId, role} = verifyJWT(token);
        req.user = {userId, role};
        next();

    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }

};
