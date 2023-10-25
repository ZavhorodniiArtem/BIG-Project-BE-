import bcrypt from "bcrypt";
import UserModel from "../../models/User"
import jwt, {JwtPayload} from "jsonwebtoken";
import {TUserProfileWithDoc} from "../../controllers/me/types";

export const AuthService = {
  async register(email: string, password: string) {
    try {
      const salt: string = await bcrypt.genSalt(10);
      const hash: string = await bcrypt.hash(password, salt);

      const user = new UserModel({
        email,
        passwordHash: hash,
      });

      return await user.save()
    } catch (error) {
      throw new Error("Something went wrong.");
    }
  },

  async login(email: string, password: string) {
    try {
      const user: TUserProfileWithDoc | null = await UserModel.findOne({email});

      if (!user) {
        return {error: "This user not found"};
      }

      const isValidPass: boolean = await bcrypt.compare(password, user.passwordHash);

      if (!isValidPass) {
        return {error: "Email or password is wrong"};
      }

      user.token = jwt.sign(
        {
          _id: user._id
        },
        "secretPass",
        {expiresIn: "15m"}
      );

      user.refreshToken = jwt.sign(
        {
          _id: user._id,
        },
        "refreshSecretPass",
        {expiresIn: '1d'}
      );

      const userData = await user.save();
      return userData.toObject();
    } catch (error) {
      throw new Error("Authentication failed");
    }
  },

  async refreshToken(refreshToken: string) {
    try {

      if (!refreshToken) {
        return {error: "Refresh token is missing"};
      }

      const decodedRefreshToken = jwt.verify(refreshToken, "refreshSecretPass") as JwtPayload;

      if (!decodedRefreshToken) {
        return {error: "Invalid refresh token"};
      }

      const newToken: string = jwt.sign(
        {
          _id: decodedRefreshToken._id,
        },
        "secretPass",
        {expiresIn: '15m'}
      );

      return {token: newToken};

    } catch (error) {
      throw new Error("Invalid refresh token.");
    }
  },

}
