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
import {useState} from "react";

interface SelectProps {
  onNext?:() => void | any;
  onBack?:() => void | any;
}

const PeopleSelect = ({onNext,onBack}:SelectProps) => {
  const [complete, setComplete] = useState<boolean>(false);
  const [people, setPeople] = useState<number>(1);
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
            <NumberInput
                value={people.toString()}
                onChangeText={text => setPeople(parseInt(text))}
                keyboardType="numeric"
            />
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

export default PeopleSelect;