import styled from 'styled-components';
import iconMap from 'lib/iconMap';
import MenuContainer from 'components/myPage/MenuContainer';

const St = {};

const MobileMypage = () => {
  return (
    <div>
      <div className="flex-center" style={{ borderBottom: '1px solid' }}>
        <div>
          <img src="" alt="" style={{ width: '50px', height: '50px' }} />
        </div>
        <div style={{ padding: '0 1rem' }}>
          <div>렁렁이</div>
          <div>#423</div>
        </div>
        <div>
          <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            편의점 MASTER
          </h1>
        </div>
      </div>
      <div>
        <MenuContainer />
      </div>
    </div>
  );
};
export default MobileMypage;
