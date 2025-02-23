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

