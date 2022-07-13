const Likes = require("../models/Likes");

async function getLikes(req, res) {
  const { idUser, idEvent } = req.query;
  try {
    if (idUser) {
      const allLikes = await Likes.findAll({
        where: {
          idUser: idUser,
        },
      });
      res.json(allLikes);
    } else if (idEvent) {
      const allLikes = await Likes.findAll({
        where: {
          idEvent: idEvent,
        },
      });
      res.json(allLikes);
    } else {
      res
        .status(404)
        .json({ message: "El id no pertece a un Usuario ni a un Evento" });
    }
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
    res.status(400).json({ error: error.message });
  }
}
async function deleteLikes(req, res) {
  const { id } = req.query;
  try {
    const userSaved = await Likes.findByPk(id);
    const createLike = await userSaved.destroy();
    res.json(createLike);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getLikes,
  postLikes,
  deleteLikes,
};
