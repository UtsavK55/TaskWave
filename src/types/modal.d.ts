interface CustomModalProps {
  children: React.ReactNode;
  visible: boolean;
  onPressClear: () => void;
  onPressCheck: () => void;
}

type BasicType = string | number | boolean;

type DropDownItem = {
  id: string | number;
  name: string;
};

type DropdownItems = DropDownItem[];

type DropdownProps = {
  data: DropDownItems;
  placeholder: string;
  onSelectIndex?: (value: ListInfo) => void;
  value?: DropDownItem;
  shouldScroll?: boolean;
  style?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
};

interface DateTimePickerComponentProps {
  label?: string;
  invalid?: boolean;
  date: Date;
  setDate: Dispatch<SetStateAction<string>>;
  dateOrTime: 'date' | 'time';
  required?: boolean;
  minDate?: Date;
  errorMsg?: string;
}
