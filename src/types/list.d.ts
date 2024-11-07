interface ListInfo {
  id: string;
  name: string;
}

type AllLists = ListInfo[];

interface CardInfo {
  id: string;
  idList: string;
  name: string;
}

type AllCards = CardInfo[];
