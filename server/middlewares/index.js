import expressjwt from "express-jwt";

export const requireSignin = expressjwt(
  { secret: process.env.JWT_SECRET, algorithms: ["HS256"] },
  function (req, res) {
    if (!req.user.admin) return res.sendStatus(401);
    res.sendStatus(200);
  }
);
