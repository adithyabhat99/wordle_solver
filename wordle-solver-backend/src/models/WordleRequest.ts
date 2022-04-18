type Count = {
  letter: string;
  positions: number[];
};
type WordleRequest = {
  present: Count[];
  notPresent: string[];
  strict: boolean;
};

export { Count, WordleRequest };
