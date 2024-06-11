const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

// CREATE USER
router.post("/create", async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

//GET //READ
router.get("/all", async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    return res.status(200).json({ message: "user found", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
});

//READ GET
router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
    if (!user) return res.status(404).json({ message: "user not found", user });

    return res.status(200).json({ message: "user found", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
});

//UPDATE
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
      },
    });

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.delete({
      where: {
        id: +id,
      },
    });
    return res
      .status(200)
      .json({ message: " user deleted successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = router;
