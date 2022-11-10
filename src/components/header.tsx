import styled from 'styled-components/native';
import AppLogo from '@assets/appLogo.svg';
import Search from '@assets/icons/search.svg';
import Logout from '@assets/icons/logout.svg';

import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const TextWithActions = ['MyInfo', 'Products'];
const IconWith = ['MyInfo', 'Products', 'Main'];

const Header = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const logout = async () => {
    const refresh = await AsyncStorage.getItem('refresh');
    console.log(refresh);
    axios
      .get('http://152.70.255.76:3000/auth/refresh', {
        headers: {
          Cookie: `${refresh};`,
        },
        withCredentials: true,
      })
      .then(res => {
        AsyncStorage.removeItem('refresh');
        AsyncStorage.removeItem('access');
        navigation.navigate('Auth');
      })
      .catch(error => {
        AsyncStorage.removeItem('refresh');
        AsyncStorage.removeItem('access');
        navigation.navigate('Auth');
      });
  };

  return (
    <Container>
      <AppLogo height={25} />

      <Icons>
        <TouchableOpacity onPress={() => navigation.push('Search')}>
          <Search height={22} />
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Logout height={22} />
        </TouchableOpacity>
      </Icons>
    </Container>
  );
};
export default Header;

const BackContainer = styled.View`
  height: 56px;
  background-color: ${({theme}) => theme.color.grade1};
  width: 100%;
  align-items: center;
  padding: 0 20px;
  left: 0;
  top: 0;
  margin: 0;
  flex-direction: row;
  justify-content: flex-start;
`;

const HeaderTitle = styled.Text`
  font-weight: 700;
  font-size: 22px;
`;

const Container = styled.View`
  height: 56px;
  background-color: white;
  width: 100%;
  align-items: center;
  padding: 0 24px;
  left: 0;
  top: 0;
  margin: 0;
  flex-direction: row;
  justify-content: space-between;
`;

const Icons = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 66px;
`;
