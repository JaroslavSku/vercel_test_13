const startingFloors = [
  {
    desc: "Podzemní podlaží",
    value: -1,
  },
  {
    desc: "Přízemí",
    value: 0,
  },
  {
    desc: "1.patro",
    value: 1,
  },
];

export const floorNumbers = (max = 40) => {
  const numbers = [];
  for (let index = 2; index < max; index++) {
    numbers.push({
      desc: `${index}.Patro`,
      value: index,
    });
  }
  const floorNumbers = [...startingFloors, ...numbers];
  return floorNumbers;
};
