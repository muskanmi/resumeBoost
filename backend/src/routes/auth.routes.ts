import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../validations/auth.validation";
import { refreshTokenHandler } from "../controllers/auth.controller";
import { authorize } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/refresh", refreshTokenHandler);
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

// Example protected route
router.get("/me", protect, (req, res) => {
  res.json({ message: "Protected route access granted" });
});

export default router;
