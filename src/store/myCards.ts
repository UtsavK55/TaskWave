import {useQuery} from 'react-query';

import {QUERY_KEYS} from '@constants';
import {sortByDateLastActivity} from '@helpers';
import {fetchData} from '@network/apiMethods';
import {getMyCardsUrl} from '@network/apiUrls';

export const useMyCardsQuery = (
  token: string,
  onSuccessHandler?: () => void,
) => {
  return useQuery([QUERY_KEYS.MY_CARDS, token], () => fetchCardsData(token), {
    enabled: !!token,
    onSuccess: onSuccessHandler || (() => {}),
  });
};

const fetchCardsData = async (token: string) => {
  const allCardsInfo = await fetchData(getMyCardsUrl(token));
  const allCards: AllCards = allCardsInfo.map(
    ({id, idBoard, name, dateLastActivity}: CardInfo) => ({
      id,
      idBoard,
      name,
      dateLastActivity,
    }),
  );

  return allCards.sort(sortByDateLastActivity);
};
