import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    name: String,
    path_name: String,
    description: String,
    image: String,
    website: String,
    category: String,
    data: Date,
    voteCount: Number,
});

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Game;
