export const delayFallback = (importLink, delayMs = 1500) =>
  new Promise((resolve) => setTimeout(() => resolve(importLink), delayMs));
