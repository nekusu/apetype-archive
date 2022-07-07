import styled from 'styled-components';

const TestResults = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: fit-content 1fr;
  align-items: center;
  gap: 20px;
  cursor: default;
`;

const Wrapper = styled.div`
  height: 200px;
  max-height: 200px;
  width: 100%;
`;

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const MoreStats = styled(Stats)`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  grid-column: 1 / -1;
`;

const Styled = {
  TestResults,
  Wrapper,
  Stats,
  MoreStats,
};

export default Styled;
