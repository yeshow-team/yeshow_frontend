import {API_URI} from "@env";
import messaging from "@react-native-firebase/messaging";
import client from "@/lib/api/client";

export const reservation = ({shopId,date,people,price,menus}) => {
        client.post(
            `${API_URI}book`,
            {
              book: {
                shop_uuid: shopId,
                book_date: date,
                book_people: people,
                book_price: price,
                token: messaging().getToken(),
              },
              book_menu: menus
            }
        ).then((res) => {
            console.log(res.data);
        }
        )
};