import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import * as S from './GroupScreen.style'
import WeekDayPicker from './components/WeekDayPicker'
import ContentsBox from './components/ContentsBox'
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from '@/common/style/theme'
import { Nav } from '@/types/nav'
import { groupRequest } from '@/api/groupRequest'
import { Group } from '@/types/socialType'

const GroupScreen = () => {
  const { navigate } = useNavigation<Nav>()
  const { getGroupByDate } = groupRequest
  const [contentsData, setContentsData] = useState<Group[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate().toString());

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    getList(newDate);
  }

  const renderContentsItem = ({ item }: { item: Group }) => {
    return (
      <ContentsBox GroupData={item}></ContentsBox>
    )
  }

  const getList = async (getDate: string) => { //소모임 리스트 GET 요청
    const date = new Date();
    const isoDate = `${date.getFullYear()}-${date.getMonth() + 1}-${getDate}`;
    const response = await getGroupByDate(isoDate)
    if (response) {
      setContentsData(response);
    } else {
      console.log('실패')
    }
  }

  useEffect(() => {
    getList(selectedDate)
  }, [])

  const NavToCreate = () => {
    navigate('PostGroupScreen');
  }

  const NavToJoinList = () => {
    navigate('JoinListScreen');
  }

  return (
    <S.Container>
      <S.JoinBtn onPress={(NavToJoinList)}>
        <Icon name="heart" color={theme.colors.success} size={24} />
      </S.JoinBtn>
      <S.WeekContainer>
        <WeekDayPicker selectedDate={selectedDate} onChangeDate={handleDateChange}></WeekDayPicker>
      </S.WeekContainer>
      <S.ContentsContainer>
        <FlatList
          data={contentsData}
          renderItem={renderContentsItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}>
        </FlatList>
      </S.ContentsContainer>
      <S.CreateButton onPress={((NavToCreate))}><Icon name="pencil" color={theme.colors.white} size={30}></Icon></S.CreateButton>
    </S.Container>
  )
}

export default GroupScreen
