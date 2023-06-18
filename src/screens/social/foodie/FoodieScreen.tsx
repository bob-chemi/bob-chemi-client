import { useNavigation } from '@react-navigation/native'
import { foodieRequest } from '@/api/foodieRequest';
import { FoodieBoard, foodieVirtualData } from '@/types/socialType';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import BoardItem from './components/BoardItem';
import * as S from './FoodieScreen.style'
import theme from '@/common/style/theme';
import { Nav } from '@/types/nav';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { getFoodieList } = foodieRequest

const FoodieScreen = () => {
  const { navigate } = useNavigation<Nav>()
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<FoodieBoard[]>([]);

  const getList = async () => { //맛잘알 리스트 GET 요청
    const response = await getFoodieList()
    if (response) {
      console.log('맛잘알 가져오기 성공')
      console.log(response)
      setSearchResults(foodieVirtualData);
    } else {
      console.log('실패')
    }
  }

  useEffect(() => {
    getList()
  }, [])

  // 게시글 검색 함수
  const searchPosts = () => {
    // 검색 로직 구현
    // setSearchResults([...]);
  };

  const renderContentsItem = ({ item }: { item: FoodieBoard }) => {
    return (
      <View>
        <BoardItem BoardData={item}></BoardItem>
        <S.PostItemSeparator></S.PostItemSeparator>
      </View>
    )
  }

  const NavToCreate = () => {
    navigate('PostFoodieScreen');
  }

  return (
    <S.FoodieContainer>
      <S.SearchInput
        placeholder="제목 검색"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={searchPosts}
      />
      <S.TotalCount>총 {searchResults.length}건</S.TotalCount>
      <S.PostItemSeparator></S.PostItemSeparator>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderContentsItem}
      />
      <S.CreateButton onPress={NavToCreate}><Icon name="pencil" color={theme.colors.white} size={30}></Icon></S.CreateButton>
    </S.FoodieContainer>
  );
};


export default FoodieScreen;