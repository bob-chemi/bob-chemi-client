import { useState } from 'react'
import { FlatList, } from 'react-native'
import * as S from './WeekDayPicker.style'

const WeekDayPicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate().toString());
  const weekDates = getWeekDates();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDatePress = (date: string) => {
    setSelectedDate(date);
  };

  const renderDateItem = ({ item, index }: { item: string; index: number }) => {
    const isSelected = item === selectedDate;
    return (
      <S.DateBtn
        onPress={() => handleDatePress(item)}
      >
        <S.TextDay>{weekDays[index]}</S.TextDay>
        <S.TextDate isSelected={isSelected}>{item}</S.TextDate>
      </S.DateBtn>
    );
  };

  return (
    <FlatList
      data={weekDates}
      renderItem={renderDateItem}
      keyExtractor={(item) => item}
      numColumns={7}
    />
  );
}


//이번주 day 배열 가져오기
const getWeekDates = () => {
  const weekDates = [];
  const currentDate = new Date();

  // 이번주의 첫 일
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());

  // 7일 동안의 날짜를 배열에 추가
  for (let i = 0; i < 7; i++) {
    const day = new Date(currentDate);
    weekDates.push(day.getDate().toString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekDates;
}

export default WeekDayPicker