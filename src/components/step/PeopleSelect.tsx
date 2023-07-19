import {SafeAreaView, Text, TouchableOpacity} from "react-native";
import Back from "@assets/icons/back_2.svg";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  AppContainer, NextButton, NextText,
  NumberInput,
  Question,
  QuestionContainer,
  Spacer,
  Spacer2
} from "@components/step/DesignComponents";
import {useEffect, useState} from "react";

interface SelectProps {
  onNext?:() => void | any;
  onBack?:() => void | any;
}

const PeopleSelect = ({onNext,onBack}:SelectProps) => {
  const [complete, setComplete] = useState<boolean>(false);
  const [people, setPeople] = useState<number>(1);
  useEffect(
      () => {
        people > 0 ? setComplete(true) : setComplete(false);
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
              몇 명이{'\n'}
              오시나요?
            </Question>
            <Spacer2 />
            <NumberInput
                value={people.toString()}
                onChangeText={text => setPeople(text)}
                returnKeyType="done"
                keyboardType="number-pad"
                maxLength={2}
            />
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
}

export default PeopleSelect;