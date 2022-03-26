const RankItem = () => {
  return (
    <div className="flex">
      <div className="flex-center">
        <div>1</div>
        <div>아이콘</div>
        <div>
          <div className="user-name">title</div>
          <div className="user-name">익명</div>
          <div className="flex">
            <span className="rating">4.5</span>
            <span className="rating">별</span>
            <span className="rating">(130)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const RankTrand = () => {
  return (
    <div className="flex-space-between">
      <div className="flex-column">
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
      </div>
      <div className="flex-column">
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
      </div>
      <div className="flex-column">
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
      </div>
    </div>
  );
};

export default RankTrand;
