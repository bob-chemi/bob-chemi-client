import React from 'react'
import { useState, useEffect } from 'react'
import { FlatList, } from 'react-native'
import * as S from '../../commonComp/GroupScreen.style'

interface PostWeekDayCompProps {
  children?: React.ReactNode;
  selectedDate: string;
  onChangeDate: (newDate: string) => void;
}

const WeekDayPicker: React.FC<PostWeekDayCompProps> = ({ selectedDate, onChangeDate }) => {
  //const [selectedDate, setSelectedDate] = useState(new Date().getDate().toString());
  const weekDates = getWeekDates();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDatePress = (date: string) => {
    onChangeDate(date);
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

  // const getSelectedToday = () => {
  //   setSelectedDate(new Date().getDate().toString());
  // }

  return (
    <FlatList
      data={weekDates}
      renderItem={renderDateItem}
      keyExtractor={(item) => item}
      numColumns={7}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
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