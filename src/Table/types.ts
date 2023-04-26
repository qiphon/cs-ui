/*
 * @@description:
 * @Author: qifeng qifeng@carbonstop.net
 * @Date: 2023-04-25 14:29:09
 * @LastEditors: qifeng qifeng@carbonstop.net
 * @LastEditTime: 2023-04-26 10:25:29
 */
import { ColumnsType } from 'antd/lib/table';
import { ReactNode } from 'react';
import { TableRenderProps } from 'table-render';
import { TableContext } from 'table-render/dist/src/types';

export type TableProps<Row> = {
  /**
   * @description 用户自定义的 请求参数
   * @type Record<string, any>
   */
  userSearch?: Record<string, any>;
  /**
   * @description 是否将参数放到URL中
   * @default true
   */
  useSearchParams?: boolean;
  /**
   * @description 自定义顶部标题、操作按钮
   */
  topRender?: {
    left?: ReactNode | string;
    right?: ReactNode | string;
  };
  /**
   * @description 搜索和标题之间的插槽
   */
  searchTopRender?: ReactNode;
  /**
   * @description 自定义column 渲染方式
   */
  overideColumnsFn?: (
    column: ColumnsType<Row>[number],
  ) => ColumnsType<Row>[number];
  /**
   * @description 搜索部分 参考formRender FRProps['search']; 表单字段放置在Schema 中，当前版本不知道为什么去除了这个类型，但是官网demo中还是使用这个字段
   * @type FRProps['search'];
   */
  search?: TableRenderProps['search'] & {
    schema: any; // FRProps['search'];
  };
  /**
   * @type TableContext<Row>;
   */
  ref?: React.MutableRefObject<Row> | null;
} & TableRenderProps;

export type TableRef<Row = any> = TableContext<Row>;
