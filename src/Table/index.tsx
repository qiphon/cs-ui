import { TablePaginationConfig } from 'antd';
import classNames from 'classnames';
import { addClassNamePrefix } from 'cs-ui/utils';
import React, {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import TableRender from 'table-render';

import './index.less';
import { SearchApi } from 'table-render/dist/src/types';
import loadingIcon from 'cs-ui/assets/svgs/loading-16-16@2x.png';

import { TableProps, TableRef } from './types';
import { defaultSchema } from './utils';

const XTable: ForwardRefExoticComponent<
  PropsWithoutRef<TableProps<any>> & RefAttributes<TableRef>
> = forwardRef(({ userSearch, topRender, ...props }, ref) => {
  const { pagination, search, columns, request } = props;
  const form = useRef();
  const tableRef = useRef<TableRef>();
  // @ts-ignore   // 传递 ref 参数
  // eslint-disable-next-line
  ref = tableRef.current;
  const [pageInfo, setPageInfo] = useState<TablePaginationConfig>({
    current: 0,
    pageSize: 10,
    size: 'default',
    showSizeChanger: true,
    className: 'tablePagination',
    hideOnSinglePage: false,
    showTotal: (total) => (
      <span className="paginationTotal">共 {total} 条</span>
    ),
    ...(pagination || {}),
  });

  let newRequest: TableProps<any>['request'] = undefined;
  const modifyDefaultRequest = (request: SearchApi<any>): SearchApi<any> => {
    return (props, ...args) => request({ ...props, ...userSearch }, ...args);
  };
  if (typeof request === 'function') {
    newRequest = modifyDefaultRequest(request);
  } else if (Array.isArray(request)) {
    newRequest = request.map((r) => {
      return { ...r, api: modifyDefaultRequest(r.api) };
    });
  }

  useEffect(() => {
    tableRef.current?.refresh?.();
  }, [userSearch]);
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
      <TableRender
        rowKey="id"
        {...props}
        loading={{
          indicator: (
            <div className={classNames('spinShower ')}>
              <img
                src={loadingIcon}
                className="loadingIcon ant-spin-dot"
                alt="loading"
              />
              <span className="loadingMsg">正在加载中，请稍等</span>
            </div>
          ),
        }}
        request={newRequest}
        ref={tableRef}
        columns={columns?.map((c) => {
          return c;
        })}
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
});

export const Table = XTable as unknown as <Row = any>(
  props: TableProps<Row>,
) => JSX.Element;
