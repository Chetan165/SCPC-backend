const validator = (req, res, next) => {
  const errors = [];
  const { Name, Email, Subject, Message } = req.body;
  if (!Name || typeof Name !== "string" || Name.trim().length === 0) {
    errors.push("Invalid Name");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!Email || !emailRegex.test(Email)) {
    errors.push("Invalid Email");
  }
  if (!Subject || typeof Subject !== "string" || Subject.trim().length === 0) {
    errors.push("Invalid Subject");
  }
  if (!Message || typeof Message !== "string" || Message.trim().length === 0) {
    errors.push("Invalid Message");
  }
  if (errors.length) {
    res.json({
      success: false,
      errors: errors,
    });
  } else {
    next();
  }
};
module.exports = validator;
