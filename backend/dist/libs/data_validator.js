import { validationResult, body } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (const validation of validations) {
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
    body("email").notEmpty().isEmail().withMessage("Invalid email"),
    body("password")
        .isLength({ min: 6, max: 25 })
        .withMessage("Password must be at least 6 characters long"),
];
export const userSignupValidator = [
    ...userLoginValidator,
    body("name").notEmpty().withMessage("Enter required value"),
];
//# sourceMappingURL=data_validator.js.map