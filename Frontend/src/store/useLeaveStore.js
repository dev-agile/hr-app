import create from 'zustand';
import axiosInstance from '../utils/axiosInstance';

const useLeaveStore = create((set) => ({
  leaves: [],
  loading: false,
  fetchLeaves: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('leaves/all/employees');
      set({ leaves: response.data.data, loading: false });
    } catch (error) {
      console.error('Error fetching leaves:', error);
      set({ loading: false });
    }
  },
  addLeave: async (leave) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/leave/leaves', {
        ...leave,
        createdBy: 0,
        updatedBy: 0,
      });
      set((state) => ({ leaves: [...state.leaves, response.data], loading: false }));
    } catch (error) {
      console.error('Error adding leave:', error);
      set({ loading: false });
    }
  },
  updateLeave: async (leave) => {
    set({ loading: true });
    try {
      await axiosInstance.put(`/leave/leaves/${leave._id}`, leave);
      set((state) => ({
        leaves: state.leaves.map((l) => (l._id === leave._id ? leave : l)),
        loading: false,
      }));
    } catch (error) {
      console.error('Error updating leave:', error);
      set({ loading: false });
    }
  },
  deleteLeave: async (leaveId) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/leave/leaves/${leaveId}`);
      set((state) => ({
        leaves: state.leaves.filter((l) => l._id !== leaveId),
        loading: false,
      }));
    } catch (error) {
      console.error('Error deleting leave:', error);
      set({ loading: false });
    }
  },
}));

export default useLeaveStore;