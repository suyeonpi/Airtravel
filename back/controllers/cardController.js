import * as cardRepository from '../models/cardModel.js';

export const getCards = async (req, res) => {
  const usernick = req.query.usernick;
  const cards = await (usernick
    ? cardRepository.getAllByUser(usernick)
    : cardRepository.getAll());
  res.status(200).json(cards);
};

export const getCard = async (req, res) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (card) {
    res.status(200).json(card);
  } else {
    res.status(404).json({ message: `Card id(${id}) not found` });
  }
};

export const createCard = async (req, res) => {
  const {
    title,
    location,
    continent,
    date,
    content,
    picture_url,
    usernick,
    user_url,
  } = req.body;

  const card = {
    title,
    location,
    continent,
    date,
    content,
    picture_url,
    usernick,
    user_url,
  };
  const newCard = await cardRepository.create(card);
  res.status(201).json(newCard);
};

export const updateCard = async (req, res) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return res.status(404).json({ message: `Card id(${id}) not found` });
  }
  const {
    title,
    location,
    continent,
    date,
    content,
    picture_url,
    usernick,
    user_url,
  } = req.body;

  const mewCard = {
    title,
    location,
    continent,
    date,
    content,
    picture_url,
    usernick,
    user_url,
  };
  const newCard = await cardRepository.update(id, newCard);
  res.status(201).json(newCard);
};

export const deleteCard = async (req, res) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return res.status(404).json({ message: `Card id(${id}) not found` });
  }
  await cardRepository.remove(id);
  res.sendStatus(204);
};
