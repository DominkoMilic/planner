const User = require("../models/user");

const fetchAuthenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { fetchAuthenticatedUser };
