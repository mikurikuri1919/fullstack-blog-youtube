import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DB接続
export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}

// ブログの全記事取得API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ブログの投稿用API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();

    await main();
    const post = await prisma.post.create({ data: { title, description } });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};