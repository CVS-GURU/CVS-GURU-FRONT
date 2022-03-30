import React from 'react';
import {
  GithubOutlined,
  InstagramOutlined,
  MailOutlined,
  MehOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

const St = {
  StyledWrapper: styled.div`
    .my_infomation_wrapper {
      padding: 10px 20px;
      border-radius: 20px;
      margin: auto;
      color: black;
      min-width: 500px;
      max-width: 500px;
      .my_infomation_container {
        display: flex;
        align-items: center;
        .my_infomation_thumbnail {
          width: 100px;
          height: 100px;
          flex-shrink: 0;
          border-radius: 10%;
          object-fit: cover;
          object-position: top;
          border-radius: 50px;
        }
        .my_infomation_body {
          margin-left: 20px;
          min-width: 300px;
          text-align: left;
          .my_infomation_name {
            text-align: left;
            font-family: 'BlackHanSans-Regular';
            font-size: 1.4rem;
            margin: -2px 0 4px -1px;
            color: #8973b0;
            .my_infomation_nick_name {
              padding-left: 10px;
              text-align: left;
              font-size: 1.2rem;
              color: #9d6fa5;
            }
          }

          .my_infomation_contents {
            font-family: 'NotoSansKR-Medium';
            font-size: 1.2rem;
            font-weight: 400;
          }
        }
      }
    }
  `,
};

const AboutCard = ({
  thumbnailPath,
  memUsername,
  memNickname,
  memInfo,
  githubUrl,
}: any) => {
  return (
    <St.StyledWrapper className="my_infomation_wrapper">
      <div className="my_infomation_container">
        <div className="my_infomation_thumbnail">
          {thumbnailPath ? (
            <img
              alt="thumbnail"
              className="my_infomation_thumbnail"
              src={thumbnailPath}
            ></img>
          ) : (
            <div style={{ width: '100%', height: '100%' }}>
              <MehOutlined style={{ fontSize: '100px' }} />
            </div>
          )}
        </div>
        <div className="my_infomation_body">
          <div className="my_infomation_name">
            {memUsername}
            <span className="my_infomation_nick_name">{memNickname}</span>
          </div>

          <div className="my_infomation_contents">{memInfo}</div>
          <IconContainer>
            <div>
              <GithubOutlined
                onClick={() => window.open(githubUrl, '_blank')}
              />
            </div>
            <div>
              <InstagramOutlined />
            </div>
            <div>
              <MailOutlined />
            </div>
          </IconContainer>
        </div>
      </div>
    </St.StyledWrapper>
  );
};

const IconContainer = styled.div`
  display: flex;
  justify-content: left;
  font-size: 20px;
  div {
    padding: 5px;
  }
`;
export default AboutCard;
