import mean from './mean';
import standardDeviation from './standardDeviation';

function coefficientOfVariation(array: number[]) {
  console.log(standardDeviation(array) / mean(array));
  return standardDeviation(array) / mean(array);
}

export default coefficientOfVariation;
