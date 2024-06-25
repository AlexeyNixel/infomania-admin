import type { MetaType } from './common';

export type MenuType = {
  id: string;
  oldId: number;
  title: string;
  isDeleted: boolean;
  menuType: string;
  // menuItems: MenuItem;
};

export type MenuResponseType = {
  data: MenuType[];
  meta: MetaType;
};
