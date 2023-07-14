import styled from "styled-components/native";
import {SafeAreaView} from "react-native";

export const NextText = styled.Text`
  font-size: 19px;
  font-weight: 600;
  color: white;
`;

export const NextButton = styled.TouchableOpacity`
  background-color: #3dab70;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

export const NumberInput = styled.TextInput`
  width: 100%;
  height: 50px;
  font-size: 19px;
  border: 0;
  border-bottom-width: 1px;
  border-bottom-color: #000;
`;

export const AppContainer = styled(SafeAreaView)`
  flex: 1;
  height: 100%;
  background-color: white;
  align-items: center;
  width: 100%;
`;

export const ActionText = styled.Text`
  font-size: 19px;
  color: #3dab70;
  font-weight: 600;
`;

export const QuestionContainer = styled.View`
  display: flex;
  padding: 57px 26px 0 26px;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

export const Question = styled.Text`
  font-size: 27px;
  font-weight: 600;
  color: #2d2d2d;
  line-height: 34px;
`;

export const Spacer = styled.View`
  height: 37px;
`;

export const Spacer2 = styled.View`
  height: 50px;
`;
