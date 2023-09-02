let deleteCourseInTable = async (table, date, room, index) => {
  if (table[date] && table[date][room] && Array.isArray(table[date][room]) && table[date][room][index]) table[date][room].splice(index, 1);
  return table;
};

export default deleteCourseInTable;
