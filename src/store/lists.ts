import {useMutation, useQuery, useQueryClient} from 'react-query';

import ShowToast from '@components/showToast';
import {QUERY_KEYS} from '@constants';
import {handleMutationSuccess} from '@helpers';
import {addData, deleteData, fetchData, updateData} from '@network/apiMethods';
import {
  archiveListUrl,
  deletBoardUrl,
  deletCardUrl,
  editListUrl,
  listCardUrl,
  newCardUrl,
  newListUrl,
  updateCardList,
} from '@network/apiUrls';

// Fetch Lists Data
const fetchListsData = async (token: string, boardId: string) => {
  const allListsInfo = await fetchData(listCardUrl(token, boardId, 'lists'));
  return allListsInfo.map(({id, name}: ListInfo) => ({
    id,
    name,
  }));
};

// Queries & Mutations
export const useListsQuery = (token: string, boardId: string) => {
  return useQuery(
    [QUERY_KEYS.LISTS, boardId, token],
    () => fetchListsData(token, boardId),
    {
      enabled: !!token,
    },
  );
};

export const useAddNewCardMutation = (
  token: string,
  addingCardToListId: string,
  boardId: string,
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (newCardName: string) =>
      addData(newCardUrl(token, newCardName, addingCardToListId)),
    {
      onSuccess: newCardData => {
        const {id, idList, name} = newCardData?.data;
        handleMutationSuccess(
          queryClient,
          [QUERY_KEYS.CARDS, boardId, token],
          'Card added successfully',
          'add',
          {id, idList, name},
        )();
      },
    },
  );
};

export const useAddNewListMutation = (token: string, boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (newListName: string) => addData(newListUrl(token, newListName, boardId)),
    {
      onSuccess: newListData => {
        const {id, name} = newListData?.data;
        handleMutationSuccess(
          queryClient,
          [QUERY_KEYS.LISTS, boardId, token],
          'List added successfully',
          'add',
          {id, name},
        )();
      },
    },
  );
};

export const useUpdateListMutation = (
  token: string,
  editListbyId: string,
  boardId: string,
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedListName: string) =>
      updateData(editListUrl(token, updatedListName, editListbyId)),
    {
      onSuccess: updatedListData => {
        const {id, name} = updatedListData?.data;

        handleMutationSuccess(
          queryClient,
          [QUERY_KEYS.LISTS, boardId, token],
          'List updated successfully',
          'update',
          {id, name},
        )();
      },
    },
  );
};

export const useDeleteCardMutation = (token: string, boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (cardId: string) => deleteData(deletCardUrl(token, cardId)),
    {
      onSuccess: deletedCardId => {
        queryClient.setQueryData(
          [QUERY_KEYS.CARDS, boardId, token],
          (oldData: any) => {
            return oldData.filter((card: any) => card.id !== deletedCardId);
          },
        );
        ShowToast('success', 'Card deleted successfully');
      },
    },
  );
};

export const useDeleteBoardMutation = (
  token: string,
  boardId: string,
  boardNavigation: BoardsNavigationType,
) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteData(deletBoardUrl(token, boardId)), {
    onSuccess: () => {
      queryClient.setQueryData([QUERY_KEYS.BOARDS, token], (oldData: any) => {
        return oldData.filter((board: any) => board.id !== boardId);
      });

      boardNavigation.popToTop();
      ShowToast('success', 'Board deleted successfully');
    },
  });
};

export const useArchiveListMutation = (token: string, boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (listId: string) => updateData(archiveListUrl(token, listId, true)),
    {
      onSuccess: archivedListData => {
        handleMutationSuccess(
          queryClient,
          [QUERY_KEYS.LISTS, boardId, token],
          'List archived successfully',
          'delete',
          archivedListData?.data.id,
        )();
      },
    },
  );
};

export const useChangeCardListMutation = (
  token: string,
  selectedCard: string,
  selectedListId: string,
  boardId: string,
) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => updateData(updateCardList(token, selectedCard, selectedListId)),
    {
      onSuccess: () => {
        queryClient.setQueryData(
          [QUERY_KEYS.CARDS, boardId, token],
          (oldData: any) => {
            return oldData.map((card: CardInfo) =>
              card.id === selectedCard
                ? {...card, idList: selectedListId}
                : card,
            );
          },
        );
      },
    },
  );
};
