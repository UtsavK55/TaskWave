import {useQuery} from 'react-query';

import {QUERY_KEYS} from '@constants';
import {sortByDateLastActivity} from '@helpers';
import {fetchData} from '@network/apiMethods';
import {listCardUrl} from '@network/apiUrls';

export const useCardsQuery = (token: string, boardId: string) => {
  return useQuery(
    [QUERY_KEYS.CARDS, boardId, token],
    () => fetchCardsData(token, boardId),
    {
      enabled: !!token,
    },
  );
};

const fetchCardsData = async (token: string, boardId: string) => {
  const allCardsInfo = await fetchData(listCardUrl(token, boardId, 'cards'));
  const allCards: AllCards = allCardsInfo.map(
    ({id, idList, name}: CardInfo) => ({
      id,
      idList,
      name,
    }),
  );

  return allCards.sort(sortByDateLastActivity);
};
