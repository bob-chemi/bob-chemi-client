import { StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/Entypo'
import * as S from './Dropdown.style'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
import theme from '@/common/style/theme'
interface DropdownProp {
  setValue: React.Dispatch<
    React.SetStateAction<{
      year: number
      month: number
      day: number
    }>
  >
  validate?: string
}

export const Dropdown = ({ setValue, validate }: DropdownProp) => {
  return (
    <>
      <S.Label>
        <S.InputLabel>생년 월일</S.InputLabel>
        <S.InputLabel>{validate}</S.InputLabel>
      </S.Label>
      <FlexDirectionWrapper>
        {DropDownList.map(data => (
          <SelectDropdown
            key={data.name}
            data={data.data}
            onSelect={selectedItem => {
              switch (data.name) {
                case '년도':
                  setValue(prev => ({ ...prev, year: selectedItem }))
                  break
                case '월':
                  setValue(prev => ({ ...prev, month: selectedItem }))
                  break
                case '일':
                  setValue(prev => ({ ...prev, day: selectedItem }))
                  break
                default:
                  break
              }
            }}
            defaultButtonText={data.name}
            buttonStyle={{
              ...styles.dropdownBtnStyle,
              borderColor: validate ? theme.colors.primary : theme.colors.gray300,
            }}
            dropdownIconPosition={'right'}
            renderDropdownIcon={isOpened => {
              return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} color={theme.colors.gray500} size={18} />
            }}
            buttonTextStyle={styles.btnTxtStyle}
            dropdownStyle={styles.dropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem
            }}
            rowTextForSelection={item => {
              return item
            }}
          />
        ))}
      </FlexDirectionWrapper>
    </>
  )
}

const DropDownList = [
  {
    data: (() => {
      const years = []
      const thisYear = new Date().getFullYear()
      for (let i = thisYear; i >= 1950; i--) {
        years.push(i)
      }
      return years
    })(),
    name: '년도',
  },
  { data: Array.from(Array(12), (_, i) => i + 1), name: '월' },
  { data: Array.from(Array(31), (_, i) => i + 1), name: '일' },
]

const styles = StyleSheet.create({
  dropdownBtnStyle: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
  },
  btnTxtStyle: { color: `${theme.colors.gray500}`, textAlign: 'left', fontSize: 14 },
  dropdownStyle: { backgroundColor: `${theme.colors.white}` },
  dropdownRowStyle: { backgroundColor: `${theme.colors.white}`, borderBottomColor: `${theme.colors.gray300}` },
  dropdownRowTxtStyle: { color: `${theme.colors.gray500}`, textAlign: 'left' },
})
