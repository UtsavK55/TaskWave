interface UserLoginContextType {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

type ThemeContext = Theme & {
  changeTheme: (variant: Variant) => void;
};
