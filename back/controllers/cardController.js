import * as cardRepository from '../models/cardModel.js';

export const getCards = async (req, res) => {
  const { continent } = req.query;
  const cards = await (continent
    ? cardRepository.getAllByContinent(continent)
    : cardRepository.getAll());
  res.status(200).json(cards);
};

export const getCardsByUser = async (req, res) => {
  const { usernick } = req.query;
  const cards = await cardRepository.getAllByUser(usernick);
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
  const newCard = await cardRepository.create(req.body, req.userId);
  res.status(201).json(newCard);
};

export const updateCard = async (req, res) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return res.status(404).json({ message: `Card id(${id}) not found` });
  }
  if (card.userId !== req.userId) {
    return res.sendStatus(403).json({ message: '권한이 없습니다' });
  }
  const newCard = await cardRepository.update(id, req.body);
  res.status(201).json(newCard);
};

export const deleteCard = async (req, res) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return res.status(404).json({ message: `Card id(${id}) not found` });
  }
  if (card.userId !== req.userId) {
    return res.sendStatus(403).json({ message: '권한이 없습니다' });
  }
  await cardRepository.remove(id);
  res.sendStatus(204);
};
