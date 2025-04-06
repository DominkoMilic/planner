const plannerUser = require("../models/user");

const editPlan = async (req, res) => {
  const { email, planText, planId } = req.body;

  if (!email || !planId || !planText) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const user = await plannerUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const plan = user.plans.id(planId);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found." });
    }

    plan.text = planText;

    await user.save();

    res.status(201).json({ message: "Plan edited successfully.", user });
  } catch (error) {
    console.error("Error when editing plan: ", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { editPlan };
