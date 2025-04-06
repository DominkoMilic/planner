const plannerUser = require("../models/user");

const findAllPlans = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const user = await plannerUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user.plans);
  } catch (error) {
    console.error("Error while finding plans: ", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { findAllPlans };
