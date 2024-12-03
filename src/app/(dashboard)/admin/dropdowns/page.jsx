import Dropdowns from "@/components/dashboard/admin/Dropdowns";

export default async function DropdownPage() {
  let dropdowns = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dropdowns`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (!data.error) {
      dropdowns = data; // If no error, store the dropdown data
    } else {
      console.error("Error fetching dropdowns:", data.error);
      dropdowns = []; // In case of error, set dropdowns to an empty array
    }
  } catch (error) {
    console.error("Error fetching dropdowns:", error);
    dropdowns = [];
  }

  return (
    <>
      <Dropdowns allDropdowns={dropdowns || []} />
    </>
  );
}
