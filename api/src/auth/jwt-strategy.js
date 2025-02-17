import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

import { User } from "../database/user.js";

dotenv.config();

export default passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.KEY,
    },
    async (payload, done) => {
      const user = await User.findById(payload.id);

      return user ? done(null, user) : done("Invalid Token", null);
    }
  )
);
