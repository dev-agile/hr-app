import create from 'zustand';
import axiosInstance from '../utils/axiosInstance';

const useRoleStore = create((set) => ({
  roles: [],
  loading: false,
  error: null,
  fetchRoles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/admin/role');
      set({ roles: response.data.data, loading: false });
    } catch (error) {
      console.error('Error fetching roles:', error);
      set({ loading: false, error: error.message });
    }
  },
  addRole: async (role) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/admin/role', role);
      set((state) => ({ roles: [...state.roles, response.data.data], loading: false }));
    } catch (error) {
      console.error('Error adding role:', error);
      set({ loading: false, error: error.message });
    }
  },
  updateRole: async (roleId, role) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/admin/role/${roleId}`, role);
      set((state) => ({
        roles: state.roles.map((r) => (r._id === roleId ? response.data.data : r)),
        loading: false,
      }));
    } catch (error) {
      console.error('Error updating role:', error);
      set({ loading: false, error: error.message });
    }
  },
  deleteRole: async (roleId) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/role/${roleId}`);
      set((state) => ({
        roles: state.roles.filter((r) => r._id !== roleId),
        loading: false,
      }));
    } catch (error) {
      console.error('Error deleting role:', error);
      set({ loading: false, error: error.message });
    }
  },
}));

export default useRoleStore;
