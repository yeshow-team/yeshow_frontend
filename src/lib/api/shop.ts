import client from "@/lib/api/client";

export const getShop = (shopUuid:string) =>
  client.get(`shop/${shopUuid}`).then((res) => res.data.shop);
export const getMenu = (shopUuid:string) =>
    client.get(`shop/menu/${shopUuid}`).then((res) => res.data);

export const getReview = (shopUuid:string) =>
    client.get(`shop/review/${shopUuid}`).then((res) => res.data);

export const getShopAll = () =>
    client.get(`shop`).then((res) => res.data);