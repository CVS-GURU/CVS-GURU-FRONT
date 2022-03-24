import styled from 'styled-components';
import Link from 'next/link';
import { Card } from 'types';

const St = {
  CardWrapper: styled.div`
    cursor: pointer;
    height: 150px;
    text-align: center;
    background: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.fontColor};
    margin: 5px;
  `,
};

const CardComponent: React.FC<Card> = ({ number, title }) => {
  return (
    <Link href={`/data/${number}`}>
      <St.CardWrapper>
        <div>{`${number}`}</div>

        <h1>{`${title}`}</h1>
      </St.CardWrapper>
    </Link>
  );
};

export default CardComponent;
