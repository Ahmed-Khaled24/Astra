import express from "express";
import { join } from "path";
import globalRouter from "./routers";
import cookieSession from "cookie-session";
import helmet from "helmet";
import "./services/passport";
import passport from "passport";
import { cookieSessionMiddleware } from "./services/cookie.session";
import { corsMiddleware } from "./middlewares/security/cors.middleware";

const api = express();
api.use(express.json());
api.use(express.static(join(__dirname, "..", "..", "client/dist")));
api.use(express.urlencoded({ extended: true }));
api.use(helmet());
api.use(corsMiddleware);
api.use(cookieSessionMiddleware);
api.use(passport.initialize());
api.use(passport.session());
api.use("/", globalRouter);
api.use("/*", (req, res) => res.sendFile(join(__dirname, "..", "..", "client/dist/index.html")));

export default api;
