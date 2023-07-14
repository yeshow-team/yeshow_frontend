import {SafeAreaView, Text, TouchableOpacity} from "react-native";
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
import {Component, ReactNode, useState} from "react";
import menu from "@components/Menu";
import {useRecoilValue} from "recoil";
import reserverState from "@/store/reservation";

interface SelectProps {
  onNext?:() => void | any;
  onBack?:() => void | any;
}

const MenuSelect = ({onNext, onBack}:SelectProps) => {
  const [complete, setComplete] = useState<boolean>(false);
  const menu = useRecoilValue(
      reserverState
  ).shopMenus;
  const [selectedMenu, setSelectedMenu] = useState<any>([]);
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

            </Question>
            <Spacer2 />
            {
                menu.map((item: any) => {
                  return (
                      <TouchableOpacity>
                        <Text>{item.shop_menu_name}</Text>
                      </TouchableOpacity>
                  );
                })
            }
          </QuestionContainer>
        </AppContainer>
        <SafeAreaView style={{backgroundColor: complete ? '#3dab70' : '#d9d9d9'}}>
          <NextButton
              onPress={onNext}
              disabled={!complete}>
            <NextText>다음</NextText>
          </NextButton>
        </SafeAreaView>
      </>
  )
}

export default MenuSelect;

