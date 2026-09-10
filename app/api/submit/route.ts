import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  const formId = process.env.FORM_ID;
  const token = process.env.FORM_TOKEN;
  const apiBaseUrl = process.env.API_BASE_URL;

  if (!formId || !token || !apiBaseUrl) {
    return NextResponse.json({ error: 'Missing configuration' }, { status: 500 });
  }

  try {
    const response = await fetch(`${apiBaseUrl}/api/public/forms/${formId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        data: data,
        email: data.email, // Assume email field is present for contact indexing
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `Upstream error: ${errorText}` }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
