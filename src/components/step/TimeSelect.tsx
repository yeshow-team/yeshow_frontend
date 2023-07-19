import {useEffect, useState} from "react";
import {SafeAreaView, Text, TouchableOpacity} from "react-native";
import Back from "@assets/icons/back_2.svg";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  ActionText,
  AppContainer,
  NextButton, NextText,
  Question,
  QuestionContainer,
  Spacer,
  Spacer2
} from "@components/step/DesignComponents";
import {useRecoilState} from "recoil";
import reserverState from "@/store/reservation";

interface SelectProps {
  onNext?:() => void | any;
  onBack?:() => void | any;
}

const TimeSelect = ({onNext,onBack}:SelectProps) => {
  const [complete, setComplete] = useState<boolean>(false);
  const [data, setData] = useRecoilState(reserverState);
  const [timeVisible, setTimeVisible] = useState<boolean>(false);
  const [dateString, setDateString] = useState<string>('');
  useEffect(
      () => {
        if(data.reserverDate) {
          setComplete(true);
          setDateString(
              `${data.reserverDate.getHours() > 12 ? "오후 "+String(Number(data.reserverDate.getHours()) - 12) : date.getHours()}시 ${data.reserverDate.getMinutes()}분`
          );
        }
      }
  )
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
              언제 방문하실{'\n'}
              예정이신가요?
            </Question>
            <Spacer2 />
            <>
              <TouchableOpacity onPress={() => setTimeVisible(true)}>
                <ActionText>시간 선택하기</ActionText>
              </TouchableOpacity>
              <DateTimePickerModal
                  isVisible={timeVisible}
                  mode="time"
                  onConfirm={date => {
                    console.log(date);
                    if(date < new Date() || date > new Date(new Date().getTime() + 3 * 60 * 60 * 1000)) {
                      alert('현재 시간으로부터 3시간 이내로 선택해주세요');
                      setTimeVisible(false);
                    } else {
                      setComplete(true);
                      setData({...data, reserverDate: date});
                      setTimeVisible(false);
                      setDateString(
                          `${date.getHours() > 12 ? "오후 "+date.getHours()-12 : date.getHours()}시 ${date.getMinutes()}분`
                      );
                    }
                  }}
              />
              <Text style={
                {
                  fontSize: 40,
                  fontWeight: "bold",
                  marginTop: 20
                }
              }>
                {dateString ? dateString : '시간을 선택해주세요'}
              </Text>
            </>
          </QuestionContainer>
        </AppContainer>
        <SafeAreaView style={{backgroundColor: complete ? '#3dab70' : '#c4c4c4'}}>
          <NextButton
              onPress={onNext}
              disabled={!complete}>
            <NextText>다음</NextText>
          </NextButton>
        </SafeAreaView>
      </>
  )
};

export default TimeSelect;