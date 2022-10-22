import { IncomingHttpHeaders } from "http";
import { Request } from "express";

export interface AuthorizedRequest extends Request {
  // The authenticated user id, if the user is authenticated
  uid?: string;
}
