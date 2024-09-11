import create from 'zustand';
import axiosInstance from '../utils/axiosInstance';

const useUserStore = create((set) => ({
  users: [],
  currentUser: null,
  loading: false,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/users');
      console.log("Response is",response);
      set({ users: response.data.message, loading: false });
    } catch (error) {
      console.error('Error fetching users:', error);
      set({ loading: false });
    }
  },
  getUser: async (user) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/users/${user}`);
      console.log("Response is",response);
      set({currentUser:response.data.message})
      set({ users: response.data.message, loading: false });
    } catch (error) {
      console.error('Error fetching users:', error);
      set({ loading: false });
    }
  },

  addUser: async (user) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/users', user);
      set((state) => ({ users: [...state.users, response.data.user], loading: false }));
      return response; // Return the entire response data
    } catch (error) {
      console.error('Error adding user:', error);
      set({ loading: false });
      throw error; // Re-throw the error so it can be caught by the component
    }
  },
  updateUser: async (user) => {
    set({ loading: true });
    try {
      await axiosInstance.put(`/users/${user._id}`, user);
      set((state) => ({
        users: state.users.map((u) => u._id === user._id ? user : u),
        loading: false,
      }));
    } catch (error) {
      console.error('Error updating user:', error);
      set({ loading: false });
    }
  },

  deleteUser: async (userId) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/users/${userId}`);
      set((state) => ({
        users: state.users.filter((u) => u._id !== userId),
        loading: false,
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
      set({ loading: false });
    }
  },

  setCurrentUser: (user) => {
    set({ currentUser: user });
  },

  login: async (credentials) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      set({ currentUser: response.data.user, loading: false });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      set({ loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstance.post('/auth/logout');
      set({ currentUser: null, loading: false });
    } catch (error) {
      console.error('Error logging out:', error);
      set({ loading: false });
    }
  }
}));

export default useUserStore;