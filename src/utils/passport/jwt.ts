import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { getUserById } from 'src/modules/user/documents';
import { config } from "src/system/config";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
}

export const getJwtStrategy = () => {
  return new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await getUserById(payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  });
};
