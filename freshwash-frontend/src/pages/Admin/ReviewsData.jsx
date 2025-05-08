import React, { useState } from "react";

const reviews = [
  { reservationId: 1, name: "John Doe", rating: 5, comment: "Excellent service!" },
  { reservationId: 2, name: "Jane Doe", rating: 4, comment: "Good, but could be faster." },
];

const ReviewsData = () => {
  const [reviewList, setReviewList] = useState(reviews);

  const handleDelete = (reservationId) => {
    setReviewList(reviewList.filter((review) => review.reservationId !== reservationId));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Data Review</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Reservation ID</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Komentar</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviewList.map((review) => (
              <tr key={review.reservationId} className="border-t">
                <td className="px-6 py-4">{review.name}</td>
                <td className="px-6 py-4">{review.reservationId}</td>
                <td className="px-6 py-4">{review.rating}</td>
                <td className="px-6 py-4">{review.comment}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(review.reservationId)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewsData;
