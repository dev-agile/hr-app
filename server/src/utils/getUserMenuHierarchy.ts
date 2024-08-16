import UserMenu from 'src/model/UserMenu';
import Menu from '../model/Menu';

export function buildMenuHierarchy(menus:any) {
  // Create a map to hold menu items by their menu_id for quick lookup
  const menuMap = new Map();

  // Populate the map with menu items
  menus.forEach((menu:any) => {
    menu.children = []; // Initialize children array for each menu item
    menuMap.set(menu.menu_id, menu);
  });

  // Array to hold the top-level menu items
  const rootMenus:any = [];

  // Iterate over the menus to build the hierarchy
  menus.forEach((menu:any) => {
    if (menu.ParentId === '0') {
      // If ParentId is '0', it's a root menu item
      rootMenus.push(menu);
    } else {
      // Find the parent menu item using the ParentId
      const parentMenu = menuMap.get(menu.ParentId);
      if (parentMenu) {
        // Add the current menu item to the parent's children array
        parentMenu.children.push(menu);
      } else {
        console.warn(`Parent not found for menu item: ${menu.name} with ParentId: ${menu.ParentId}`);
      }
    }
  });

  return rootMenus;
}
