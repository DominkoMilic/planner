const plannerUser = require("../models/user");

const addPlan = async (req, res) => {
  const { email, color, planText, date } = req.body;

  if (!email || !date || !planText) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const user = await plannerUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.plans.push({ date, color, text: planText });

    await user.save();

    res.status(201).json({ message: "Plan added successfully.", user });
  } catch (error) {
    console.error("Error when adding plan: ", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { addPlan };
