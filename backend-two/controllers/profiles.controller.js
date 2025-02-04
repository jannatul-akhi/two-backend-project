import Profile from "../models/profile.model.js";

export const createProfile = async (req, res) => {
  const { userId, bio, interests } = req.body;

  // Save or update profile data in the database
  const profile = new Profile({ userId, bio, interests });
  await profile.save();

  res.status(201).json({ message: "Profile created successfully" });
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const { bio, interests } = req.body;

    try {
      const updatedProfile = await Profile.findOneAndUpdate(
        { userId: req.params.userId },
        {
          $set: {
            bio: bio,
            interests: Array.isArray(interests) ? interests : [],
          },
        },
        { new: true, runValidators: true } // ✅ Returns updated document
      );

      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.status(200).json({
        message: "Profile updated successfully",
        profile: updatedProfile,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile", error });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve profile data", error });
  }
};
