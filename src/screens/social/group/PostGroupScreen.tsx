import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import * as S from './GroupScreen.style'
import PostTextComp from '../commonComp/PostTextComp';
import PostTimeComp from './components/post/PostTimeComp';
import PostLocationComp from './components/post/PostLocationComp';
import PostImgComp from '../commonComp/PostImgComp';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import { RootNativeStackParamList } from '@/navigations/RootNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/navigations/BottomTabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { groupRequest } from '@/api/groupRequest'
import PostPeopleComp from './components/post/PostPeopleComp';
import { SetFormattedTwoDigitNumber } from '@/utils/formattedNum';
import { useRecoilValue } from 'recoil';
import { userStatesAtom } from '@/recoil/atoms/userStatesAtom'
import { ScreenType } from '@/types/postGroupTypes';
import { Group, ImageData } from '@/types/socialType';

type GroupNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

type RootStackParamList = {
  PostGroupScreen: { screenType: ScreenType, groupData?: Group },
};

type PostScreenRouteProp = RouteProp<RootStackParamList, 'PostGroupScreen'>;
type PostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PostGroupScreen'>;

type PostScreenProps = {
  route: PostScreenRouteProp;
  navigation: PostScreenNavigationProp;
};

const PostGroupScreen: React.FC<PostScreenProps> = ({ route }) => {
  const { screenType, groupData } = route.params;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [selectedRegion, setSelectedRegion] = useState("서울특별시");
  const [selectedCity, setSelectedCity] = useState("강남구");
  const [peopleNumber, setPeopleNumber] = useState(2);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<ImageData>();
  const navigation = useNavigation<GroupNavigationProp>()
  const { insertGroup, patchGroup } = groupRequest
  const user = useRecoilValue(userStatesAtom);

  // state 변수 업데이트 함수 정의
  const handleDateChange = (newDate: Date) => {
    console.log(newDate);
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

  const handleImageChange = (newImage: ImageData) => {
    setImage(newImage);
  }

  const resetState = () => {
    setDate(new Date());
    setTime(new Date());
    setSelectedRegion("서울특별시");
    setSelectedCity("강남구");
    setPeopleNumber(2);
    setTitle('');
    setDescription('');
  };

  const setState = () => {
    if (groupData) {
      const TimeDate = new Date(groupData.groupDate);
      TimeDate.setHours(groupData.groupHour);
      TimeDate.setMinutes(groupData.groupMin);
      const firstSpaceIndex = groupData.groupLocation.indexOf(" ");
      setDate(new Date(groupData.groupDate));
      setTime(TimeDate);
      setSelectedRegion(groupData.groupLocation.slice(0, firstSpaceIndex));
      setSelectedCity(groupData.groupLocation.slice(firstSpaceIndex + 1));
      setPeopleNumber(groupData.groupPeopleLimit);
      setTitle(groupData.title);
      setDescription(groupData.description);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const isPost = screenType === "Post";
      navigation.setOptions({
        headerTitleAlign: 'center',
        headerTitle: isPost ? '소모임 생성' : '소모임 수정',
        headerTitleContainerStyle: { justifyContent: 'center', alignContent: 'center' },
        headerLeft: () => (
          <Icon name="chevron-left" size={28} onPress={() => navigation.navigate('Tab', { screen: 'Social', params: { tab: 'group' } })} />
        ),
      })
      if (isPost) {
        resetState();
      }
      else {
        setState();
      }
    });

    return unsubscribe;
  }, [navigation, screenType, groupData])

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
        image: image.uri,
      }
      if (user.user) {
        if (screenType === "Post") {
          const response = await insertGroup(GroupData, user?.user?.id)
          if (response) {
            console.log("소모임 생성 성공")
            console.log(response)
            navigation.navigate('Tab', { screen: 'Social', params: { tab: 'group' } })
          }
        }
        else {
          if (groupData?.groupId) {
            const response = await patchGroup(GroupData, groupData?.groupId)
            if (response) {
              console.log("소모임 수정 성공")
              console.log(response)
              navigation.navigate('Tab', { screen: 'Social', params: { tab: 'group' } })
            }
          }
        }

      }
    } catch (error: any) {
      const { msg } = error
      Alert.alert('소모임 생성 실패', msg ? msg : '소모임 생성에 실패했습니다.')
    }
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <S.PostContainer>
        <View>
          <PostImgComp imageData={image} onChangeImageData={handleImageChange}></PostImgComp>
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
        <S.Btn onPress={CreateGroupPressed}><S.BtnText>{screenType === "Post" ? "등록" : "수정"}</S.BtnText></S.Btn>
      </S.PostContainer>
    </TouchableWithoutFeedback>
  )
}
export default PostGroupScreen