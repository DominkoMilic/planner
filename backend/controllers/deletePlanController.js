const plannerUser = require("../models/user");

const deletePlan = async (req, res) => {
  const { email, planId } = req.query;

  if (!planId) {
    console.error("Missing plan ID");
  }

  try {
    const user = await plannerUser.findOne({ email });

    if (!user) {
      console.log(`User not found`);
      return res.status(404).json({ message: "User not found" });
    }

    const planIndex = user.plans.findIndex((plan) => plan.id === planId);

    if (planIndex === -1) {
      console.log(`Plan with ID ${planId} not found`);
      return res.status(404).json({ message: "Plan not found" });
    }

    user.plans.splice(planIndex, 1);

    await user.save();

    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error("Error when deleting plan: ", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { deletePlan };
