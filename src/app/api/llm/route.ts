
import { NextResponse } from "next/server";
export async function POST(request: Request) {
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB7qaR_Itr1rOLSx_I61M4g5P2crLZ0o3w`;
    try {
        const res = await request.json();
        // console.log('PAYLOADs:', res);
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(res),
          });
        const data2 = await response.json()
        // console.log('results:', data2.candidates[0].content.parts[0].text);
        return NextResponse.json({ success: true, data: data2.candidates[0].content.parts[0].text });
      } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
      }
}

