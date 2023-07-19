import {StatusBar} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeSelect from "@components/step/TimeSelect";
import PeopleSelect from "@components/step/PeopleSelect";
import MenuSelect from "@components/step/MenuSelect";
import {useRecoilState} from "recoil";
import reserverState from "@/store/reservation";
import messaging from "@react-native-firebase/messaging";
import client from "@/lib/api/client";
import {reservation} from "@/lib/api/reservation";

const Reservation = ({route, navigation}: any) => {
  // @ts-ignore
  const [step, setStep] = useState<"시간선택"|"인원선택"|"메뉴선택">("시간선택")
  const [data,setData] = useRecoilState(reserverState);

  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');

    AsyncStorage.getItem('access').then(token => {
      axios
        .get(`${process.env.API_URI}shop/menu/${route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setData({
            ...data,
            shopMenus: res.data,
          })
          console.log(res.data.length);
        });
    });
  }, []);




  return(
    <>
      {step === "시간선택" ? <TimeSelect onNext={() => setStep("인원선택")} onBack={() => navigation.goBack()} /> : null}
      {step === "인원선택" ? <PeopleSelect onNext={() => setStep("메뉴선택")} onBack={() => setStep("시간선택")} /> : null}
      {step === "메뉴선택" ? <MenuSelect onNext={async () => {
        const menud = data.reserverMenus.map((menu: any) => {
          return {
            menu_id: menu.menu_id,
            book_menu_amount: menu.menu_count,
          }
        });
        await reservation({
          shopId: route.params.id,
          people: data.reserverPeople,
          date: data.reserverDate,
          price: data.reserverPrice,
          menus: menud,
        });
        navigation.navigate('ReservationResult');}} onBack={() => setStep("인원선택")} /> : null
      }
    </>
  )
};

export default Reservation;
