import React from 'react';
import {View, Image, ColorValue, Text, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import {useRecoilState} from "recoil";
import modalState from "@/store/modal";
import TimeIcon from "@/assets/icons/time.svg";

const Modal = () => {
  const [modalData, setModalData] = useRecoilState(modalState)
  const {open, title, content, icon, buttonText} = modalData
  if(open){ return(
      <Container>
          <ModalContainer>
            <Group>
              <Title>
                {title}
              </Title>
              <IconImage
                width={130}
                height={130}
                fill={"#3DAB70"}
              />
              <Content>
                {content}
              </Content>
            </Group>
            <Button onPress={
              () => {
                setModalData({
                  title: "",
                  content: "",
                  icon: "",
                  buttonText: "",
                  open: false
                })
              }
            }>
              <ButtonText>
                {buttonText}
              </ButtonText>
            </Button>
          </ModalContainer>
      </Container>
    )
  }
  return null;
};

const Title = styled(Text)`
  color: #27292F;
  text-align: center;
  font-size: 23px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.408px;
`;

const Content = styled(Text)`
  color: #000;
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  margin-top: 8px;
  line-height: 25.5px;
  letter-spacing: -0.408px;
`;

const IconImage = styled(TimeIcon)`
  margin-top: 12px;
`

const Button = styled(TouchableOpacity)`
  width: 100%;
  height: 55px;
  flex-shrink: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background: #3DAB55;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled(Text)`
  color: #ffffff;
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.408px;
`;


const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.View`
  width: 85%;
  height: 350px;
  background-color: #fff;
  display: flex;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  padding-top: 39px;
  box-shadow: 1px 4px 10px rgba(49, 49, 49, 0.29);
`;

const Group = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;





export default Modal;