import User from "@/models/User";
import connect from "@/utils/database";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();

  await connect();

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    return new NextResponse("User created successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse("An error occurred. Please try again later.", {
      status: 500,
    });
  }
};
