const NavbarItems = [
  {
    label: "Группа",
    items: [
      {
        label: "Список студентов",
        route: "/students",
      },
      {
        label: "Актив группы",
        route: "/group-active",
      },
    ],
  },
  {
    label: "Социальный паспорт",
    route: "/social-passport",
  },
  {
    label: "Протоколы",
    items: [
      {
        label: "Родительские собрания",
        route: "/parent-meetings",
      },
      {
        label: "Собрания группы",
        route: "/group-meetings",
      },
      {
        label: "Классные часы",
        route: "/homerooms",
      },
    ],
  },
  {
    label: "Посещаемость",
    url: "#",
  },
  {
    label: "Успеваемость",
    url: "#",
  },
];

export default NavbarItems;
