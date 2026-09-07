import { writeFile } from 'node:fs/promises';

const required = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_REFRESH_TOKEN',
  'GBP_ACCOUNT_ID',
  'GBP_LOCATION_ID'
];

for (const key of required) {
  if (!process.env[key]) throw new Error(`Missing required environment variable: ${key}`);
}

const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    grant_type: 'refresh_token'
  })
});

if (!tokenResponse.ok) {
  throw new Error(`OAuth token request failed: ${tokenResponse.status} ${await tokenResponse.text()}`);
}

const { access_token: accessToken } = await tokenResponse.json();
const parent = `accounts/${process.env.GBP_ACCOUNT_ID}/locations/${process.env.GBP_LOCATION_ID}`;
let pageToken = '';
const reviews = [];
let averageRating = null;
let totalReviewCount = null;

while (true) {
  const url = new URL(`https://mybusiness.googleapis.com/v4/${parent}/reviews`);
  url.searchParams.set('pageSize', '50');
  url.searchParams.set('orderBy', 'updateTime desc');
  if (pageToken) url.searchParams.set('pageToken', pageToken);

  const response = await fetch(url, {
    headers: { authorization: `Bearer ${accessToken}` }
  });

  if (!response.ok) {
    throw new Error(`Google reviews request failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  averageRating = data.averageRating ?? averageRating;
  totalReviewCount = data.totalReviewCount ?? totalReviewCount;

  for (const review of data.reviews ?? []) {
    reviews.push({
      reviewId: review.reviewId ?? review.name ?? null,
      reviewer: review.reviewer?.displayName ?? 'Google χρήστης',
      starRating: review.starRating ?? null,
      comment: review.comment ?? '',
      createTime: review.createTime ?? null,
      updateTime: review.updateTime ?? null,
      seed: false
    });
  }

  pageToken = data.nextPageToken ?? '';
  if (!pageToken) break;
}

const payload = {
  source: 'google-business-profile',
  placeId: 'ChIJFZL8h9QeWRMRqfUtw2YM0Ac',
  syncedAt: new Date().toISOString(),
  averageRating,
  totalReviewCount,
  reviews
};

await writeFile('assets/data/google-reviews.json', `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`Synced ${reviews.length} Google reviews.`);
