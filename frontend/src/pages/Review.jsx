import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function ReviewPage() {
  const { id } = useParams(); // provider/service id
  const location = useLocation();
  const navigate = useNavigate();

  const { provider, service } = location.state || {};

  /* ------------------ STATES ------------------ */
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // 🔹 Previous reviews (frontend demo data – replace with backend later)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Suman Karki",
      rating: 5,
      comment: "Very professional and on time. Highly recommended!",
    },
    {
      id: 2,
      user: "Anita Shrestha",
      rating: 3,
      comment: "Service was okay, could improve communication.",
    },
  ]);

  /* ------------------ SUBMIT REVIEW ------------------ */
  const submitReview = () => {
    if (!rating || !reviewText.trim()) {
      alert("Please provide both rating and review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      user: "You",
      rating,
      comment: reviewText,
    };

    // 🔹 FRONTEND UPDATE
    setReviews([newReview, ...reviews]);

    // 🔹 BACKEND PLACEHOLDER
    console.log({
      providerId: id,
      provider,
      service,
      rating,
      review: reviewText,
    });

    setRating(0);
    setReviewText("");
    setHover(0);
  };

  return (
    <div className="min-h-screen bg-[#f9f6f1] p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Review Service Provider
          </h2>
          <p className="text-gray-500">
            {provider} • {service}
          </p>
        </div>

        {/* TWO PANELS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: WRITE REVIEW */}
          <div className="lg:col-span-1 bg-gray-50 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Write Your Review
            </h3>

            {/* Star Rating */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={26}
                  className={`cursor-pointer transition ${
                    (hover || rating) >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>

            {/* Review Text */}
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
            />

            {/* Buttons */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => navigate(-1)}
                className="text-sm text-gray-500 hover:underline"
              >
                ← Back
              </button>

              <button
                onClick={submitReview}
                className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700"
              >
                Submit Review
              </button>
            </div>
          </div>

          {/* RIGHT: PREVIOUS REVIEWS */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Previous Reviews
            </h3>

            {reviews.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No reviews yet. Be the first to review!
              </p>
            ) : (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="border rounded-xl p-4 bg-white shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-800">{r.user}</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <FaStar
                            key={s}
                            size={14}
                            className={
                              s <= r.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
