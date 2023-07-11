import React, { useState } from 'react';
import * as S from '../group/components/post/PostComponent.style'
import ImagePicker, { ImagePickerResponse, launchCamera, launchImageLibrary, ImageLibraryOptions, MediaType } from 'react-native-image-picker'
import { Button, Alert, Text, TouchableOpacity } from 'react-native';
import { PermissionsAndroid } from 'react-native/Libraries/PermissionsAndroid/PermissionsAndroid';
import { ImageData } from '@/types/socialType'

interface PostImgCompProps {
  children?: React.ReactNode;
  imageData: ImageData;
  onChangeImageData: (imageData: ImageData) => void; 
}

const PostImgComp: React.FC<PostImgCompProps> = ({imageData, onChangeImageData}) => {
  //const [imageData, setImageData] = useState<ImageData>({ uri: undefined });

  const handleSelectImage = () => {
    const options = {
      title: '이미지 첨부',
      message: '이미지를 가져올 방법을 선택해주세요',
      buttons: [
        {
          text: '앨범에서 가져오기',
          onPress: () => selectFromAlbum(),
          style: 'default' as const,
        },
        {
          text: '사진 찍기',
          onPress: () => selectFromCamera(),
          style: 'default' as const,
        },
        {
          text: '취소',
          style: 'cancel' as const,
        },
      ],
    };
    Alert.alert(options.title, options.message, options.buttons);
  }

  const selectFromCamera = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorCode, response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const imageData: ImageData = { uri: response.assets[0].uri! };
        onChangeImageData(imageData);
      }
    });
  }

  const selectFromAlbum = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorCode, response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const imageData: ImageData = { uri: response.assets[0].uri! };
        onChangeImageData(imageData);
      }
    });
  }

  return (
    <S.CompContainer>
      <S.HeadTitle height={120}>{'이미지'}</S.HeadTitle>
      <S.UploadImgContainer>
        <S.UploadImgBtn onPress={() => handleSelectImage()}><Text>이미지 첨부</Text></S.UploadImgBtn>
        {imageData && <S.Img source={{ uri: imageData.uri }} />}
      </S.UploadImgContainer>
    </S.CompContainer>
  )
}

export default PostImgComp;