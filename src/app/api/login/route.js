import { NextResponse } from "next/server";
import { users } from "../db";

export async function POST(req) {
  const { username, password } = await req.json();

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // Return a dummy token
    return NextResponse.json({ token: "dummyToken" });
  } else {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }
}
