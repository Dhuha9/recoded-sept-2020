var express = require("express");
var router = express.Router();

var datasource = require("../data/users.js");

/**
 * The "Login" endpoint.
 *
 * {
 *   username: string,
 *   password: string
 * }
 *
 * {
 *   success: boolean,
 *   redirect_uri: string,
 *   error_message: string
 * }
 */
router.post("/login", function (req, res, next) {
  var credentials = req.body;

  datasource.login(credentials, function (result) {
    if (!result || !result.success) {
      result = {
        success: false,
        error_message: result ? result.error_message : "Database error",
      };
      return res.status(403).send(result);
    }

    req.login({ id: result.user.id, username: result.user.username }, function (
      err
    ) {
      if (err) {
        result = {
          success: false,
          error_message: err,
        };
        return res.status(403).send(result);
      }

      result = {
        success: true,
        redirect_uri: "/posts/recent",
      };
      return res.send(result);
    });
  });
});

/**
 * The "Sign Up" endpoint.
 *
 * {
 *   username: string,
 *   password: string
 * }
 *
 * {
 *   success: boolean,
 *   redirect_uri: string,
 *   error_message: string
 * }
 */
router.post("/", (req, res, next) => {
  var credentials = req.body;

  datasource.signup(credentials, (result) => {
    if (!result.success) {
      result = {
        success: false,
        error_message: result.error_message,
      };
      return res.status(400).send(result);
    }

    req.login(result.user, function (err) {
      if (err) {
        return next(err);
      }
      result = {
        success: true,
        redirect_uri: "/posts/recent",
      };
      res.send(result);
    });
  });
});

router.get("/profile", (req, res, next) => {
  res.render("profile", {
    id: "profile",
    title: "profile",
    edite: true,
    user: req.user,
  });
});

router.get("/profile/:id", (req, res, next) => {
  datasource.get(req.params["id"], (user) => {
    res.render("profile", {
      id: "profile",
      title: "profile",
      edite: true,
      user: req.user,
    });
  })

});

router.get("/profile/edite", (req, res, next) => {
  res.render("profile", {
    id: "profileEdite",
    title: "edite profile",
    edite: false,
    user: req.user,
  });
});
/////////////////////////

router.post("/profile/save", function (req, res, next) {
  var profile = req.body;
  datasource.edite(profile, req.user, (result) => {
    if (!result.success) {
      res.status(400);
    }
    var result = {
      success: result.success,
      redirect_uri: "/users/profile",
      error_message: result.error_message,
    };
    res.send(result);
  });
});

router.get("/change", (req, res, next) => {
  res.render("change_password", {
    id: "changePassword",
    user: req.user,
  });
});

router.post("/change", function (req, res, next) {
  var passwordInfo = req.body;
  datasource.changePassword(passwordInfo, req.user, (result) => {
    if (!result.success) {
      res.status(400);
    }
    var result = {
      success: result.success,
      redirect_uri: "/",
      error_message: result.error_message,
    };
    res.send(result);
  });
});

module.exports = router;
