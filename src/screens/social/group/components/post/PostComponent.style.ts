import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/getScreenSize'
import theme from '@/common/style/theme'
import { Picker } from '@react-native-picker/picker';

export const CompContainer = styled.View`
  flexDirection: row;
  align-items: center;
  margin-top: 10px;
  paddingHorizontal: 10px;
  width: 100%;
  justify-content: space-between;
`

export const HeadTitle = styled.Text<{ height: number }>`
  textAlign: left;
  textAlignVertical: center;
  width: 50px;
  height: ${({ height }) => height}px;
  fontSize: 15px;
  fontWeight: 600;
  color: ${theme.colors.black};
`

export const Input = styled.TextInput<{ height: number, isContent: boolean }>`
  width: 300px;
  height: ${({ height }) => height}px;
  paddingVertical: ${({ isContent }) => isContent ? '10px' : '5px'};
  paddingHorizontal: 10px;
  backgroundColor: rgba(0,0,0,.1);
  borderRadius: 5px;
  textAlignVertical: ${({ isContent }) => isContent ? 'top' : 'center'};
  color: ${theme.colors.gray500};
`

export const DateInput = styled.TextInput`
  width: 120px;
  height: 35px;
  paddingVertical: 5px;
  paddingHorizontal: 10px;
  backgroundColor: rgba(0,0,0,.1);
  borderRadius: 5px;
  textAlignVertical: center;
  color: ${theme.colors.gray500};
`

export const IconButton = styled.TouchableOpacity`  
  paddingHorizontal: 5.5px;
`

export const PickerContainer = styled.View<{ width: number }>`
  flexDirection: row;
  width: ${({ width }) => width}px;
  padding: 0;
  height: 35px;
  backgroundColor: 'rgba(0,0,0,.1)';
  borderRadius: 5px;
  align-items: center;
`

export const UploadImgContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  backgroundColor: 'rgba(0,0,0,.1)';
  borderRadius: 5px;
`

export const Img = styled.Image`
  width: 150px;
  height: 150px;
  resize-mode: cover;
`

export const UploadImgBtn = styled.TouchableOpacity`
  position: absolute;
  z-index: 1;
  backgroundColor: 'rgba(0,0,0,.1)';
`
