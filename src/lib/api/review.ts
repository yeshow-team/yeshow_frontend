import client from "@/lib/api/client";

interface ReviewType {
  reviewId: string;
  shopId: string;
  title: string;
  detail: string;
  rating: number;
}

export const deleteReview = (shopId:string) =>
    client.delete(`shop/review`, {
            data: {
                shop_uuid: shopId,
            }
        }
        ).then((res) => res.data);

export const postReview = ({shopId, title, detail, rating} :ReviewType) =>
    client.post(`shop/review`, {
            shop_uuid: shopId,
            shop_review_title: title,
            shop_review_detail: detail,
            shop_review_rating: rating
        }
    ).then((res) => res.data);

export const editReview = ({reviewId, shopId, title, detail, rating} :ReviewType) =>
    client.patch(`shop/review`, {

            review_id: reviewId,
            shop_uuid: shopId,
            shop_review_title: title,
            shop_review_detail: detail,
            shop_review_rating: rating,
        }
    ).then((res) => res.data);
