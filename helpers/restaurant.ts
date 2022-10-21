import { relativeTime } from "./dateTime";
import { toSlug } from "./string";

export function linkToRestaurantPage(slug: string) {
  if (!slug) {
    return "";
  }
  return `/restaurants/${slug}`;
}

export function isNewRestaurant(reviewsCount: number) {
  return reviewsCount < 5;
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

export function generateLastBookingCTA({
  lastBooking,
  reviewsCount,
  totalCovers,
  earlyReviewPoint,
}: {
  lastBooking: string;
  reviewsCount: number;
  totalCovers: number;
  earlyReviewPoint: number;
}) {
  const lastBookingMadeDate = new Date(lastBooking).getTime();
  const dayBeforeYesterday = new Date().getTime() - 60 * 60 * 1000 * 24 * 3;
  if (dayBeforeYesterday <= lastBookingMadeDate) {
    const relative = relativeTime(lastBookingMadeDate);
    return `lastReservationCTA ${relative}`;
  }
  if (reviewsCount < 5) {
    return `newRestaurantCTA ${earlyReviewPoint}`;
  }
  return `totalRestaurantBookingCTA ${totalCovers}`;
}
