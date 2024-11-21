interface ListInfo {
  id: string;
  name: string;
}

type AllLists = ListInfo[];

interface CardInfo {
  id: string;
  idList?: string;
  idBoard?: string;
  name: string;
  dateLastActivity: string;
}

type AllCards = CardInfo[];
