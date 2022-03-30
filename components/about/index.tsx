import React from 'react';
import AboutCard from 'components/about/AboutCard';
import styled from 'styled-components';

const AboutContainer = () => {
  return (
    <div>
      <AboutCardContainer>
        <AboutCard
          thumbnailPath={'/static/images/user/westkite.jpg'}
          memUsername={'김서연'}
          memNickname={'westkite1201'}
          memInfo={'한량이 되고 싶은 못된 개발자! '}
          githubUrl={'https://github.com/westkite1201'}
        />
        <AboutCard
          thumbnailPath={'/static/images/user/mason.jpg'}
          memUsername={'명성'}
          memNickname={'MasonMyeong'}
          memInfo={'풀스택을 지향하는 로직마스터'}
          githubUrl={'https://github.com/SeongMyeong'}
        />
      </AboutCardContainer>
    </div>
  );
};

const AboutCardContainer = styled.div``;
export default AboutContainer;
