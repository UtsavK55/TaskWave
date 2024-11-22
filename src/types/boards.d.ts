import {Animated} from 'react-native';

declare global {
  type BoardPrefs = {
    backgroundImageScaled?: {height: number; url: string; width: number}[];
  };

  interface BoardInfo {
    id: string;
    name: string;
    prefs?: BoardPrefs;
  }

  interface MappedBoard {
    id: string;
    name: string;
    backgroundImageUrl?: string;
    cardsNo?: number;
  }

  type AllBoards = MappedBoard[];

  interface CustomBg {
    id: string;
    scaled: {height: number; url: string; width: number}[];
  }

  interface CustomBgPic {
    id: string;
    backgroundImageUrl?: string;
  }

  type AllCustomBgPics = CustomBgPic[];

  interface CarouselItem {
    id: string;
    title: string;
  }

  interface CarouselProps {
    data: AllBoards;
    onPressCard: (item: MappedBoard) => void;
  }

  interface CarouselCardProps {
    item: MappedBoard;
    index: number;
    scrollX: Animated.Value;
    CARD_SIZE: number;
    onPress: (item: MappedBoard) => void;
  }

  interface BoardMember {
    id: string;
    fullName: string;
    username: string;
  }

  type AllBoardMembers = BoardMember[];
}
