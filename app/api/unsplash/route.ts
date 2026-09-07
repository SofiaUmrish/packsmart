import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const perPage = searchParams.get('per_page') || '4';
  const orientation = searchParams.get('orientation') || 'portrait';
  const contentFilter = searchParams.get('content_filter') || 'high';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is missing' }, { status: 400 });
  }

  const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;

  if (!UNSPLASH_KEY) {
    return NextResponse.json({ error: 'Server API key is missing' }, { status: 500 });
  }

  try {
    const params = new URLSearchParams({
      query,
      per_page: perPage,
      orientation,
      content_filter: contentFilter,
      client_id: UNSPLASH_KEY,
    });
    const response = await fetch(`https://api.unsplash.com/search/photos?${params.toString()}`);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from Unsplash' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}