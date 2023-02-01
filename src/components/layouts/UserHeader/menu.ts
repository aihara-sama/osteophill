interface IMenu {
  title: string;
  href: string;
}

const menu: IMenu[] = [
  {
    title: "Head",
    href: "/bones/head",
  },
  {
    title: "Vertebral column",
    href: "/bones/vertebral-column",
  },
  {
    title: "Rib cage",
    href: "/bones/rib-cage",
  },
  {
    title: "Limbs",
    href: "/bones/limbs",
  },
];

export { menu };
