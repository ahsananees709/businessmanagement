import jwt from "jsonwebtoken"
import User from "../../models/User.js"
import { JWT_PRIVATE_KEY, JWT_ACCESS_EXPIRATION_TIME, JWT_REFRESH_EXPIRATION_TIME, FRONTEND_MAIN_URL } from "./constants.js"

const createOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

const createJWTToken = async payload => {
  try {
    console.log("payload", payload)
    const accessToken = await jwt.sign({ id: payload, tokenType: "access" }, JWT_PRIVATE_KEY, { expiresIn: JWT_ACCESS_EXPIRATION_TIME })

    const refreshToken = await jwt.sign({ id: payload, tokenType: "refresh" }, JWT_PRIVATE_KEY, { expiresIn: JWT_REFRESH_EXPIRATION_TIME })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new Error("Token generation failed")
  }
}

const verifyToken = token => {
  try {
      return jwt.verify(token,
          JWT_PRIVATE_KEY)
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("TokenExpiredError")
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("InvalidTokenError")
    }
    throw new Error("TokenVerificationError")
  }
}

const getAccessToken = req => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    return req.headers.authorization.split(" ")[1]
  }
  if (req.cookies && req.cookies.accessToken) {
    return req.cookies.accessToken
  }

  return null
}

const getRefreshToken = req => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    return req.headers.authorization.split(" ")[1]
  }
  if (req.cookies && req.cookies.accessToken) {
    return req.cookies.refreshToken
  }

  return null
}

function getTokenFromCookies(req) {
  return req.cookies?.accessToken || null
}

const generateAccountActivationLink = (email, otp) => {
  const token = jwt.sign({ email, otp }, JWT_PRIVATE_KEY, { expiresIn: "30m" })
  const activationLink = `${FRONTEND_MAIN_URL}/userverification?token=${token}`

  return activationLink
}

const verifyAccountActivationLink = async (token) => {
  try {
    const decoded = verifyToken(token);
    const { email, otp } = decoded;
    const userRecord = await User.findOne({email})

    if (!userRecord) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    if (userRecord.isVerified) {
      const err = new Error("User is already verified.");
      err.status = 409;
      throw err;
    }

    if (userRecord.otp !== otp) {
      const err = new Error("Invalid OTP");
      err.status = 400;
      throw err;
    }

    return userRecord;
  } catch (error) {
    if (error.message === "TokenExpiredError") {
      const err = new Error("Activation link has expired");
      err.status = 400;
      throw err;
    }
    if (error.message === "InvalidTokenError") {
      const err = new Error("Invalid activation link");
      err.status = 400;
      throw err;
    }
    throw error;
  }
};

function generateRandomPassword() {
  const length = 8

  const lowerCase = "abcdefghijklmnopqrstuvwxyz"
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "0123456789"
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?"

  let password = ""
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)]
  password += upperCase[Math.floor(Math.random() * upperCase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += specialChars[Math.floor(Math.random() * specialChars.length)]

  const allChars = lowerCase + upperCase + numbers + specialChars

  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }

  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("")
}




export {
  createOTP,
  createJWTToken,
  getAccessToken,
  getRefreshToken,
  verifyToken,
  generateAccountActivationLink,
  verifyAccountActivationLink,
  generateRandomPassword,
  getTokenFromCookies,
}
