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
  // console.log("URL:", url); 
  if(method === 'split'){
    return url ? url.split('/').filter(Boolean).pop() : "#";
  }else{

    return url.replace(/^https?:\/\/[^/]+\//, "").replace(/\/$/, ""); // Remove domain & trailing slashes
  }
}

export function parseRankMathData(data){
  const scriptRegex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/;

  // Apply the regex to extract the JSON-LD string
  const match = data?.head?.match(scriptRegex);

  if (match && match[1]) {
    try {
      // Parse the extracted JSON string
      const parsedJson = JSON.parse(match[1]);
      return parsedJson;
      // console.log("Extracted JSON-LD data:", parsedJson);
    } catch (error) {
      console.error("Error parsing parseRankMathData data:", error);
      throw error;
    }
  } else {
    console.error("No matching <script> tag found.");
  }
}