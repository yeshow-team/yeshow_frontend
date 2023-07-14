import styled from "styled-components/native";

interface MenuProps {
  image: string;
  price: number;
  name: string;
  description: string;
}

const Menu = ({image, price, name, description}:MenuProps) => {
  return (
      <MenuContainer>
        <MenuContent>
          <ContentTop>
            <MenuName>{name}</MenuName>
            <Spacer8 />
            <MenuDescription>
              {description.substring(0, 13) + '...'}
            </MenuDescription>
          </ContentTop>
          <MenuPrice>
            {price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원
          </MenuPrice>
        </MenuContent>
        <MenuImage source={{uri: image}} />
      </MenuContainer>
  );
};

const Spacer8 = styled.View`
  height: 8px;
`;

const MenuContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  height: 97px;
`;

const MenuContent = styled.View`
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: flex-start;
  background: #ffffff;
`;

const ContentTop = styled.View`
  flex-direction: column;
`;

const MenuName = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: #2d2d2d;
`;

const MenuDescription = styled.Text`
  font-size: 19px;
  color: #8d8d8d;
`;

const MenuPrice = styled.Text`
  font-size: 19px;
  font-weight: 400;
  color: #2d2d2d;
`;

const MenuImage = styled.Image`
  height: 97px;
  width: 100px;
`;

export default Menu;