const roleFake = {
  1: {
    id: 1,
    name: "all",
    show: ["roles", "employees", "institutes"],
    permission: ["user.all", "account.update", "role.update"],
  },
  2: {
    id: 2,
    name: "admin",
    show: ["roles", "employees", "institutes"],
    permission: ["user.all", "account.delete", "role.update"],
  },
  3: {
    id: 3,
    name: "reg",
    show: ["roles", "employees", "institutes"],
    permission: ["user.all", "account.create", "role.update"],
  },
};

export default roleFake;
