export type MenuItems = {
  title: string;
  group?: boolean;
  icon?: {
    name: string;
  };
  link?: {
    href: string;
  };
  children?: MenuItems[];
  type?: string;
};
