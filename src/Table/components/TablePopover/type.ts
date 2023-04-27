import { Options } from '../../types';

export type TableFilterStatusProps = {
  options: Options[];
  onConfirmClick: (selectNum: Options[], options: Options[]) => void;
};
