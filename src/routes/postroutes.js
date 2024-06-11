const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

//CREATE POST
router.post("/create", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    return res
      .status(201)
      .json({ message: "Post created successfully", newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});


//GET //READ
router.get("/all", async (req, res) => {
  try {
    const post = await prisma.post.findMany();
    return res.status(200).json({ message: "post found", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
});


//READ GET
router.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: +id,
      },
    });
    if (!post) return res.status(404).json({ message: "post not found", post });

    return res.status(200).json({ message: "post found", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
});


//UPDATE
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    // Check if the user exists
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
      },
    });

    return res.status(200).json({ message: "post updated successfully", post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
});


//DELETE
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.delete({
      where: {
        id: +id,
      },
    });
    return res.status(200).json({ message: "post deleted successfully", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = router;
