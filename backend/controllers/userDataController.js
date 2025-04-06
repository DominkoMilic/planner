const fetchAuthenticatedUser = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ email: req.user.email });
  }
  res.status(401).json({ message: "Not authenticated" });
};

module.exports = { fetchAuthenticatedUser };
