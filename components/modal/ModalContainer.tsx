import React, { Suspense } from 'react';
import styled from 'styled-components';
import { useSelector, RootState } from 'store';
import Loading from 'components/common/Loading';
import FilterModal from './FilterModal';
interface IProps {
  closeModal: () => void;
}

const Container = styled.div`
  z-index: 11;
`;

const ModalContainer: React.FC<IProps> = ({ closeModal }) => {
  const modal = useSelector((state: RootState) => state.modal.modal);
  return (
    <Container>
      <Suspense fallback={<Loading size={30} loading color="#efffff" />}>
        <>
          {/*여기에 아래와 같이 모달을 선언해주세요 */}
          {modal.type === 'filter' && <FilterModal closeModal={closeModal} />}
        </>
      </Suspense>
    </Container>
  );
};

export default ModalContainer;
