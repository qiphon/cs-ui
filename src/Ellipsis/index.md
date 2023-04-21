# Ellipsis

文本超出自动省略

### usage

#### 放在 table 中

```tsx
import React from 'react';
import { Table, Button, Ellipsis } from 'cs-ui';
import { xRenderSeachSchema } from 'cs-ui/Table/utils';

export default () => {
  const getData = (size, total) => ({
    data: new Array(size).fill(1).map((v, k) => {
      return {
        realName: k + 'realname' + String(Math.random()).slice(-3),
        mobile: k + 'mobile' + String(Math.random()).slice(-3),
        orgNames: k + 'orgNames' + String(Math.random()).slice(-3),
        roleNames: k + 'roleNames' + String(Math.random()).slice(-3),
        updateByName: k + 'updateByName' + String(Math.random()).slice(-3),
        updateTime: k + 'updateTime' + String(Math.random()).slice(-3),
      };
    }),
    total: total || size,
  });
  const api = ({ current: page, pageSize }) => {
    if (page === 1) {
      return Promise.resolve(getData(pageSize, 100));
    }
    return Promise.resolve(getData(pageSize, 100));
  };
  return (
    <div style={{ padding: 10, background: 'red', height: 500 }}>
      <Table
        topRender={{
          left: '用户列表',
          right: (
            <div className="flex-row-between-center">
              <Button>自定义1</Button>
              <Button>2</Button>
            </div>
          ),
        }}
        search={{
          // hidden: true,
          schema: {
            type: 'object',
            properties: {
              likeUserInfo: xRenderSeachSchema({
                type: 'string',
                placeholder: '请输入用户名/姓名/手机号',
              }),
              sdfsdf: xRenderSeachSchema({
                type: 'string',
                placeholder: '请输入用户名/姓名/手机号',
              }),
            },
          },
        }}
        request={api}
        columns={[
          {
            title: '姓名',
            dataIndex: 'realName',
          },
          {
            title: '手机号',
            dataIndex: 'mobile',
          },
          {
            title: '所属组织',
            dataIndex: 'orgNames',
          },
          {
            title: '角色',
            dataIndex: 'roleNames',
          },

          {
            title: '看我看我',
            dataIndex: 'updateByName',
            render(t) {
              return <Ellipsis text={t}></Ellipsis>;
            },
          },
          {
            title: '更新时间',
            dataIndex: 'updateTime',
            width: 200,
          },
        ]}
      />
    </div>
  );
};
```

#### 通用型

```tsx
import { Ellipsis } from 'cs-ui';

export default () => (
  <div style={{ maxWidth: 200, background: 'red' }}>
    <Ellipsis text="carbonstop - 让每个产品都有碳足迹"></Ellipsis>
  </div>
);
```
