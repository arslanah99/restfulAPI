var express = require("express");
var router = express.Router();

const toDoList = {
  "1": "Buy grocery"
};

/* Read to do list */
router.get("/", function(req, res, next) {
  res.send(toDoList);
});

/* Add task on to do list using 'number'*/
router.put("/list/:number", function(req, res, next) {
  // write code here to add to to do list
  const number = req.params.number;
  const newItem = req.body.newItem;
  toDoList[number] = newItem;
  res.send({ added: true });
});

/* Update task on to do list using 'number'*/
router.post("/list/:number", function(req, res, next) {
  // write code here to update to do list
  res.send({ updated: true });
});

/* Delete task from to do list using 'number' */
router.delete("/list/:number", function(req, res, next) {
  const deleteItem = req.params.number;
  delete toDoList[deleteItem];
  res.send({ deleted: true });
});

module.exports = router;
