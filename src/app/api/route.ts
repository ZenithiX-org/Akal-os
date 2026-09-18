import { NextResponse } from "next/server";

// Simple status endpoint for the Akal OS runtime.
export async function GET() {
  return NextResponse.json({
    name: 'Akal OS',
    version: '1.0',
    runtime: process.env.AKAL_RUNTIME === 'kiosk' ? 'kiosk' : 'web',
    uptime: process.uptime(),
  });
}
