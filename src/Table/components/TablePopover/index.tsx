/*
 * @Author: qifeng
 * @LastEditors: qifeng qifeng@carbonstop.net
 * @LastEditTime: 2023-05-18 17:11:12
 * @Date: 2023-04-19 17:49:45
 * @@description: 表格筛选
 */
import { Checkbox, Input, Radio } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import classNames from 'classnames';
import { Button, Ellipsis } from 'cs-ui';
import { SearchIcon } from 'cs-ui/Icons/SearchIcon';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

import './index.less';
import { TableFilterStatusProps } from './type';
import { isOptionShow } from './utils';

const TableFilterStatus = ({
  options,
  value,
  onConfirmClick,
  showSearch,
  multiple,
}: TableFilterStatusProps) => {
  /** 选中的值 */
  const [confirmVal, setConfirmVal] = useState<CheckboxValueType[]>(
    value || [],
  );
  /** 筛选值 */
  const [filterVal, setFilterVal] = useState('');

  // /** 当前的选中项 */
  // const checkedAfterFilter = useMemo(() => {
  //   return (
  //     options
  //       .map((o) => {
  //         if (isOptionShow(filterVal, o) && confirmVal.includes(o.value)) {
  //           return o.value;
  //         } else {
  //           return null;
  //         }
  //       })
  //       // 去除 null 、undefined
  //       .filter(
  //         (v) => !(Object.is(v, undefined) || Object.is(null, v)),
  //       ) as CheckboxValueType[]
  //   );
  // }, [filterVal, options, confirmVal]);

  /** 重复记录选中的值，防止事件监听中的事件无法正确拿到选中项 */
  const checked = useRef<CheckboxValueType[]>(value || []);

  const onChange = (val: CheckboxValueType[]) => {
    setConfirmVal(val);
    checked.current = val;
  };
  /** 同步选中的信息到 ref 中 */
  useEffect(() => {
    onChange(value || []);
  }, [value]);

  // 提交数据
  const confirm = (isEmpty?: boolean) => {
    if (isEmpty) {
      onConfirmClick([], [], options);
    } else {
      onConfirmClick(
        confirmVal,
        options.filter((o) => confirmVal.includes(o.value)),
        options,
      );
    }
  };
  const cacheClick = () => {
    onConfirmClick(
      checked.current,
      options.filter((o) => checked.current.includes(o.value)),
      options,
    );
  };
  React.useLayoutEffect(() => {
    document.addEventListener('click', cacheClick);
    return () => {
      document.removeEventListener('click', cacheClick);
    };
  }, []);

  return (
    <div
      className={'tableFilterStatusMain'}
      onClick={(ev) => {
        ev.stopPropagation();
      }}
    >
      {(options.length > 5 || !!showSearch) && (
        <Input
          className="filterSearch"
          prefix={<SearchIcon />}
          placeholder="搜索"
          allowClear
          onChange={(ev) => {
            setFilterVal(ev.target.value);
          }}
        />
      )}
      <div className={'listMain'}>
        {multiple ? (
          <Checkbox.Group
            value={confirmVal}
            style={{ width: '100%' }}
            onChange={(checkedValue) => {
              onChange(checkedValue);
              // const isRm = checkedAfterFilter.length > checkedValue.length;
              // // 受筛选影响，需要处理成真正的选中项
              // if (isRm) {
              //   const result = checkedAfterFilter.filter(
              //     (v) => !checkedValue.includes(v),
              //   );
              //   // 移除
              //   onChange(difference(confirmVal, result));
              // } else {
              //   // 添加
              //   const result = checkedValue.filter(
              //     (v) => !checkedAfterFilter.includes(v),
              //   );
              //   onChange(confirmVal.concat(result));
              // }
            }}
          >
            {options.map((list) => (
              <div
                className={classNames('listMainItem', {
                  hide: !isOptionShow(filterVal, list),
                })}
                key={list.value}
              >
                <Checkbox value={list.value}>
                  <Ellipsis text={list.label} />
                </Checkbox>
              </div>
            ))}
          </Checkbox.Group>
        ) : (
          <Radio.Group
            onChange={(e) => {
              onChange([e.target.value]);
            }}
            value={confirmVal[0]}
          >
            {options.map((list) => (
              <div
                className={classNames('listMainItem', {
                  hide: !isOptionShow(filterVal, list),
                })}
                key={list.value}
              >
                <Radio value={list.value}>
                  <Ellipsis text={list.label} />
                </Radio>
              </div>
            ))}
          </Radio.Group>
        )}
      </div>
      <div className={'footerMain'}>
        {multiple ? (
          <Checkbox
            className="checkAll"
            indeterminate={
              options.length !== confirmVal.length && confirmVal.length > 0
            }
            onChange={(ev) => {
              const check = ev.target.checked;
              if (check) {
                setConfirmVal(options.map((o) => o.value));
              } else {
                setConfirmVal([]);
              }
            }}
          >
            全选
          </Checkbox>
        ) : (
          <Button
            size="small"
            onClick={async () => {
              setConfirmVal([]);
              confirm(true);
            }}
          >
            取消
          </Button>
        )}
        <Button size="small" onClick={async () => confirm()} type="primary">
          确定
        </Button>
      </div>
    </div>
  );
};

export default TableFilterStatus;
