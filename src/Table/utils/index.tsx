/*
 * @@description:
 * @Author: qifeng qifeng@carbonstop.net
 * @Date: 2023-04-25 14:29:09
 * @LastEditors: qifeng qifeng@carbonstop.net
 * @LastEditTime: 2023-04-25 14:31:35
 */
import { SearchProps } from 'table-render';

/**
 * 生成 xrender search 表单数据
 * @param properties 字段描述
 */
export const xRenderSeachSchema = <RecordType = any,>(
  properties: SearchProps<RecordType>['schema'],
): SearchProps<RecordType>['schema'] => ({
  width: 240,
  /** 作用于列的样式，类型里没有暴露这个 */
  // @ts-ignore
  style: {
    paddingRight: 20,
  },
  ...properties,
});

export const defaultSchema = {
  type: 'object',
  properties: {},
};
