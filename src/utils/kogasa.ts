import coefficientOfVariation from './coefficientOfVariation';

function kogasa(array: number[]) {
  const cov = coefficientOfVariation(array);
  return 100 * (1 - Math.tanh(cov + Math.pow(cov, 3) / 3 + Math.pow(cov, 5) / 5));
}

export default kogasa;
