const NavbarItems = [
  {
    label: "Список группы",
    route: "/students",
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
  {
    label: "Профиль студента",
    route: "/profile",
  },
];

export default NavbarItems;
