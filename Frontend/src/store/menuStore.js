import create from 'zustand';
import axiosInstance from '../utils/axiosInstance';

const useMenuStore = create((set) => ({
  menus: [],
  loading: false,

  fetchMenus: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/menu');
      const data = response.data.data;
   
      set({ menus: data, loading: false });
      
    } catch (error) {
      console.error('Error fetching menus:', error);
      set({ loading: false });
    }
  },

  fetchUserMenus: async (role_id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/menu/getRoleMenu', { role_id });
      const data = response.data.data;
      set({ loading: false });
      return data;
    } catch (error) {
      console.error('Error fetching user menus:', error);
      set({ loading: false });
    }
  },

  createUserMenu: async (role_id, menuIds) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/menu/role-menu', { role_id, menuIds });
      const userMenu = response.data.data;
      set((state) => ({ 
        loading: false,
      }));
    } catch (error) {
      console.error('Error creating/updating user menu:', error);
      set({ loading: false });
    }
  },

  addMenu: async (menu) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/menu/menus', menu);
      set((state) => ({ menus: [...state.menus, response.data], loading: false }));
    } catch (error) {
      console.error('Error adding menu:', error);
      set({ loading: false });
    }
  },

  updateMenu: async (menu) => {
    set({ loading: true });
    try {
      await axiosInstance.put(`/menu/menus/${menu._id}`, menu);
      set((state) => ({
        menus: state.menus.map((m) => (m._id === menu._id ? menu : m)),
        loading: false,
      }));
    } catch (error) {
      console.error('Error updating menu:', error);
      set({ loading: false });
    }
  },

  deleteMenu: async (menuId) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/menu/menus/${menuId}`);
      set((state) => ({
        menus: state.menus.filter((m) => m._id !== menuId),
        loading: false,
      }));
    } catch (error) {
      console.error('Error deleting menu:', error);
      set({ loading: false });
    }
  },
}));

export default useMenuStore;