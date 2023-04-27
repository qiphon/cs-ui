# Table

### 表格分类

表格组件有三种：基础表格、高级表格、增强型表格；

a. 基础表格

包含一些基础功能：固定行、固定列、分页、多级表头、表尾合计、加载态、空数据等；

b. 高级表格

包含一些更高级的功能：行展开/收起、字段可交互、新增单元格、操作区悬浮态、拖拽排序等；

c. 增强型表格

包含一些更复杂的功能：树形结构等。

### 交互规则

- 表头和单元格采用左对齐方式，字段设定最小宽度，多余间距均分到每列，每列之间安全区域为 32px；
- 操作区按钮数量有 3 个 以上时，将主要的操作按钮进行展示，次要的操作按钮隐藏收到“更多”里，用户悬停后展示操作选项；
- 当表格的行与列数量过多一屏展示不下时，则需要采取固定表格中的关键信息与操作区域，从而使用户进行快速操作；
- 表格内可通过单选框和多选框进行勾选交互；
- 表格内如果信息可编辑，点击可进行编辑交互；
- 数据为空值，则单元格显示为短横线“-”；
- 表格信息还在加载时，可显示加载动画的反馈。

### 基础表格

- 标题栏：标题栏栏高为 48PX
- 内容栏：栏高为 48PX
- 表头背景色：#F7F8F9
- 表头字体：#343A40 苹方/中黑体
- 表格字体：#343A40 苹方/常规体
- 分割线：#EBEDF0

## demo

为了观看明显，背景使用红色

### 没有数据

