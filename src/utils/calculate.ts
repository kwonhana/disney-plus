export const calculateAge = (year: number, month: number, date: number): number => {
  const today = new Date();
  const birth = new Date(year, month - 1, date);

  let age = today.getFullYear() - birth.getFullYear();

  const isBeforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());

  if (isBeforeBirthday) {
    age -= 1;
  }

  return age;
};
