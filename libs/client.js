import { createClient } from 'microcms-js-sdk';

export const runtime = 'edge';
export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN, 
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
  retry: true,
  customFetch: (input, init) => {
    const newInput = new URL(input)
    const time = new Date()
    newInput.searchParams.set('cacheclearparam', `${time.getMinutes()}`)
    return fetch(newInput.href, init)
  },
});