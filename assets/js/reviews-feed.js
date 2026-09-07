(() => {
  if (window.__ATHLETICO_REVIEWS_FEED__) return;
  window.__ATHLETICO_REVIEWS_FEED__ = true;

  let feed = document.querySelector('[data-google-reviews-feed]');
  let limit = 0;

  if (!feed) {
    const homeKicker = [...document.querySelectorAll('.kicker')]
      .find((node) => node.textContent.trim().toLowerCase() === 'google reviews');
    const homeSection = homeKicker?.closest('.section');
    feed = homeSection?.querySelector('.reviews-editorial,.team-grid') || null;
    if (feed) limit = 2;
  }

  if (!feed) return;

  const source = feed.dataset.source || 'assets/data/google-reviews.json';
  limit = Number(feed.dataset.limit || limit || 0);
  const status = document.querySelector('[data-google-reviews-status]');

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const stars = (rating) => {
    const numeric = Number(rating);
    if (!Number.isFinite(numeric) || numeric < 1) return '';
    return `<div class="review-stars" aria-label="${numeric} από 5 αστέρια">${'★'.repeat(Math.min(5, Math.round(numeric)))}</div>`;
  };

  fetch(source, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('reviews feed unavailable');
      return response.json();
    })
    .then((data) => {
      const reviews = Array.isArray(data.reviews) ? data.reviews : [];
      const visible = limit > 0 ? reviews.slice(0, limit) : reviews;
      if (!visible.length) return;

      feed.innerHTML = visible.map((review) => `
        <article class="review-card">
          ${stars(review.starRating)}
          <div class="eyebrow">GOOGLE REVIEW</div>
          <p class="lead">«${escapeHtml(review.comment || '')}»</p>
          <p class="muted">${escapeHtml(review.reviewer || 'Google χρήστης')}</p>
        </article>
      `).join('');

      if (status && data.syncedAt) {
        const date = new Date(data.syncedAt);
        status.textContent = Number.isNaN(date.getTime())
          ? 'Κριτικές από Google Business Profile.'
          : `Τελευταίος συγχρονισμός Google: ${date.toLocaleDateString('el-GR')}`;
      }
    })
    .catch(() => {
      if (status) status.textContent = 'Εμφανίζονται οι τελευταίες επαληθευμένες κριτικές που έχουμε αποθηκεύσει.';
    });
})();
