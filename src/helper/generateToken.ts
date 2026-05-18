import jwt from "jsonwebtoken";

export interface Payload {
  id: string;
  email: string;
  name: string;
  type: "user" | "company";
}

export const generateAccessToken = (payload: Payload) =>
  jwt.sign(
    {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      type: payload.type,
    },
    process.env.JWT_SECRET! as string,
    {
      expiresIn: "7d",
    },
  );

// export const generateRefreshToken = (payload: Payload) =>
//   jwt.sign(
//     { id: payload.id, email: payload.email },
//     process.env.JWT_REFRESH_SECRET! as string,
//     {
//       expiresIn: "7d",
//     },
//   );
