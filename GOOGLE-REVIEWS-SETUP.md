# Google Reviews automatic sync

The site is prepared to display reviews from `assets/data/google-reviews.json`.

## Official source

Google Business Profile API endpoint:

`GET https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews`

The sync script is `scripts/sync-google-reviews.mjs` and retrieves every page of reviews.

## Required GitHub repository secrets

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`
- `GBP_ACCOUNT_ID`
- `GBP_LOCATION_ID`

Never commit any of these values to the repository.

## One-time Google requirement

The Athletico Business Profile owner/manager must authorize the Google Cloud OAuth application once. Google Business Profile API access must also be enabled/approved for that Cloud project.

After authorization, the workflow `.github/workflows/sync-google-reviews.yml` refreshes the public JSON feed. The workflow is branch-safe and does not contain credentials.

## Athletico Google Place ID

`ChIJFZL8h9QeWRMRqfUtw2YM0Ac`

The public review CTA uses:

`https://search.google.com/local/writereview?placeid=ChIJFZL8h9QeWRMRqfUtw2YM0Ac`

## Production rule

Do not enable production deployment or merge solely for this integration. Complete OAuth, validate the feed, then obtain owner approval before merge/production.
