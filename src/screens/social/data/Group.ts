import { ImageSourcePropType } from "react-native/Libraries/Image/Image";
import { Member } from "./Member";

// export interface Group {
//   id: number;
//   title: string;
//   context: string;
//   createid: string;
//   createdAt: string;
//   people: number;
//   location: string;
//   date: string;
//   time: string;
//   imgsource: ImageSourcePropType;
// }

export interface Group {
  groupId: number;
  title: string;
  description: string;
  groupDate: string;
  groupHour: number;
  groupMin: number;
  groupLocation: string;
  groupPeopleLimit: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  members: Member[];
  imgsource: ImageSourcePropType;
}