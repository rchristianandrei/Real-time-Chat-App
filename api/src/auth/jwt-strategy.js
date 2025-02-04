import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import key from "./secretKey.js";
import { users } from "../utils/userConstant.js";

export default passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: key,
    },
    (payload, done) => {
      const user = users.find((u) => u.id === payload.id);

      return user ? done(null, user) : done("Invalid Token", null);
    }
  )
);
