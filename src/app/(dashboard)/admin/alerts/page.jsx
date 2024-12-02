import Alerts from "@/components/dashboard/admin/Alerts";
import { AlertCount } from "@/utils/Alerts";

export default async function AlertsPage() {
  let alertCounts = null;

  try {
    alertCounts = await AlertCount();
    if (alertCounts.error) {
      console.log(alertCounts.error);
      alertCounts = [];
    }
  } catch (error) {
    console.error("Error fetching alert counts:", error);
    alertCounts = [];
  }

  return (
    <>
      <Alerts alerts={alertCounts || []} />
    </>
  );
}
