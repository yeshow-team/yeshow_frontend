import {useState} from "react";
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

interface SelectProps {
  onNext?:() => void | any;
  onBack?:() => void | any;
}

const TimeSelect = ({onNext,onBack}:SelectProps) => {
  const [complete, setComplete] = useState<boolean>(false);
  const [reservationDate, setReservationDate] = useState('');
  const [timeVisible, setTimeVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
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
                    setDate(date.toString());
                    console.log(date);
                    setTimeVisible(false);
                  }}
                  onCancel={() => {
                    setTimeVisible(false);
                  }}
              />
              <Text>{date}</Text>
            </>
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
};

export default TimeSelect;