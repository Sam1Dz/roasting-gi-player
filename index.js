const express = require("express");
const { Wrapper } = require('enkanetwork.js');
const path = require("path");

const options = {};

const { genshin } = new Wrapper(options);
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/uid/:uid", async (req, res) => {
    const { uid } = req.params;

    if (!uid || isNaN(uid)) {
        return res.status(400).json({ error: "Invalid UID" });
    }

    try {
        const player = await genshin.getPlayer(uid);
        if (!player) {
            return res.status(404).json({ error: "Player not found" });
        }
        res.json(player);
    } catch (error) {
        console.error("Error fetching player data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;