interface SectionProps {
  iconName: string;
  sectionTitle: string;
  data: AllBoardMembers | AllLists;
  renderItem: ListRenderItem<BoardMember | ListInfo>;
  ListEmptyComponent?:
    | ComponentType<any>
    | ReactElement<any, string | JSXElementConstructor<any>>
    | null
    | undefined;
  onPressInvite?: () => void;
  inviteText?: string;
  keyExtractor?: (item: BoardMember | ListInfo) => string;
  styles: Record<string, any>;
  colors: Colors;
}
