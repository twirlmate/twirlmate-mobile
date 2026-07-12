export function buildEventDetailHref(id: number | string, detailUrl: string) {
  return `/events/${id}?detailUrl=${encodeURIComponent(detailUrl)}`;
}

export function buildPersonDetailHref(id: number | string, detailUrl: string) {
  return `/people/${id}?detailUrl=${encodeURIComponent(detailUrl)}`;
}

export function buildGroupDetailHref(id: number | string, detailUrl: string) {
  return `/groups/${id}?detailUrl=${encodeURIComponent(detailUrl)}`;
}
