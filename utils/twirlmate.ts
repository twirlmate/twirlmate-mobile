const TWIRLMATE_WEB_ORIGIN = 'https://www.twirlmate.com';

export function getTwirlmateImageUrl(imageUrl: string) {
  if (imageUrl.startsWith('/static/')) {
    return `${TWIRLMATE_WEB_ORIGIN}${imageUrl}`;
  }

  return imageUrl;
}
