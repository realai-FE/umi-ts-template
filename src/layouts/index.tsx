import * as React from 'react';
import Header from '@/components/Header';
import Container from '@/components/Container';
import './index.less';
interface props {}

const layout: React.FunctionComponent<props> = ({ children }) => {
  return (
    <div className="wrap">
      <Container className="container">
        <Header />
        {children}
      </Container>
    </div>
  );
};

export default layout;
