const genreFiles = require("../db_event_genre/db_genre.json");
const Genre = require("../models/Genre");
const Events = require("../models/Events");

async function chargeGenres() {
  try{
    genreFiles.genres.map(async (e) => {
      return await Genre.findOrCreate({
        where: {
          name: e.name.toLowerCase(),
        },
      });
    });
  }catch(error){
    console.log(error.message)
  }
}

async function getAllGenres(req, res) {
  try {
    chargeGenres();
    const allGenre = await Genre.findAll({
      include: {
        model: Events,
        attributes: ["id", "name"],
      },
    });
    res.send(allGenre);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}

async function postOneGenre(req, res) {
  const { name } = req.body;
  try {
    chargeGenres();
    Genre.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
    })
      .then((genreCreated) => {
        res.json(genreCreated);
      })
      .catch((e) => res.status(400).send({ error: "Género no se pudo crear" }));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

module.exports = { getAllGenres, postOneGenre, chargeGenres };
