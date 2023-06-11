import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native'
import * as S from './GroupScreen.style'
import PostedTextComp from './components/post/PostedTextComp';
import PostedTimeComp from './components/post/PostedTimeComp';
import PostedLocationComp from './components/post/PostedLocationComp';
import PostedImgComp from './components/post/PostedImgComp';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { RootNativeStackParamList } from '@/navigations/RootNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/navigations/BottomTabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type GroupNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

const PostGroupScreen = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation<GroupNavigationProp>()

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: '소모임 생성',
      headerTitleContainerStyle: { justifyContent: 'center', alignContent: 'center' },
      headerLeft: () => (
        <Icon name="chevron-left" size={28} onPress={() => navigation.navigate('Tab', { screen: 'Social' })} />
      ),
    })
  }, [navigation])

  return (
    <S.PostContainer>
      <View>
        <PostedImgComp></PostedImgComp>
        <PostedLocationComp></PostedLocationComp>
        <PostedTimeComp></PostedTimeComp>
        <PostedTextComp headTitle='제목' height={35} isContent={false}></PostedTextComp>
        <PostedTextComp headTitle='내용' height={300} isContent={true}></PostedTextComp>
      </View>
      <S.PostBtn><S.PostBtnText>등록</S.PostBtnText></S.PostBtn>
    </S.PostContainer>
  )
}
export default PostGroupScreen