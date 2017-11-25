import {Router} from 'express';
import {Movie} from '../models/Movie';

export const movies = Router();

movies.post('/', (req, res, next) => {
  Movie
    .create(req.body)
    .then(() => res.sendStatus(201))
    .catch(next);
});

movies.get('', (req, res, next) => {
  Movie
    .scope(req.query['scope'])
    .findAll()
    .then(_movies => res.json(_movies))
    .catch(next);
});

movies.get('/:id', (req, res, next) => {
  Movie
    .scope(req.query['scope'])
    .findById(req.params['id'])
    .then(movie => res.json(movie))
    .catch(next);
});

movies.put('/:id', (req, res, next) => {
  Movie
    .update<Movie>(req.body, {where: {id: req.params['id']}})
    .then(() => res.sendStatus(200))
    .catch(next);
});
