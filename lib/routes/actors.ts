import {Router} from 'express';
import {Actor} from '../models/Actor';
import {MovieActor} from '../models/MovieActor';

export const actors = Router();

actors.post('/', (req, res, next) => {
  Actor
    .create(req.body)
    .then(() => res.sendStatus(201))
    .catch(next);
});

actors.post('/:id/movies/:movieId', (req, res, next) => {
  MovieActor
    .create({
      actorId: req.params['id'], movieId: req.params['movieId']
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});

actors.get('', (req, res, next) => {
  Actor
    .scope(req.query['scope'])
    .findAll()
    .then(_actors => res.json(_actors))
    .catch(next);
});

actors.get('/:id', (req, res, next) => {
  Actor
    .scope(req.query['scope'])
    .findById(req.params['id'])
    .then(actor => res.json(actor))
    .catch(next);
});

actors.put('/:id', (req, res, next) => {
  Actor
    .update(req.body, {where: {id: req.params['id']}})
    .then(() => res.sendStatus(200))
    .catch(next);
});
