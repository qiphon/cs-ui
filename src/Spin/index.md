# Spin

loading 组件

## usage

### 小

```tsx
import { Spin } from 'cs-ui';
import React from 'react';

export default () => (
  <div>
    <Spin size="small" />
    <div style={{ height: 1, margin: 20, border: '1px solid' }}></div>
    <Spin size="small" tip="small" />
    <div style={{ height: 1, margin: 20, border: '1px solid' }}></div>
    <Spin size="small" tip="small" tipPlace="bottom" />
  </div>
);
```

### default

```tsx
import { Spin } from 'cs-ui';
import React from 'react';

export default () => (
  <>
    <Spin size="default">
      <div style={{ width: 200, height: 200, background: 'red' }}>
        包含一段文字， 注意 loading 位置要手动修正
      </div>
    </Spin>
    <div style={{ height: 1, margin: 20, border: '1px solid' }}></div>
    <Spin tip="注意 loading 位置要手动修正">
      <div style={{ width: 200, height: 200, background: 'red' }}>
        包含一段文字， 注意 loading 位置要手动修正
      </div>
    </Spin>
    <div style={{ height: 1, margin: 20, border: '1px solid' }}></div>
    <Spin tip="注意 loading 位置要手动修正" tipPlace="bottom">
      <div style={{ width: 200, height: 200, background: 'red' }}>
        包含一段文字， 注意 loading 位置要手动修正
      </div>
    </Spin>
  </>
);
```

### 大

```tsx
import { Spin } from 'cs-ui';
import React from 'react';

export default () => (
  <div>
    <Spin size="large">
      <div style={{ width: 200, height: 200, background: 'red' }}>
        包含一段文字， 注意 loading 位置要手动修正
      </div>
    </Spin>

    <div style={{ height: 1, margin: 20, border: '1px solid' }}></div>
    <Spin size="large" tip="large">
      <div style={{ width: 200, height: 200, background: 'red' }}>
        包含一段文字， 注意 loading 位置要手动修正
      </div>
    </Spin>
    <div style={{ height: 1, margin: 20, border: '1px solid' }}></div>
    <Spin size="large" tip="large" tipPlace="bottom">
      <div style={{ width: 200, height: 200, background: 'red' }}>
        包含一段文字， 注意 loading 位置要手动修正
      </div>
    </Spin>
  </div>
);
```

## [API](https://4x.ant.design/components/spin-cn/#API)

<API id='Spin'></API>
