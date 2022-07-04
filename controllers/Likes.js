const Likes = require("../models/Likes");

async function getLikes(req, res) {
  try {
    const allLikes = await Likes.findAll();
    res.json(allLikes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
async function postLikes(req, res) {
  const { idEvent, idUser } = req.body;
  try {
    const createLike = await Likes.create({
      idEvent: idEvent,
      idUser: idUser,
    });
    res.json(createLike);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
async function deleteLikes(req, res) {
  const { id } = req.query;
  try {
    const userSaved = await Likes.findByPk(id);
    const createLike = await userSaved.destroy();
    res.json(createLike);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getLikes,
  postLikes,
  deleteLikes,
};
