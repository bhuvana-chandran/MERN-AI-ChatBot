import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain, body } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

export const userLoginValidator = [
  body("email").trim().isEmail().withMessage("Your Email is Required"),
  body("password")
    .trim()
    .isLength({ min: 6, max: 25 })
    .withMessage("Password must be at least 6 characters"),
];

export const userSignupValidator = [
  ...userLoginValidator,
  body("name").notEmpty().withMessage("Your Name Is Required"),
];

export const chatCompletionvalidator = [
  body("message").notEmpty().withMessage("Message Is Required"),
];
