/*
 * @@description:
 * @Author: qifeng qifeng@carbonstop.net
 * @Date: 2023-04-25 14:29:09
 * @LastEditors: qifeng qifeng@carbonstop.net
 * @LastEditTime: 2023-05-19 10:11:42
 */
import { TablePaginationConfig } from 'antd';
import classNames from 'classnames';
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
import { defaultSchema, useModifyColumns } from './utils';
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
  ({ userSearch, topRender, searchKey, searchTopRender, ...props }, ref) => {
    const { pagination, search, request } = props;
    // 自定义搜索参数
    const cacheUserSearch = React.useRef<Record<string, any>>({});
    const form = useRef();
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
    const cacheSeach = (search?: Record<string, any>) => {
      if (!searchKey) {
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

    const isFirstRender = React.useRef(true);
    let newRequest: TableProps<any>['request'];
    /** 覆盖默认请求 */
    const modifyDefaultRequest =
      (request: SearchApi<any>): SearchApi<any> =>
      (props, ...args) => {
        let newSe = { ...cacheUserSearch.current, ...props };
        if (isFirstRender.current) {
          const urlSearch = getSearch()?.[searchKey];
          if (urlSearch) {
            let result: Record<string, any> = {};
            // 当链接超长时，可能会出现参数丢失，丢失时直接全部舍弃
            try {
              const decryptStr = decrypt(urlSearch);
              result = JSON.parse(decryptStr);
            } catch {
              result = {};
              console.warn('search 参数错误，请检查数据是否错误: ', urlSearch);
            }

            cacheSeach(result);
          }

          newSe = { ...newSe, ...cacheUserSearch.current };
        }

        // 防止 current 和 pageSize 参数被置为无用字段
        newSe = {
          ...newSe,
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

    const newColumns = useModifyColumns(props.columns, {
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
            hidden: !search,
            ...search,
            schema: search?.schema || defaultSchema,
            form,
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
