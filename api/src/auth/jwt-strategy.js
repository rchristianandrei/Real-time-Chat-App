import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import key from "./secretKey.js";
import { User } from "../database/user.js";

export default passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: key,
    },
    async (payload, done) => {
      const user = await User.findById(payload.id);

      return user ? done(null, user) : done("Invalid Token", null);
    }
  )
);
