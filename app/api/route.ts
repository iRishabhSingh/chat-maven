import User from "@/models/User";
import connect from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connect();

  try {
    const user = await User.find();
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
