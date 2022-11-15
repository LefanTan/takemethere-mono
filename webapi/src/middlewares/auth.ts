import { NextFunction, Response } from "express";
import { firebaseAdmin } from "../config";
import { AuthorizedRequest } from "../types/request";

/**
 * Middleware to check for user authentication
 * by checking the Authorization header
 * @param req
 * @param res
 * @param next
 */
export async function authenticateJWT(
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // If the provided ID token has the correct format, is not expired, and is
    // properly signed, the method returns the decoded ID token
    try {
      const { uid } = await firebaseAdmin.auth().verifyIdToken(token);
      req.uid = uid;
      return next();
    } catch (err) {
      return res.status(403).json(err);
    }
  }
  return res.sendStatus(403);
}
