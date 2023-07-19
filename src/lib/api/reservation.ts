import messaging from "@react-native-firebase/messaging";
import client from "@/lib/api/client";

export const reservation = async ({shopId, date, people, price, menus}) => {
  const bookData = {
        shop_uuid: shopId,
        book_date: date,
        book_people: people,
        book_price: price,
        token: await messaging().getToken(),
  }
  client.post(
      `book`,
      {
        book: bookData,
        book_menu: menus
      }
  ).then((res) => {
        console.log(res.data);
      }
  )
};