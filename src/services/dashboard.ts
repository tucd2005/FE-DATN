// services/dashboard.service.ts
import instanceAxios from "../utils/axios";

export const dashboardService = {
  async getDashboard() {
    const res = await instanceAxios.get("/admin/dashboard");
    return res.data;
  },
};
