import create from 'zustand';
import axiosInstance from '../utils/axiosInstance';

const useHolidayStore = create((set) => ({
  holidays: [],
  loading: false, // Add loading state
  fetchHolidays: async () => {
    set({ loading: true }); // Set loading to true before fetching data
    try {
      const response = await axiosInstance.get('/holiday/holidays');
      set({ holidays: response.data.data, loading: false }); // Set loading to false after fetching data
    } catch (error) {
      console.error('Error fetching holidays:', error);
      set({ loading: false }); // Set loading to false in case of error
    }
  },
  addHoliday: async (holiday) => {
    set({ loading: true }); // Set loading to true before adding data
    try {
      const response = await axiosInstance.post('/holiday/holidays', {
        ...holiday,
        createdBy: 0,
        updatedBy: 0,
      });
      set((state) => ({ holidays: [...state.holidays, response.data], loading: false })); // Set loading to false after adding data
    } catch (error) {
      console.error('Error adding holiday:', error);
      set({ loading: false }); // Set loading to false in case of error
    }
  },
  updateHoliday: async (holiday) => {
    set({ loading: true }); // Set loading to true before updating data
    try {
      await axiosInstance.put(`/holiday/holidays/${holiday._id}`, holiday);
      set((state) => ({
        holidays: state.holidays.map((h) =>
          h._id === holiday._id ? holiday : h
        ),
        loading: false, // Set loading to false after updating data
      }));
    } catch (error) {
      console.error('Error updating holiday:', error);
      set({ loading: false }); // Set loading to false in case of error
    }
  },
  deleteHoliday: async (holidayId) => {
    set({ loading: true }); // Set loading to true before deleting data
    try {
      await axiosInstance.delete(`/holiday/holidays/${holidayId}`);
      set((state) => ({
        holidays: state.holidays.filter((h) => h._id !== holidayId),
        loading: false, // Set loading to false after deleting data
      }));
    } catch (error) {
      console.error('Error deleting holiday:', error);
      set({ loading: false }); // Set loading to false in case of error
    }
  },
}));

export default useHolidayStore;
