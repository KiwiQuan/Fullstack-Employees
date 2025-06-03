import express from "express";
const router = express.Router();
import {
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  createEmployee,
} from "#db/queries/employees";
export default router;

// TODO: this file!

router
  .route("/")
  .get(async (req, res) => {
    const employees = await getEmployees();
    res.send(employees);
  })
  .post(async (req, res, next) => {
    try {
      if (!req.body) {
        res.status(400).send("Request must have a body!");
      } else if (!req.body.name) {
        res.status(400).send("New employee must have a name!");
      } else {
        const employee = await createEmployee(req.body);
        res.status(201).send(employee);
      }
    } catch (err) {
      next(err);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const id = Number(req.params.id);
    const employee = await getEmployee(id);
    if (id < 0) {
      res.status(400).send("Id must be a positive number");
    }
    if (!employee) {
      res.status(404).send("Employee not found");
    }

    res.send(employee);
  })
  .delete(async (req, res, next) => {
    const id = Number(req.params.id);
    const employee = await getEmployee(id);
    try {
      if (id < 0) {
        res.status(400).send("Id must be a positive number");
      } else if (!employee) {
        res.status(404).send("Employee not found");
      } else {
        const employee = await deleteEmployee(id);
        res.status(204).send(employee);
      }
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    const id = Number(req.params.id);
    const employee = await getEmployee(id);
    const name = req.body.name;
    const birthday = req.body.birthday;
    const salary = req.body.salary;
    try {
      if (id < 0) {
        res.status(400).send("Id must be a positive number");
      } else if (!req.body) {
        res.status(400).send("Request must have a body!");
      } else if (!req.body.name) {
        res.status(400).send("New employee must have a name!");
      } else if (!employee) {
        res.status(404).send("Employee not found");
      } else {
        const updatedEmployee = await updateEmployee({
          id,
          name,
          birthday,
          salary,
        });

        res.json(updatedEmployee);
      }
    } catch (err) {
      next(err);
    }
  });
