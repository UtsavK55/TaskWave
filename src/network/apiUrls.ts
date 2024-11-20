import {API_KEY, BASE_URL} from '@network/apiConstant';
import {memberArr} from '@constants';

export const loginUrl = `${BASE_URL}/1/authorize?expiration=never&scope=read,write,account&response_type=token&key=${API_KEY}&return_url=taskwave://`;

export const allBoardsUrl = (token: string) => {
  return `/1/members/me/boards?key=${API_KEY}&token=${token}`;
};

export const listCardUrl = (token: string, boardId: string, param: string) => {
  return `/1/boards/${boardId}/${param}?key=${API_KEY}&token=${token}`;
};

export const newListUrl = (token: string, newList: string, boardId: string) => {
  return `/1/lists?name=${newList}&idBoard=${boardId}&key=${API_KEY}&token=${token}`;
};

export const newCardUrl = (token: string, newCard: string, listId: string) => {
  return `/1/cards?name=${newCard}&idMembers=${memberArr}&idList=${listId}&key=${API_KEY}&token=${token}`;
};

export const cardInfoUrl = (token: string, cardId: string) => {
  return `/1/cards/${cardId}?key=${API_KEY}&token=${token}`;
};

export const getListUrl = (token: string, listId: string) => {
  return `/1/lists/${listId}?key=${API_KEY}&token=${token}`;
};

export const updateCardList = (
  token: string,
  cardId: string,
  listId: string,
) => {
  return `/1/cards/${cardId}?idList=${listId}&key=${API_KEY}&token=${token}`;
};
export const updateCardDesc = (token: string, cardId: string, desc: string) => {
  return `/1/cards/${cardId}?desc=${desc}&key=${API_KEY}&token=${token}`;
};

export const deletCardUrl = (token: string, cardId: string) => {
  return `/1/cards/${cardId}?key=${API_KEY}&token=${token}`;
};
export const archiveListUrl = (
  token: string,
  listId: string,
  value: boolean,
) => {
  return `/1/lists/${listId}/closed?value=${value}&key=${API_KEY}&token=${token}`;
};

export const editListUrl = (token: string, name: string, listId: string) => {
  return `/1/lists/${listId}?name=${name}&key=${API_KEY}&token=${token}`;
};

export const getCustomBgUrl = (token: string) => {
  return `/1/members/me/boardBackgrounds?key=${API_KEY}&token=${token}`;
};

export const createBoardUrl = (
  token: string,
  boardName: string,
  bgImageId: string,
) => {
  return `/1/boards/?name=${boardName}&prefs_background=${bgImageId}&key=${API_KEY}&token=${token}`;
};

export const getUserUrl = (token: string) => {
  return `/1/members/me?key=${API_KEY}&token=${token}`;
};

export const getMyCardsUrl = (token: string) => {
  return `/1/members/me/cards?key=${API_KEY}&token=${token}`;
};

export const getArchiveListUrl = (token: string, boardId: string) => {
  return `/1/boards/${boardId}/lists?filter=closed&key=${API_KEY}&token=${token}`;
};

export const deletBoardUrl = (token: string, boardId: string) => {
  return `/1/boards/${boardId}?key=${API_KEY}&token=${token}`;
};
