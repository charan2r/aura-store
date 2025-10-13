// Get all User Details Route
app.get("/get-user", async (req, res) => {
  try {
    const users = await mongoose.model("User").find(
      {}, // Remove filter to get all users
      "-password" // Exclude only the password field
    );

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user details",
      error: error.message,
    });
  }
});

// Update Account Status Route
app.put("/update-account-status", async (req, res) => {
  try {
    const { userId, accountStatus } = req.body;

    // Find and update the user, and get the updated document
    const updatedUser = await mongoose.model("User").findOneAndUpdate(
      { userId: userId },
      { accountStatus },
      { new: true } // This option returns the modified document rather than the original
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Account status updated successfully",
      user: {
        userId: updatedUser.userId,
        accountStatus: updatedUser.accountStatus,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating account status",
      error: error.message,
    });
  }
});
