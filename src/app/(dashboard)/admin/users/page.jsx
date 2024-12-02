import Users from "@/components/dashboard/admin/User";

export default async function UserPage() {
  let users = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    if (!data.error) {
      users = data;
    } else {
      console.error("Error fetching users:", data.error);
      users = [];
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    users = [];
  }

  return (
    <>
      <Users allUsers={users || []} />
    </>
  );
}
