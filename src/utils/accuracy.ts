function accuracy(errors: number, characters: number) {
  return Math.max((1 - errors / characters) * 100, 0);
}

export default accuracy;
