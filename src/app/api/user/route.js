import { users, updateUser } from "../db";
import { NextResponse } from "next/server";

export async function GET() {
  const user = users.find((user) => user.id === 1 || user.id === 2);

  if (user) {
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request) {
  const data = await request.json();
  const updatedUser = updateUser(1, data);

  // Check for fields in the request body
  const updatedFields = {};
  if (data.username) updatedFields.username = data.username;
  if (data.password) updatedFields.password = data.password;

  if (updatedUser) {
    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
