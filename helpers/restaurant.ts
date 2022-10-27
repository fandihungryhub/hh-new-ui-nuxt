import { toSlug } from "./string";

export function linkToRestaurantPage(slug: string) {
  if (!slug) {
    return "";
  }
  return `/restaurants/${slug}`;
}

export function linkSearhByCuisine(cuisineId: string | number) {
  return `/restaurants/search?cuisines[]=${cuisineId}`;
}

export function linkSearchByTags(tagId: string | number) {
  return `/restaurants/search?hashtags=${tagId}`;
}

export function createLoopId({
  name,
  id,
}: {
  name: string;
  id: number | string;
}) {
  return `${toSlug(name)}-${id}`;
}
