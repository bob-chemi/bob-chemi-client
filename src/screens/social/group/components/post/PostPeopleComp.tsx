import React, { useState } from 'react';
import * as S from './PostComponent.style'
import { area } from "../../../data/area"
import { Picker } from '@react-native-picker/picker';
import { NativeSyntheticEvent, StyleSheet, Text } from 'react-native'
import theme from '@/common/style/theme'

interface PostPeopleCompProps {
  children?: React.ReactNode;
  selectedNumber: number;
  onChangeNumber: (newRegion: number) => void;
}

const PostPeopleComp: React.FC<PostPeopleCompProps> = ({ selectedNumber, onChangeNumber }) => {

  const handleNumberChange = (newNumber: number) => {
    onChangeNumber(newNumber);
  };
  return (
    <S.CompContainer>
      <S.HeadTitle height={35}>{'인원'}</S.HeadTitle>
      <S.PickerContainer width={300}>
        <Picker
          prompt="인원 선택"
          selectedValue={selectedNumber}
          onValueChange={handleNumberChange}
          style={styles.picker}
        >
          {Array.from({ length: 101 }, (_, index) => (
            <Picker.Item key={index} label={index.toString()} value={index} />
          ))}
        </Picker>
      </S.PickerContainer>
    </S.CompContainer>
  )
}

const styles = StyleSheet.create({
  picker: {
    width: '100%',
    padding: 0,
    color: theme.colors.gray500,
  }
})
export default PostPeopleComp;