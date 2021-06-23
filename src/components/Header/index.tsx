import * as React from 'react';
import { history } from 'umi';
import './index.less';

interface props {}

const Header: React.FC<props> = () => {
  const goTo = (path: string) => history.push(path);
  return (
    <div className="header-container">
      <div className="menu-item" onClick={() => goTo('/group')}>
        哈哈哈
      </div>
      <div className="title">123456</div>
      <div className="menu-item" onClick={() => goTo('/third-party')}>
        嘿嘿
      </div>
    </div>
  );
};
export default Header;
