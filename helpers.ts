// Helper Functions

export const updateSubOrdinates = (
  subordinates: any,
  childSubordinates: any,
  index: number
): any => {
  const filteredSubordinates = subordinates.filter((x, i) => i !== index);
  subordinates = [...filteredSubordinates, ...childSubordinates];
  return subordinates;
};
