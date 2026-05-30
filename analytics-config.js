/* ============================================
   Beylood — Analytics Configuration
   --------------------------------------------
   Single source of truth for the GA4 Measurement
   ID and tracking behaviour. Swap the ID here and
   the whole site picks it up.

   How to get your Measurement ID:
     analytics.google.com → Admin → Data streams →
     Web → copy the value starting "G-".

   Privacy notes:
     • anonymize_ip is on by default
     • Ads signals are off
     • Do Not Track is respected
   ============================================ */
window.BEYLOOD_ANALYTICS = {
  // Replace with your own GA4 Measurement ID if needed.
  measurementId: 'G-YX4ZHPHQDB',

  // Set to true while developing if you want to keep
  // local hits out of your production reports.
  disableOnLocalhost: true,

  // Respect the browser-level Do Not Track signal.
  respectDoNotTrack: true,

  // Ask GA to anonymize IP addresses (privacy-friendly default).
  anonymizeIp: true,

  // Turn off advertising features.
  allowAdPersonalizationSignals: false
};
