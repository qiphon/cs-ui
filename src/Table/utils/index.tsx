/*
 * @@description:
 * @Author: qifeng qifeng@carbonstop.net
 * @Date: 2023-04-25 14:29:09
 * @LastEditors: qifeng qifeng@carbonstop.net
 * @LastEditTime: 2023-05-19 18:14:16
 */
import { Popover, TableProps, Tooltip } from 'antd';
import classNames from 'classnames';
import { FilterIcon } from 'cs-ui/Icons/FilterIcon';
import { HelpIcon } from 'cs-ui/Icons/HelpIcon';
import { addClassNamePrefix } from 'cs-ui/utils';
import { difference, pick } from 'lodash-es';
import React from 'react';
import { SearchProps } from 'table-render';

import TableFilterStatus from '../components/TablePopover';
import { Columns, PickFormValueInSearchProps } from '../types';

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
  {
    cachedSearch: cacheUserSearch,
    refresh,
    cacheSeach,
  }: {
    cacheSeach: (params: Record<string, any>) => any;
    cachedSearch: Record<string, any>;
    refresh: () => void;
  },
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
              <span className="tableColumnIcon ">
                <HelpIcon className=" icon" />
              </span>
            </Tooltip>
          )}
          {!!c.filterOptions && (
            <Popover
              content={
                <TableFilterStatus
                  multiple={c.filterMultiple}
                  options={c.filterOptions}
                  onConfirmClick={(selected) => {
                    if (columnsKey) {
                      cacheSeach({
                        ...cacheUserSearch,
                        [columnsKey]: selected,
                      });
                      refresh();
                    }
                    setOpenKey('');
                  }}
                  value={columnsKey ? cacheUserSearch?.[columnsKey] : undefined}
                />
              }
              destroyTooltipOnHide
              open={openKey === columnsKey}
              placement="bottomLeft"
              overlayClassName={addClassNamePrefix('tablePopover')}
              // getPopupContainer={(s) => s}
              trigger="click"
            >
              <span
                onClick={(ev) => {
                  ev.stopPropagation();
                  setOpenKey(columnsKey as string | number);
                }}
                className="tableColumnIcon"
              >
                <FilterIcon
                  className={classNames(' icon', {
                    active: columnsKey && cacheUserSearch?.[columnsKey]?.length,
                  })}
                />
              </span>
            </Popover>
          )}
        </div>
      ),
    };
  });
};

/**
 * 筛选出search中的应用到搜索项中的值
 * - 目前移除
 *    - column 筛选项
 *    - 用户自定义的搜索值
 */
export const pickFormValueInSearch = (
  value: Record<string, any>,
  { columns, userSearch }: PickFormValueInSearchProps,
) => {
  let keys = Object.keys(value);
  const columnsKey = columns?.map((c) => c.dataIndex || c.key);
  const userSearchKey = Object.keys(userSearch || {});

  return pick(
    value,
    difference(keys, [
      ...(columnsKey || []),
      ...(userSearchKey || []),
    ] as string[]),
  );
};
