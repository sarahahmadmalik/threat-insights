import db from "./db";
import Alerts from "@/models/Alerts";

export const AlertCount = async () => {
  // Connect to the database
  await db();

  try {
    // Perform the aggregation query to count alerts per user
    const alertCounts = await Alerts.aggregate([
      {
        $group: {
          _id: "$userID", // Group by userID
          alertCount: { $sum: 1 }, // Count the number of alerts per user
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          _id: 1,
          alertCount: 1,
          user: { $arrayElemAt: ["$user", 0] },
        },
      },
    ]);

    console.log(alertCounts);
    return alertCounts;
  } catch (error) {
    console.log("Error fetching alert counts:", error);
    return { error };
    // throw new Error("Failed to fetch alert counts");
  }
};
