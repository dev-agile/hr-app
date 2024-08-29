import create from 'zustand';
import axiosInstance from '../utils/axiosInstance';

const useAttendanceStore = create((set) => ({
  attendanceData: [],
  loading: false,

  fetchAttendance: async (id, startDate, endDate) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/employees/attendance/getAttendanceById', {
        id,
        startDate,
        endDate,
      });
      const data = response.data.data;
      set({ attendanceData: data, loading: false });
    } catch (error) {
      console.error('Error fetching attendance:', error);
      set({ loading: false });
    }
  },
}));

export default useAttendanceStore;