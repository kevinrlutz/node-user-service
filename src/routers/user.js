const express = require("express");
const User = require("../models/user");
const Appointment = require("../models/appointment");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
    console.log("User saved");
  } catch (error) {
    res.status(400).send(error);
    console.log("User not saved:");
    console.log(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/searchByLastName/:lastName", async (req, res) => {
  const lastName = req.params.lastName;

  try {
    const users = await User.find({ lastName });

    if (users.length === 0) {
      return res.status(404).send();
    }

    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/searchByEmail/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const users = await User.find({ email });

    if (users.length === 0) {
      return res.status(404).send();
    }

    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstName",
    "lastName",
    "gender",
    "age",
    "email",
    "phoneNumber",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    await Appointment.deleteMany({ userId: req.params.id });
    console.log("Appointments deleted");

    const user = await User.findByIdAndDelete(req.params.id);
    console.log("User deleted");

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
    console.log("User not deleted", error);
  }
});

module.exports = router;
