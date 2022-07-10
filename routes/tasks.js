const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Profile = require("../models/Profile");
const { check, validationResult } = require("express-validator");

//  get tasks

router.get("/", ensureAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "No Tasks" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// get task
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    const found = await Profile.tasks.findOne({ id: req.params.id });
    if (found) {
      let { text, day, reminder } = found;
      reminder = !reminder;
      Profile.tasks.findOneAndUpdate(
        { id: req.params.id },
        { $set: { text, day, reminder } },
        { new: true }
      );
      const profile = await Profile.findOne({ user: req.user.id });
      res.json(profile);
    }
    res.status(400).json({ msg: "No record" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// update task

router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      const found = profile.tasks.find((task) => task.id === req.params.id);
      if (found) {
        const { reminder } = found;

        await Profile.updateOne(
          { "tasks._id": req.params.id },
          { $set: { "tasks.$.reminder": !reminder } }
        );
        profile = await Profile.findOne({ user: req.user.id });
        return res.json(profile);
      }
    }
    res.status(400).json({ msg: "No record" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//  put tasks

router.put(
  "/",
  [
    ensureAuth,
    [
      check("text", "text is requires").not().isEmpty(),
      check("day", "day is requierd").not().isEmpty(),
      check("reminder", "reminder is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { text, day, reminder } = req.body;
    const newTask = {
      text,
      day,
      reminder,
    };
    const newProfile = {
      user: req.user.id,
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile.tasks.unshift(newTask);
        await profile.save();
        return res.json(profile);
      }
      profile = new Profile(newProfile);
      profile.tasks.unshift(newTask);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// delete tasks
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.tasks
      .map((item) => item.id)
      .indexOf(req.params.id);

    //console.log(`${removeIndex } and ${profile.experience.length}`);
    if (removeIndex < 0) {
      //console.log("deos not exist");
      return res.json({ msg: "task does not exist" });
    }
    profile.tasks.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(" server error");
  }
});

module.exports = router;
