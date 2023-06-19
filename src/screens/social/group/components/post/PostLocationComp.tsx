import React, { useState } from 'react';
import * as S from './PostComponent.style'
import { area } from "../../../data/area"
import { Picker } from '@react-native-picker/picker';
import { NativeSyntheticEvent, StyleSheet } from 'react-native'
import theme from '@/common/style/theme'

interface PostLocationCompProps {
  children?: React.ReactNode;
  selectedRegion: string;
  selectedCity: string | null;
  onChangeRegion: (newRegion: string) => void;
  onChangeCity: (newCity: string) => void;
}

const PostLocationComp: React.FC<PostLocationCompProps> = ({ selectedRegion, selectedCity, onChangeRegion, onChangeCity }) => {

  const handleRegionChange = (newRegion: string) => { //광역시, 특별시, 도 선택
    onChangeRegion(newRegion);
    const value = area[newRegion][0];
    onChangeCity(value);
  };

  const handleCityChange = (newCity: string) => { //시, 구 선택
    const value = newCity;
    onChangeCity(value);
  }

  const renderCityPicker = () => { //시, 구 picker component
    if (!selectedRegion) {
      return null;
    }
    const cities = area[selectedRegion];
    return (
      <S.PickerContainer width={145}>
        <Picker
          prompt="시/구 선택"
          selectedValue={selectedCity ? selectedCity : ''}
          onValueChange={handleCityChange}
          style={styles.picker}
        >
          {cities.map((city) => (
            <Picker.Item key={city} label={city} value={city} style={styles.pickerItem} />
          ))}
        </Picker>
      </S.PickerContainer>
    );
  }

  return (
    <S.CompContainer>
      <S.HeadTitle height={35}>{'위치'}</S.HeadTitle>
      <S.PickerContainer width={145} style={{ marginRight: 10 }}>
        <Picker
          prompt="지역 선택"
          selectedValue={selectedRegion}
          onValueChange={handleRegionChange}
          style={styles.picker}
        >
          {Object.keys(area).map((region) => (
            <Picker.Item key={region} label={region} value={region} style={styles.pickerItem} />
          ))}
        </Picker>
      </S.PickerContainer>
      {renderCityPicker()}

    </S.CompContainer>
  )
}

const styles = StyleSheet.create({
  picker: {
    width: '100%',
    padding: 0,
    color: theme.colors.gray500,
  },
  pickerItem: {
    fontSize: 14,
    padding: 0,
  }
})
export default PostLocationComp;