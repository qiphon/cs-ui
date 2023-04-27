/*
 * @Author: zhangmingyao 791813037@qq.com
 * @LastEditors: qifeng qifeng@carbonstop.net
 * @LastEditTime: 2023-04-26 21:02:49
 * @Date: 2023-04-19 17:49:45
 * @@description:
 */
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import React from 'react';
import { useState } from 'react';

import './index.less';
import { TableFilterStatusProps } from './type';

import { Button, Ellipsis } from 'cs-ui';

/**
 * 测试文件名称
 * @returns
 */
const TableFilterStatus = ({
  options,
  onConfirmClick,
}: TableFilterStatusProps) => {
  const [confirmVal, setConfirmVal] = useState<CheckboxValueType[]>([]);

  const onChange = (val: CheckboxValueType[]) => {
    setConfirmVal(val);
  };

  const confirm = () => {
    onConfirmClick(
      options.filter((o) => confirmVal.includes(o.value)),
      options,
    );
  };
  const cacheClick = () => {
    onConfirmClick(
      options.filter((o) => confirmVal.includes(o.value)),
      options,
    );
    console.log('sdfsdf');
  };
  React.useEffect(() => {
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
      <div className={'listMain'}>
        <Checkbox.Group
          value={confirmVal}
          style={{ width: '100%' }}
          onChange={(checkedValue) => {
            onChange(checkedValue);
          }}
        >
          {options.map((list) => (
            <div className={'listMainItem'} key={list.value}>
              <Checkbox value={list.value}>
                <Ellipsis
                  text={list.label + 'sdfsdfsdfs收到分离焦虑老数据发到哪'}
                />
              </Checkbox>
            </div>
          ))}
        </Checkbox.Group>
      </div>
      <div className={'footerMain'}>
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
        <Button size="small" onClick={async () => confirm()} type="primary">
          确定
        </Button>
      </div>
    </div>
  );
};

export default TableFilterStatus;
