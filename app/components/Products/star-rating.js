
export function StarRating({ rating, reviews }) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-sm">{rating}</span>
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
        <span className="text-sm text-gray-600">({reviews} Reviews)</span>
      </div>
    )
  }
  