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
}

type AllBoards = MappedBoard[];
