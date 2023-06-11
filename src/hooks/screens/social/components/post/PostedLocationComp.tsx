import React, { useState } from 'react';
import * as S from './PostedComponent.style'
import { area } from "../../model/area"
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native'
import theme from '@/common/style/theme'

const PostedLocationComp = () => {
  const [selectedRegion, setSelectedRegion] = useState("서울특별시");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleRegionChange = (value: string) => { //광역시, 특별시, 도 선택
    setSelectedRegion(value);
    setSelectedCity(null);
  };

  const handleCityChange = (value: string | null) => { //시, 구 선택
    setSelectedCity(value);
  }

  const renderCityPicker = () => { //시, 구 picker component
    if (!selectedRegion) {
      return null;
    }
    const cities = area[selectedRegion];
    return (
      <S.PickerContainer>
        <Picker
          prompt="시/구 선택"
          selectedValue={selectedCity}
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
      <S.PickerContainer style={{ marginRight: 10 }}>
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
export default PostedLocationComp;