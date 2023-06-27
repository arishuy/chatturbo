import connect from "@/utils/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt"

export const GET = async (req) => {
  const session = await getToken({ req, secret: process.env.SECRET });
  try {
      await connect();
      const users = await User.find();
    return new NextResponse( JSON.stringify(users) ,{ status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
