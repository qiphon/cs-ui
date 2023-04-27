/*
 * @@description:
 * @Author: qifeng qifeng@carbonstop.net
 * @Date: 2023-04-25 14:29:09
 * @LastEditors: qifeng qifeng@carbonstop.net
 * @LastEditTime: 2023-04-27 09:44:47
 */
import { Popover, TableProps, Tooltip } from 'antd';
import defaultFilterIcon from 'cs-ui/assets/svgs/icon-filter-default.svg';
import filterIcon from 'cs-ui/assets/svgs/icon-filter.svg';
import helpIcon from 'cs-ui/assets/svgs/icon-help.svg';
import { addClassNamePrefix } from 'cs-ui/utils';
import React from 'react';
import { SearchProps } from 'table-render';

import TableFilterStatus from '../components/TablePopover';
import { Columns } from '../types';

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

/**
 * 处理table column
 * 1. tooltip
 * 2. 筛选
 */
export const useModifyColumns = <T = any,>(
  columns: Columns[],
  { cacheUserSearch }: { cacheUserSearch: Record<keyof T, any> },
): NonNullable<TableProps<T>['columns']> => {
  const [openKey, setOpenKey] = React.useState<string | number>('');
  return columns.map((c) => {
    if ((!c.tooltip && !c.filterOptions) || typeof c.title === 'function')
      return c;
    const columnsKey = (c.dataIndex || c.key) as keyof T;
    return {
      ...c,
      title: (
        <div className="tableColumn flex-row-start-center">
          <div className="tableColumnTit">{c.title}</div>
          {!!c.tooltip && (
            <Tooltip
              title={typeof c.tooltip === 'string' ? c.tooltip : ''}
              {...(typeof c.tooltip === 'object' ? c.tooltip : {})}
            >
              <img
                src={helpIcon}
                alt="help"
                className="tableColumnIcon helpIcon"
              />
            </Tooltip>
          )}
          {!!c.filterOptions && (
            <Popover
              content={
                <TableFilterStatus
                  options={c.filterOptions}
                  onConfirmClick={(checked) => {
                    console.log(checked);
                    setOpenKey('');
                  }}
                />
              }
              destroyTooltipOnHide
              open={openKey === columnsKey}
              placement="bottomLeft"
              overlayClassName={addClassNamePrefix('tablePopover')}
              // getPopupContainer={(s) => s}
              trigger="click"
            >
              <img
                onClick={(ev) => {
                  ev.stopPropagation();
                  setOpenKey(columnsKey as string | number);
                }}
                src={
                  columnsKey && cacheUserSearch?.[columnsKey]?.length
                    ? filterIcon
                    : defaultFilterIcon
                }
                alt="filter"
                className="tableColumnIcon filterIcon"
              />
            </Popover>
          )}
        </div>
      ),
    };
  });
};
