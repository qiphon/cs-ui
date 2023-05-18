import { Options } from 'cs-ui/Table/types';

/** 判断选项是否展示 */
export const isOptionShow = (filterString: string, option: Options) => {
  return (option.label + '').toLowerCase().includes(filterString.toLowerCase());
};
