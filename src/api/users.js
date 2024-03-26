const express = require("express");
const router = express.Router();
const {getUsers,getUserById, deleteUserById, createUserByName, updateUserById} = require("../model/users.prisma");

router.get("/", async (req, res) => {
    try {
        const users = await getUsers();

        if(!users){
            return res.status(404).json({ error: "User not found", status : false });
        }

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", status : false });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found", status : false });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", status : false });
    }

});


router.post("/", async (req, res) => {
    const { name, email } = req.body;

    try {
        const newUser = await createUserByName({ name, email });
        res.status(201).json(newUser);
        console.log(newUser)
    } catch (error) {
        res.status(500).json({ error: "Internal server error", status : false });
        console.log(error)
    }
});



router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const message = await deleteUserById(id);
        res.status(message.status).json({ message: message.detail });
    } catch (error) {
        if (error.statusCode === 404) {
            res.status(404).json({ error: error.message, status : error.status });
        } else {
            res.status(500).json({ error: "Internal server error", status : false });
        }
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;

    try {
        const updatedUser = await updateUserById(id, { name, email });
        res.status(200).json({updatedUser, message : "Success Updated Data"});
    } catch (error) {
        if (error.statusCode === 404) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error", status : false });
            //console.log(error)
        }
    }
});


module.exports = router; 