```tsx
import React, { useRef, useEffect } from 'react';
import { Table, Button, Ellipsis } from 'cs-ui';
// import { TableRef } from 'cs-ui/types';
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
    total: 0 || size,
  });
  const api = ({ current: page, pageSize }) => {
    if (page === 1) {
      return Promise.resolve(getData(0, 0));
    }
    return new Promise((r) => {
      setTimeout(() => r(getData(0, 0)), 3000);
    });
  };
  // const tableRef = useRef<TableRef | null>(null);

  return (
    <div style={{ padding: 10, background: 'red', height: 500 }}>
      <Table
        topRender={{
          left: '用户列 表',
          right: (
            <div className="flex-row-between-center">
              <Button>自定义1</Button>
              <Button>2</Button>
            </div>
          ),
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
            title: '更新人',
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

### search 上面插槽

```tsx
import React, { useRef, useEffect } from 'react';
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
    total: 0 || size,
  });
  const api = ({ current: page, pageSize }) => {
    if (page === 1) {
      return Promise.resolve(getData(0, 0));
    }
    return new Promise((r) => {
      setTimeout(() => r(getData(0, 0)), 3000);
    });
  };
  // const tableRef = useRef<TableRef | null>(null);

  return (
    <div style={{ padding: 10, background: 'red', height: 500 }}>
      <Table
        topRender={{
          left: '用户列 表',
          right: (
            <div className="flex-row-between-center">
              <Button>自定义1</Button>
              <Button>2</Button>
            </div>
          ),
        }}
        searchTopRender={
          <div style={{ background: '#adf' }}> 我是顶部插槽</div>
        }
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
            title: '更新人',
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

### 通用型

```tsx
import React, { useRef, useEffect } from 'react';
import { Table, Button, Ellipsis } from 'cs-ui';
// import { TableRef } from 'cs-ui/types';
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
    return new Promise((r) => {
      setTimeout(() => r(getData(pageSize, 100)), 1113000);
    });
  };
  // const tableRef = useRef<TableRef | null>(null);

  return (
    <div style={{ padding: 10, background: 'red', height: 500 }}>
      <Table
        topRender={{
          left: '用户列 表',
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
            title: '更新人',
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

### title 中添加 tooltip

```tsx
import React, { useRef, useEffect } from 'react';
import { Table, Button, Ellipsis } from 'cs-ui';
// import { TableRef } from 'cs-ui/types';
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
    return new Promise((r) => {
      setTimeout(() => r(getData(pageSize, 100)), 1113000);
    });
  };
  // const tableRef = useRef<TableRef | null>(null);

  return (
    <div style={{ padding: 10, background: 'red', height: 500 }}>
      <Table
        topRender={{
          left: '用户列 表',
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
            tooltip: '1111111收到雷锋精神两地分居失蜡法',
          },
          {
            title: '手机号',
            dataIndex: 'mobile',
            tooltip: '132213收到雷锋精神两地分居失蜡法',
            filterOptions: new Array(41).fill(1).map((o, i) => ({
              label: `测试${i}`,
              value: i,
            })),
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
            title: '更新人',
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

### 多搜索项

```tsx
import React, { useRef, useEffect } from 'react';
import { Table, Button, Ellipsis } from 'cs-ui';
// import { TableRef } from 'cs-ui/types';
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
  // const tableRef = useRef<TableRef | null>(null);
  const columns = [
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
      title: '更新人',
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
  ];
  return (
    <div style={{ padding: 10, background: 'red', height: 500 }}>
      <Table
        topRender={{
          left: '用户列 表',
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
              orgId: xRenderSeachSchema({
                type: 'number',
                placeholder: '请选择所属组织',
                widget: 'select',
              }),
              roleId: xRenderSeachSchema({
                type: 'number',
                placeholder: '请选择角色',
                widget: 'select',
              }),
              userStatus: xRenderSeachSchema({
                type: 'number',
                placeholder: '请选择状态',
                widget: 'select',
              }),
            },
          },
        }}
        request={api}
        columns={columns}
      />
    </div>
  );
};
```

### 没有 search

```tsx
import React from 'react';
import { Table, Button } from 'cs-ui';
import { xRenderSeachSchema } from 'cs-ui/Table/utils';
import { Tooltip } from 'antd';

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
            title: '更新人',
            dataIndex: 'updateByName',
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

### 没有顶部 title 和 按钮

```tsx
import React from 'react';
import { Table, Button } from 'cs-ui';
import { xRenderSeachSchema } from 'cs-ui/Table/utils';
import { Tooltip } from 'antd';

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
            title: '更新人',
            dataIndex: 'updateByName',
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

### 只有一条数据

```tsx
import React from 'react';
import { Table, Button } from 'cs-ui';
import { xRenderSeachSchema } from 'cs-ui/Table/utils';
import { Tooltip } from 'antd';

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
      return Promise.resolve(getData(1, 100));
    }
    return Promise.resolve(getData(pageSize, 100));
  };
  return (
    <div style={{ padding: 10, background: 'red', height: 500 }}>
      <Table
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
            title: '更新人',
            dataIndex: 'updateByName',
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

### 没有分页

```tsx
import React from 'react';
import { Table, Button } from 'cs-ui';
import { xRenderSeachSchema } from 'cs-ui/Table/utils';
import { Tooltip } from 'antd';

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
      return Promise.resolve(getData(1, 100));
    }
    return Promise.resolve(getData(pageSize, 100));
  };
  return (
    <div style={{ padding: 10, background: 'red', height: 500 }}>
      <Table
        request={api}
        pagination={false}
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
            title: '更新人',
            dataIndex: 'updateByName',
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

### 只有一条数据

```tsx
import React from 'react';
import { Table, Button } from 'cs-ui';
import { xRenderSeachSchema } from 'cs-ui/Table/utils';
import { Tooltip } from 'antd';

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
      return Promise.resolve(getData(1, 100));
    }
    return Promise.resolve(getData(pageSize, 100));
  };
  return (
    <div style={{ padding: 10, background: 'red', height: 500 }}>
      <Table
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
            title: '更新人',
            dataIndex: 'updateByName',
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

## [API](https://xrender.fun/table-render/api)

<API id='Table'></API>

## Ref

可通过 `Ref` 获取如下 `table-render` 的 context

| 属性      | 描述                                                                                                                         | 类型                                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| refresh   | 刷新表格数据，详见[Refresh](#refresh)                                                                                        | `(config, search) => Promise<void>` |
| changeTab | 手动切换 tab 的函数，例如目前两个搜索 tab： “我的活动”，“全部活动” （分别对应 tab 值为 0 和 1），详见[ChangeTab](#changetab) | `(tab) => void`                     |
| form      | Search 组件是 form-render 生成的，可以取到搜索表单的 form 实例以及挂在上面的方法，例如 `form.resetFields` 清空搜索项         | `object`                            |
| getState  | 这些是全局的状态，根据需要使用                                                                                               | [TableStateType](#tablestate)       |
| setState  | 用于修改全局状态的工具函数，setTable 之于 tableState，等同 setState 之于 state                                               | `(tableState) => void`              |

#### Refresh

主动触发表单刷新的方法

```ts
type Refresh = (
  config?: {
    stay: boolean; // 刷新之后是否停留在目前的页码上，默认 false，回到第一页
    tab: number; // searchApi 有多个时，用于强制搜索某个 tab 对应的 searchApi
  },
  search?: any, // 额外传递给 searchApi 的参数
) => Promise<void>;

const onClick = () => {
  tableRef.current.refresh({ stay: true }); // 刷新数据，但停留在现有的页码
};
```

#### ChangeTab

手动切换当前 tab 的方法

```ts
type ChangeTab = (tab: number) => Promise<void>;

const onClick = () => {
  tableRef.current.changeTab(1); // 手动切换到对应tab
};
```
