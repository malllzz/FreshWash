import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewsData = () => {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    // Fetch reviews data from the API
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/reviews");
        setReviewList(response.data); // Update review list state
      } catch (error) {
        console.error("Gagal mengambil data review:", error);
      }
    };
    
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/reviews/${reviewId}`);
      setReviewList(reviewList.filter((review) => review.review_id !== reviewId)); // Update state after deletion
    } catch (error) {
      console.error("Gagal menghapus review:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Data Review</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-center">Nama</th>
              <th className="px-6 py-3 text-center">Order ID</th>
              <th className="px-6 py-3 text-center">Rating</th>
              <th className="px-6 py-3 text-center">Komentar</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviewList.map((review) => (
              <tr key={review.review_id} className="border-t">
                <td className="px-6 py-4">{review.user}</td>
                <td className="px-6 py-4">{review.order_id}</td>
                <td className="px-6 py-4">{review.rating}</td>
                <td className="px-6 py-4">{review.comment}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(review.review_id)}
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
