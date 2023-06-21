import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native'
import * as S from './GroupScreen.style'
import PostTextComp from './components/post/PostTextComp';
import PostTimeComp from './components/post/PostTimeComp';
import PostLocationComp from './components/post/PostLocationComp';
import PostImgComp from './components/post/PostImgComp';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { RootNativeStackParamList } from '@/navigations/RootNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/navigations/BottomTabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { groupRequest } from '@/api/groupRequest'
import PostPeopleComp from './components/post/PostPeopleComp';
import { SetFormattedTwoDigitNumber } from '@/utils/formattedNum';
import { useRecoilValue } from 'recoil';
import { userStatesAtom } from '@/recoil/atoms/userStatesAtom'

type GroupNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

const PostGroupScreen = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [selectedRegion, setSelectedRegion] = useState("서울특별시");
  const [selectedCity, setSelectedCity] = useState("강남구");
  const [peopleNumber, setPeopleNumber] = useState(2);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation<GroupNavigationProp>()
  const { insertGroup } = groupRequest
  const user = useRecoilValue(userStatesAtom);

  // state 변수 업데이트 함수 정의
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const handleTimeChange = (newTime: Date) => {
    setTime(newTime);
  };

  const handleRegionChange = (newRegion: string) => {
    setSelectedRegion(newRegion);
  };

  const handleCityChange = (newCity: string) => {
    setSelectedCity(newCity);
  };

  const handlePeopleNumChange = (newNum: number) => {
    setPeopleNumber(newNum);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };

  const resetState = () => {
    setDate(new Date());
    setTime(new Date());
    setSelectedRegion("서울특별시");
    setSelectedCity("강남구");
    setPeopleNumber(2);
    setTitle('');
    setDescription('');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetState();
    });
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: '소모임 생성',
      headerTitleContainerStyle: { justifyContent: 'center', alignContent: 'center' },
      headerLeft: () => (
        <Icon name="chevron-left" size={28} onPress={() => navigation.navigate('Tab', { screen: 'Social', params: { tab: 'group' } })} />
      ),
    })
    return unsubscribe;
  }, [navigation])

  const CreateGroupPressed = async () => {
    if (!title || !description) {
      Alert.alert('소모임 생성 실패', '제목과 내용을 입력해주세요.');
      return;
    }

    const groupdt = `${date.getFullYear()}-${SetFormattedTwoDigitNumber(date.getMonth() + 1)}-${SetFormattedTwoDigitNumber(date.getDate())}`
    try {
      const GroupData = {
        title: title,
        description: description,
        groupDate: groupdt,
        groupPeopleLimit: peopleNumber,
        groupHour: time.getHours(),
        groupMin: time.getMinutes(),
        groupLocation: `${selectedRegion} ${selectedCity}`,
      }
      console.log(GroupData);
      const response = await insertGroup(GroupData, user?.user?.id)
      if (response) {
        console.log("소모임 생성 성공")
        console.log(response)
        navigation.navigate('Tab', { screen: 'Social', params: { tab: 'group' } })
      }
    } catch (error: any) {
      const { msg } = error
      Alert.alert('소모임 생성 실패', msg ? msg : '소모임 생성에 실패했습니다.')
    }
  }

  return (
    <S.PostContainer>
      <View>
        <PostImgComp></PostImgComp>
        <PostLocationComp
          selectedCity={selectedCity} selectedRegion={selectedRegion} onChangeCity={handleCityChange} onChangeRegion={handleRegionChange}>
        </PostLocationComp>
        <PostTimeComp
          date={date} time={time} onChangeDate={handleDateChange} onChangeTime={handleTimeChange}>
        </PostTimeComp>
        <PostPeopleComp selectedNumber={peopleNumber} onChangeNumber={handlePeopleNumChange}></PostPeopleComp>
        <PostTextComp text={title} OnChangeText={handleTitleChange} headTitle='제목' height={35} isContent={false}></PostTextComp>
        <PostTextComp text={description} OnChangeText={handleDescriptionChange} headTitle='내용' height={300} isContent={true}></PostTextComp>
      </View>
      <S.Btn onPress={CreateGroupPressed}><S.BtnText>등록</S.BtnText></S.Btn>
    </S.PostContainer>
  )
}
export default PostGroupScreen