import {useQuery} from 'react-query';

import {QUERY_KEYS} from '@constants';
import {fetchData} from '@network/apiMethods';
import {allBoardsUrl, listCardUrl} from '@network/apiUrls';

export const useBoardsQuery = (token: string) => {
  return useQuery([QUERY_KEYS.BOARDS, token], () => fetchBoardsData(token), {
    enabled: !!token,
  });
};

const fetchBoardsData = async (token: string) => {
  const allBoardsInfo = await fetchData(allBoardsUrl(token));
  const allBoards: AllBoards = allBoardsInfo.map(
    ({id, name, prefs}: BoardInfo) => ({
      id,
      name,
      backgroundImageUrl: prefs?.backgroundImageScaled?.[2]?.url,
      cardsNo: 0,
    }),
  );

  const boardsWithCardCount = await Promise.all(
    allBoards.map(async board => {
      const allCardsInfo = await fetchData(
        listCardUrl(token, board.id, 'cards'),
      );
      return {
        ...board,
        cardsNo: allCardsInfo?.length,
      };
    }),
  );

  return boardsWithCardCount;
};
