import { unserialize } from "php-serialize";

export function ratingCalc(reviews) {
  const totalRating = reviews?.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  return averageRating;
}

export const parseSerializedData = (serializedString) => {
  try {
    return unserialize(serializedString);
  } catch (error) {
    console.error("Parsing error:", error);
    return null;
  }
};

export async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getSlug(url, method) {
  if(method === 'split'){
    return url.split('/').filter(Boolean).pop();
  }else{

    return url.replace(/^https?:\/\/[^/]+\//, "").replace(/\/$/, ""); // Remove domain & trailing slashes
  }
}
