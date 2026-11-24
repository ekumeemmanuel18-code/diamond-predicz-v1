# Delivery roadmap

## Foundation (included)
- Responsive dashboard UI
- Navigation shell and match cards
- Poisson 1X2 probability utility
- Demo data explicitly labelled
- Initial Supabase schema
- PWA manifest and deployment notes

## Next implementation milestones
1. Connect API-Football through server-side routes/Workers; never expose the key in browser code.
2. Persist leagues, teams and fixtures in Supabase with scheduled synchronization and cache expiry.
3. Add match detail routes and team/league pages.
4. Expand model inputs: recent form, venue splits, H2H with recency weighting, xG and lineup availability when sourced.
5. Backtest model performance by league and season; publish calibration and sample-size disclosures.
6. Add authentication, favourites and admin roles with server-side authorization.
7. Add live event polling/webhooks where provider plan permits.
8. Add rollover calculator and PWA service worker caching.
9. Add automated tests, observability, rate limiting and production deployment.

## Production gate
Do not advertise the product as live or production-ready until real provider access, data licensing/terms, database policies, API rate limits, security review, model backtesting and deployment smoke tests are complete.
