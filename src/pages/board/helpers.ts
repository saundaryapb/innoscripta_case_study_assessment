export const createOptionsFromEnum = (enumObject: Record<string, string>) => {
   return Object.values(enumObject).map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
   }));
};
