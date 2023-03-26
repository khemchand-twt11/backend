const express = require("express");
const { todoModel } = require("../models/todo.model");
const todoRoute = express.Router();
const bcrypt = require("bcrypt");
todoRoute.get("/home", async (req, res) => {
  try {
    res.send({ msg: "HOME PAGE" });
  } catch (error) {
    res.send({ error: error.message });
  }
});

todoRoute.post("/add", async (req, res) => {
  try {
    const newTodo = new todoModel(req.body);
    await newTodo.save();
    console.log(req.body);
    res.send({ msg: "todo is added" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

todoRoute.get("/", async (req, res) => {
  try {
    const userTodo = await todoModel.find(req.body);
    if (userTodo) {
      res.send({ status: "success", data: userTodo });
    } else {
      res.status(400).send({ msg: "no data found" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

todoRoute.patch("/:todoID", async (req, res) => {
  try {
    const userTodo = await todoModel.findOne({ _id: req.params.todoID });
    console.log(userTodo.userID);
    console.log(req.body.userID);
    req_id = req.body.userID; // user id generated from token
    if (req_id === userTodo.userID) {
      const updatedTodo = await todoModel.findOneAndUpdate(
        { _id: userTodo._id },
        { $set: req.body },
        { new: true }
      );
      console.log(updatedTodo);
      res.send({ status: "updated successfully", data: updatedTodo });
    } else {
      res.status(400).send({ msg: "Not authorized to change" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

todoRoute.delete("/:todoID", async (req, res) => {
  console.log(req.body.userID);
  try {
    const userTodo = await todoModel.findOne({ _id: req.params.todoID });
    if (userTodo) {
      req_id = req.body.userID; // user id generated from token
      if (req_id === userTodo.userID) {
        const deletedTodo = await todoModel.findOneAndDelete(
          {
            _id: userTodo._id,
          },
          { new: true }
        );
        res.send({ status: "delted successfully", data: deletedTodo });
      } else {
        res.status.send({ msg: "wrong credentials" });
      }
    } else {
      res.status(400).send({ msg: "Todo doesn't exits" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { todoRoute };
