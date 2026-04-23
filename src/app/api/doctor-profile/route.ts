import { NextResponse } from "next/server"

export async function GET(): Promise<NextResponse<{ message: string }>> {
	return NextResponse.json({ message: "Doctor profile API is not implemented yet" }, { status: 501 })
}
