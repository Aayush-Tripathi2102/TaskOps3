async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const RandomlyShuffle = (arr: any[]) => {
  return arr.sort(() => Math.random() - 0.5);
};

export { delay };
