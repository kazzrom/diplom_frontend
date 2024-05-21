const NavbarItems = [
  {
    label: "Группа",
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
    url: "https://docs.google.com/spreadsheets/d/1mzg0pqcHljTZU7aObkZ_sy-zRVhfscED/edit?usp=drive_link&ouid=114435406066204811756&rtpof=true&sd=true",
  },
];

export default NavbarItems;
