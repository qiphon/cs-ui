import { CheckboxValueType } from 'antd/es/checkbox/Group';

import { Options } from '../../types';

export type TableFilterStatusProps = {
  /** 选项列表 */
  options: Options[];
  /** 是否是多选 */
  multiple?: boolean;
  /** 是否展示搜索 默认超过5条展示搜索 */
  showSearch?: boolean;
  /** 当前选中值 */
  value?: CheckboxValueType[];
  onConfirmClick: (
    selectedKeys: CheckboxValueType[],
    selectOptions: Options[],
    options: Options[],
  ) => void;
};
