import mean from './mean';

function standardDeviation(array: number[]) {
  const meanValue = mean(array);
  return Math.sqrt(array.reduce((a, b) => {
    return a + Math.pow(b - meanValue, 2);
  }, 0) / array.length);
}

export default standardDeviation;
