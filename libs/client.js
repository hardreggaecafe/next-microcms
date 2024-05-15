import { createClient } from 'microcms-js-sdk';
import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN, 
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
  retry: true,
  headers: {
    'Cache-Control': 'no-store',
    'CDN-Cache-Control': 'no-store',
    'Vercel-CDN-Cache-Control': 'no-store'
  }
});