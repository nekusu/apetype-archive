import mean from './mean';
import standardDeviation from './standardDeviation';

function coefficientOfVariation(array: number[]) {
  return standardDeviation(array) / mean(array);
}

export default coefficientOfVariation;
