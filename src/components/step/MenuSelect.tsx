import {SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import Back from "@assets/icons/back_2.svg";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  AppContainer,
  NextButton,
  NextText,
  Question,
  QuestionContainer,
  Spacer,
  Spacer2
} from "@components/step/DesignComponents";
import {Component, ReactNode, useEffect, useState} from "react";
import menu from "@components/Menu";
import {useRecoilState, useRecoilValue} from "recoil";
import reserverState from "@/store/reservation";
import styled from "styled-components/native";

interface SelectProps {
  onNext?:() => void | any;
  onBack?:() => void | any;
}

const MenuSelect = ({onNext, onBack}:SelectProps) => {
  const [complete, setComplete] = useState<boolean>(false);
  const menu = useRecoilValue(reserverState).shopMenus;
  const [data, setData] = useRecoilState(reserverState);
  const [menus, setMenus] = useState<any>([]);
  useEffect(
      () => {
        const all = menus.length>0 && menus.reduce((acc: number, cur: any) => {
          return acc + cur.shop_menu_price * cur.menu_count;
        }, 0)
        if(all>0) {
          setData({
            ...data,
            reserverMenus: menus,
            reserverPrice: all
          })
          setComplete(true);
        }
      },[menus]
  )
  useEffect(
      () => {
        if(menu.length > 0) {
          setMenus(menu.map((item: any) => {
            return {
              ...item,
              menu_count: 0,
            }
          }))
        }
  }, [])
  return (
      <>
        <AppContainer>
          <QuestionContainer>
            <TouchableOpacity
                onPress={onBack}>
              <Back />
            </TouchableOpacity>
            <Spacer />
            <Question>
              어떤 메뉴를{'\n'}
              주문하시겠어요?
            </Question>
            <Spacer2 />
            {
               menus?.map((item: any) => {
                  return (
                      <SB style={
                        {
                          marginBottom: 20
                        }
                      }>
                        <Text style={
                          {
                            fontSize: 20,
                            fontWeight: 'bold'
                          }
                        }>{item.shop_menu_name}</Text>
                        <View>
                          <TouchableOpacity
                              onPress={() => {
                                if(item.menu_count === 0) return;
                                const index = menus.findIndex((element: any) => element.menu_id === item.menu_id);
                                menus[index].menu_count = item.menu_count - 1;
                                setMenus([...menus]);
                              }}
                          >
                            <Text>-</Text>
                          </TouchableOpacity>
                          <Text>
                            {item.menu_count}
                          </Text>
                          <TouchableOpacity
                              onPress={() => {
                                const index = menus.findIndex((element: any) => element.menu_id === item.menu_id);
                                const temp = menus;
                                temp[index].menu_count = item.menu_count + 1;
                                setMenus([...temp]);
                              }}
                          >
                            <Text>+</Text>
                          </TouchableOpacity>
                        </View>

                      </SB>
                  )

                })
            }

            <Text>총 가격 : {
              menus.length>0 && menus.reduce((acc: number, cur: any) => {
                return acc + cur.shop_menu_price * cur.menu_count;
              }, 0)
            }</Text>
          </QuestionContainer>
        </AppContainer>
        <SafeAreaView style={{backgroundColor: complete ? '#3dab70' : '#c4c4c4'}}>
          <NextButton
              onPress={onNext}
              disabled={!complete}>
            <NextText>결제</NextText>
          </NextButton>
        </SafeAreaView>
      </>
  )
}

const SB = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default MenuSelect;

