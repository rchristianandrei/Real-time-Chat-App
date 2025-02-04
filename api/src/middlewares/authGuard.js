import passport from "passport";

export default function authGuard() {
  return passport.authenticate("jwt", { session: false });
}
