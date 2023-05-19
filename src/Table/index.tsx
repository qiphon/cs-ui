/*
 * @@description:
 * @Author: qifeng qifeng@carbonstop.net
 * @Date: 2023-04-25 14:29:09
 * @LastEditors: qifeng qifeng@carbonstop.net
 * @LastEditTime: 2023-05-19 18:33:46
 */
import { TablePaginationConfig } from 'antd';
import classNames from 'classnames';
import { Button } from 'cs-ui/Button';
import { ResetIcon } from 'cs-ui/Icons/ResetIcon';
import { SearchIcon } from 'cs-ui/Icons/SearchIcon';
import React, {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  forwardRef,
  useRef,
  useState,
} from 'react';
import TableRender from 'table-render';
import { SearchApi } from 'table-render/dist/src/types';

import './index.less';

import { TableProps, TableRef } from './types';
import {
  defaultSchema,
  pickFormValueInSearch,
  useModifyColumns,
} from './utils';
import {
  addClassNamePrefix,
  getSearch,
  updateSearch,
  encrypt,
  decrypt,
} from '../utils';

const XTable: ForwardRefExoticComponent<
  PropsWithoutRef<TableProps<any>> & RefAttributes<TableRef>
> = forwardRef(
  (
    { userSearch, topRender, searchKey, searchTopRender, columns, ...props },
    ref,
  ) => {
    const { pagination, search, request } = props;
    // 自定义搜索参数
    const cacheUserSearch = React.useRef<Record<string, any>>({});
    const tableRef = useRef<TableRef>();
    // 分页信息
    const [pageInfo, setPageInfo] = useState<TablePaginationConfig>({
      current: 0,
      pageSize: 10,
      size: 'default',
      showSizeChanger: true,
      className: 'tablePagination',
      hideOnSinglePage: false,
      // eslint-disable-next-line react/no-unstable-nested-components
      showTotal: (total) => (
        <span className="paginationTotal">共 {total} 条</span>
      ),
      ...(pagination || {}),
    });

    /** 设置search */
    const cacheSeach = (search?: Record<string, any>, reset?: boolean) => {
      if (!searchKey) {
        return {};
      }
      if (reset) {
        cacheUserSearch.current = search || {};
        return {};
      }
      cacheUserSearch.current = { ...cacheUserSearch.current, ...search };
      return cacheUserSearch.current;
    };
    /** 更新用户传入的search到table本地search中 */
    React.useEffect(() => {
      cacheSeach(userSearch);
    }, [userSearch]);

    React.useImperativeHandle(
      ref,
      () => ({
        ...tableRef.current,
        refresh: ((params1, search) =>
          tableRef.current?.refresh?.(params1, {
            ...cacheUserSearch,
            ...search,
          })) as NonNullable<TableRef['refresh']>,
      }),
      [],
    );
    /** 第一次进入先去使用URL中的参数 */
    const isFirstRender = React.useRef(true);
    let newRequest: TableProps<any>['request'];
    /** 覆盖默认请求 */
    const modifyDefaultRequest =
      (request: SearchApi<any>): SearchApi<any> =>
      (props, ...args) => {
        let newSe = { ...props };
        if (isFirstRender.current) {
          const urlSearch = getSearch()?.[searchKey];
          /** 处理 URL 中的搜索值 */
          if (urlSearch && searchKey) {
            let result: Record<string, any> = {};
            // 当链接超长时，可能会出现参数丢失，丢失时直接全部舍弃
            try {
              const decryptStr = decrypt(urlSearch);
              result = JSON.parse(decryptStr);
              if (typeof result === 'object' && Object.keys(result)?.length) {
                tableRef.current?.form.setValues?.(
                  pickFormValueInSearch(
                    { ...result },
                    {
                      columns,
                      userSearch: { ...userSearch, current: 1, pageSize: 1 },
                    },
                  ),
                );
              }
            } catch {
              result = {};
              console.warn('search 参数错误，请检查数据是否错误: ', urlSearch);
            }
            cacheSeach(result);
          }
          // search 中的 分页字段 覆盖默认分页
          newSe = { ...newSe, ...cacheUserSearch.current };
        }

        // 防止 current 和 pageSize 参数被置为无用字段
        newSe = {
          ...newSe,
          ...cacheUserSearch.current,
          current: +newSe.current > 0 ? +newSe.current : props.current,
          pageSize: +newSe.pageSize > 0 ? +newSe.pageSize : props.pageSize,
        };

        setPageInfo((s) => ({
          ...s,
          current: newSe.current,
          pageSize: newSe.pageSize,
        }));
        cacheSeach(newSe);
        isFirstRender.current = false;
        if (searchKey) {
          updateSearch({
            searchParams: { [searchKey]: encrypt(JSON.stringify(newSe)) },
          });
        }
        return request(newSe, ...args);
      };
    if (typeof request === 'function') {
      newRequest = modifyDefaultRequest(request);
    } else if (Array.isArray(request)) {
      newRequest = request.map((r) => ({
        ...r,
        api: modifyDefaultRequest(r.api),
      }));
    }

    const newColumns = useModifyColumns(columns, {
      cachedSearch: cacheUserSearch.current,
      cacheSeach,
      refresh: () => {
        tableRef.current?.refresh?.();
      },
    });
    return (
      <div className={addClassNamePrefix('tableWrapper')}>
        {!!topRender && (
          <div className="tableTop">
            <div className="tableTopLeft">
              {typeof topRender.left === 'string' ? (
                <h3 className="tableTopLeftTitle">{topRender.left}</h3>
              ) : (
                topRender?.left
              )}
            </div>
            {topRender.right && (
              <div className="tableTopRight">{topRender.right}</div>
            )}
          </div>
        )}
        {searchTopRender}
        <TableRender
          rowKey="id"
          {...props}
          columns={newColumns}
          // todo loading 暂时无法修改
          // loading={{
          //   indicator: (
          //     <div className={classNames('spinShower ')}>
          //       <img
          //         src={loadingIcon}
          //         className="loadingIcon ant-spin-dot"
          //         alt="loading"
          //       />
          //       <span className="loadingMsg">正在加载中，请稍等</span>
          //     </div>
          //   ),
          // }}
          request={newRequest}
          ref={tableRef}
          search={{
            removeHiddenData: true,
            hidden: !search,
            searchBtnRender: (submit, clear) => [
              <Button
                type="primary"
                ghost
                key="submit"
                icon={
                  <span className="search ButtonIcon">
                    <SearchIcon className="icon primary" />
                  </span>
                }
                onClick={async () => submit()}
              >
                查询
              </Button>,
              <Button
                key="reset"
                icon={
                  <span className="clear ButtonIcon">
                    <ResetIcon className="icon gray" />
                  </span>
                }
                onClick={async () => {
                  cacheSeach({}, true);
                  return clear();
                }}
              >
                重置
              </Button>,
            ],
            ...search,
            schema: search?.schema || defaultSchema,
            className: classNames(search?.className, 'tableSearch'),
          }}
          scroll={{ ...props.scroll, y: 'auto' }}
          className={classNames(props.className, addClassNamePrefix('table'))}
          pagination={
            props?.pagination === false
              ? false
              : {
                  ...pageInfo,
                  onChange: (current, pageSize) => {
                    setPageInfo((s) => ({ ...s, current, pageSize }));
                  },
                }
          }
        />
      </div>
    );
  },
);

export const Table = XTable as unknown as <Row = any>(
  props: TableProps<Row>,
) => JSX.Element;
