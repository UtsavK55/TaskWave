import {API_KEY, BASE_URL} from '@network/apiConstant';

export const loginUrl = `${BASE_URL}/1/authorize?expiration=never&scope=read,write,account&response_type=token&key=${API_KEY}&return_url=taskwave://`;

export const allBoardsUrl = (token: string) => {
  return `/1/members/me/boards?key=${API_KEY}&token=${token}`;
};

export const listCardUrl = (token: string, boardId: string, param: string) => {
  return `/1/boards/${boardId}/${param}?key=${API_KEY}&token=${token}`;
};
