function mean(array: number[]) {
  return array.reduce((a, b) => a + b) / array.length;
}

export default mean;
