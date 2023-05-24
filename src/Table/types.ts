/*
 * @@description:
 * @Author: qifeng qifeng@carbonstop.net
 * @Date: 2023-04-25 14:29:09
 * @LastEditors: qifeng qifeng@carbonstop.net
 * @LastEditTime: 2023-05-24 14:16:04
 */
import { TooltipProps } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { CommonType } from 'cs-ui/types';
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
  /**
   * @description 在 TableRenderProps['columns'] 基础上补充 tooltip & filterOptions
   */
  columns: Columns[];
  /**
   * @description 保存在url上的搜索条件key, 不传则不保存搜索条件到url中，必须保证这个key是在search中是唯一的
   */
  searchKey: string;
  /**
   * @description 最外层的class
   */
  wrapperClass?: string;
} & Omit<TableRenderProps, 'columns'> &
  Pick<CommonType, 'style'>;

export type TableRef<Row = any> = TableContext<Row>;

export type Columns = TableRenderProps['columns'][number] & {
  /**
   * @description title 的说明文案
   */
  tooltip?: string | TooltipProps;
  /**
   * @description 表格列筛选项
   */
  filterOptions?: Options[];
  /**
   * @description 筛选是不是多选
   */
  filterMultiple?: boolean;
  /**
   * @description table column 使用的数据字段，tab了Render 没有提供这个字段
   */
  dataIndex: string;
};

export type Options = {
  label: string | number;
  value: string | number;
  [k: string]: any;
};

export type PickFormValueInSearchProps = {
  columns?: Columns[];
  userSearch?: TableProps<any>['userSearch'];
};
