import { useState } from 'react';
import { toast } from 'sonner';
import { DashboardService } from '../utility/service/dashboardService';

export const DashboardCountHook = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [dashboardCount, setDashboardCount] = useState<any>(null);
  const fetchData = async (user_id: number) => {
    try {
      setIsLoading(true);
      const result = await DashboardService.getDashboardCount(user_id);
      setDashboardCount(result);
    } catch (error: any) {
      error?.data?.error && toast.error(error?.data?.error);
      error?.data?.message && toast.error(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    dashboardCount,
    fetchData
  };
};
