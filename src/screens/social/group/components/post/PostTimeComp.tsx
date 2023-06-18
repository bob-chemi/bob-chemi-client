import React, { useState } from 'react';
import * as S from './PostComponent.style'
import theme from '@/common/style/theme'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface PostTimeCompProps {
  children?: React.ReactNode;
  date: Date;
  time: Date;
  onChangeDate: (newDate: Date) => void;
  onChangeTime: (newTime: Date) => void;
}

const PostTimeComp: React.FC<PostTimeCompProps> = ({ date, time, onChangeDate, onChangeTime }) => {
  const [isShowDatePicker, setShowDatePicker] = useState(false);
  const [isShowTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [dateStr, setDateStr] = useState(`${time.getFullYear()}년 ${time.getMonth() + 1}월 ${time.getDate()}일`);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => { //날짜 선택 시
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    onChangeDate(currentDate);
    setDateStr(`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`);
  };

  const showDatePicker = () => { //날짜 선택 Picker
    setShowDatePicker(true);
  };

  const handleTimeChange = (event: Event, selectedTime?: Date) => { //시간 선택 시
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    onChangeTime(currentTime);
  };

  const showTimePicker = () => { //시간 선택 Picker
    setShowTimePicker(true);
  };

  const options: Intl.DateTimeFormatOptions = { //시간을 2자리로 표현하기 위한 옵션
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <S.CompContainer>
      <S.HeadTitle height={35}>{'일시'}</S.HeadTitle>
      <S.DateInput value={dateStr} editable={false} />
      {isShowDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <S.IconButton onPress={showDatePicker}>
        <Icon name="calendar-range" size={20} color={theme.colors.primary} />
      </S.IconButton>
      <S.DateInput value={time.toLocaleTimeString([], options)} editable={false} />
      {isShowTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <S.IconButton onPress={showTimePicker}>
        <Icon name="clock-outline" size={20} color={theme.colors.primary} />
      </S.IconButton>
    </S.CompContainer>
  );
}

export default PostTimeComp