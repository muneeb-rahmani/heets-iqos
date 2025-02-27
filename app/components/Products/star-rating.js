
export function StarRating({ rating, reviews, isCustomerReview = true, isRating = true }) {
    return (
      <div className="flex items-center gap-1 flex-wrap justify-center">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-sm ${
                i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        {isRating && <span className="text-sm">{rating}</span>}
        {isCustomerReview && (
          <span className="text-sm text-gray-600 text-center">({reviews} Customer reviews)</span>
        )}
      </div>
    )
  }
  