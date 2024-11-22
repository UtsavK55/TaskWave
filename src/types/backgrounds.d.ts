type BackgroundKeys = keyof UnionConfiguration['backgrounds'];

type Backgrounds = {
  [key in BackgroundKeys]: RemoveBeforeSeparator<key> extends keyof UnionConfiguration['backgrounds']
    ? {
        backgroundColor: UnionConfiguration['backgrounds'][RemoveBeforeSeparator<key>];
      }
    : never;
};
