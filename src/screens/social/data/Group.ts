import { ImageSourcePropType } from "react-native/Libraries/Image/Image";

export interface Group {
  id: number;
  title: string;
  context: string;
  createid: string;
  createdAt: string;
  people: number;
  location: string;
  date: string;
  time: string;
  imgsource: ImageSourcePropType;
}