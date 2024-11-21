import {memberArr} from '@constants';
import {appendAuthParams} from '@helpers';
import {API_KEY, BASE_URL} from '@network/apiConstant';

export const loginUrl = `${BASE_URL}/1/authorize?expiration=never&scope=read,write,account&response_type=token&key=${API_KEY}&return_url=taskwave://`;

export const allBoardsUrl = (token: string) => {
  return appendAuthParams(`/1/members/me/boards?`, token);
};

export const listCardUrl = (token: string, boardId: string, param: string) => {
  return appendAuthParams(`/1/boards/${boardId}/${param}?`, token);
};

export const newListUrl = (token: string, newList: string, boardId: string) => {
  return appendAuthParams(
    `/1/lists?name=${newList}&idBoard=${boardId}&`,
    token,
  );
};

export const newCardUrl = (token: string, newCard: string, listId: string) => {
  return appendAuthParams(
    `/1/cards?name=${newCard}&idMembers=${memberArr}&idList=${listId}&`,
    token,
  );
};

export const cardInfoUrl = (token: string, cardId: string) => {
  return appendAuthParams(`/1/cards/${cardId}?`, token);
};

export const getListUrl = (token: string, listId: string) => {
  return appendAuthParams(`/1/lists/${listId}?`, token);
};

export const updateCardList = (
  token: string,
  cardId: string,
  listId: string,
) => {
  return appendAuthParams(`/1/cards/${cardId}?idList=${listId}&`, token);
};

export const updateCardDesc = (token: string, cardId: string, desc: string) => {
  return appendAuthParams(`/1/cards/${cardId}?desc=${desc}&`, token);
};

export const deletCardUrl = (token: string, cardId: string) => {
  return appendAuthParams(`/1/cards/${cardId}?`, token);
};

export const archiveListUrl = (
  token: string,
  listId: string,
  value: boolean,
) => {
  return appendAuthParams(`/1/lists/${listId}/closed?value=${value}&`, token);
};

export const editListUrl = (token: string, name: string, listId: string) => {
  return appendAuthParams(`/1/lists/${listId}?name=${name}&`, token);
};

export const getCustomBgUrl = (token: string) => {
  return appendAuthParams(`/1/members/me/boardBackgrounds?`, token);
};

export const createBoardUrl = (
  token: string,
  boardName: string,
  bgImageId: string,
) => {
  return appendAuthParams(
    `/1/boards/?name=${boardName}&prefs_background=${bgImageId}&`,
    token,
  );
};

export const getUserUrl = (token: string) => {
  return appendAuthParams(`/1/members/me?`, token);
};

export const getMyCardsUrl = (token: string) => {
  return appendAuthParams(`/1/members/me/cards?`, token);
};

export const getArchiveListUrl = (token: string, boardId: string) => {
  return appendAuthParams(`/1/boards/${boardId}/lists?filter=closed&`, token);
};

export const deletBoardUrl = (token: string, boardId: string) => {
  return appendAuthParams(`/1/boards/${boardId}?`, token);
};

export const getMembersOfBoardUrl = (token: string, boardId: string) => {
  return appendAuthParams(`/1/boards/${boardId}/members?`, token);
};

export const searchMemberUrl = (token: string, searchTerm: string) => {
  return appendAuthParams(
    `https://api.trello.com/1/search/members/?query=${searchTerm}&`,
    token,
  );
};
