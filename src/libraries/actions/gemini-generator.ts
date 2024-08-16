'use server';

import { env } from 'process';

export const GenerateText = async (prompt: string) => {
  try {
    const apiKey = env.NEXT_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    const body = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    const data = await response.json();
    return {
      status: 'success',
      code: 200,
      message: 'Success generate text',
      data: data.candidates[0].content.parts[0].text,
    };
  } catch (error: unknown) {
    const errorRes = error as Error;
    console.error(errorRes.message);
    return {
      status: 'error',
      code: 500,
      message: 'Internal server error',
      data: null,
    };
  }
};
