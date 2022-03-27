import styled from 'styled-components';
import { Row, Col } from 'antd';

const St = {
  CategoryViewerWrapper: styled.div`
    margin-bottom: 3rem;
  `,
  Title: styled.div`
    margin: 5rem 0;
    font-size: 3rem;
    font-weight: 900;
  `,
  CategoryCardWrapper: styled.div`
    border-radius: 16px;
  `,
};

const CategoryCard = ({ title }) => {
  return (
    <St.CategoryCardWrapper>
      <div style={{ height: '200px' }}>
        <img
          src="/static/images/home/main.jpg"
          alt=""
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div
        style={{
          height: '50px',
          fontWeight: 800,
          textAlign: 'center',
          fontSize: '3rem',
          padding: '1rem',
        }}
      >
        {title}
      </div>
    </St.CategoryCardWrapper>
  );
};
const CVSViewer = () => {
  return (
    <St.CategoryViewerWrapper>
      <hr />
      <St.Title className="flex-center">
        <span> 편의점 별로 보기</span>
      </St.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <CategoryCard title="CU" />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <CategoryCard title="gs25" />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <CategoryCard title="세븐일레븐" />
        </Col>
      </Row>
    </St.CategoryViewerWrapper>
  );
};

export default CVSViewer;
