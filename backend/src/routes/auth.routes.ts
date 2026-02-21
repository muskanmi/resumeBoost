import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../validations/auth.validation";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

// Example protected route
router.get("/me", protect, (req, res) => {
  res.json({ message: "Protected route access granted" });
});

export default router;
