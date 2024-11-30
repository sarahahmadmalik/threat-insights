import { getSession } from "next-auth/react";

// Check if the user is authenticated
export const checkAuth = async (req) => {
  const session = await getSession({ req });

  if (!session) {
    return { error: "User is not authenticated" };
  }

  return { session };
};

// Check if the user has a specific role
export const checkRole = (session, requiredRole) => {
  if (!session?.user?.role) {
    return { error: "User role is not defined" };
  }

  if (session.user.role !== requiredRole) {
    return { error: `Unauthorized access: User does not have ${requiredRole} privileges.` };
  }

  return { session };
};



