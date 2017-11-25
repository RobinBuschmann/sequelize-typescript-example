import {Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt} from "sequelize-typescript";
import * as Promise from "bluebird";
import {MovieActor} from "./MovieActor";
import {Actor} from "./Actor";
import {ICreateOptions} from "sequelize-typescript/lib/interfaces/ICreateOptions";
import {Genre} from "./Genre";
import {MovieGenre} from "./MovieGenre";

@Scopes({
  cast: {
    include: [{
      model: () => Actor,
      through: {attributes: []},
    }],
  },
  genre: {
    include: [{
      model: () => Genre,
      through: {attributes: []},
    }]
  },
  full: {
    include: [{
      model: () => Actor,
      through: {attributes: []},
    }, {
      model: () => Genre,
      through: {attributes: []},
    }]
  }
})
@Table
export class Movie extends Model<Movie> {

  @Column
  title: string;

  @Column
  year: number;

  @BelongsToMany(() => Actor, () => MovieActor)
  cast?: Actor[];

  @BelongsToMany(() => Genre, () => MovieGenre)
  genres?: Genre[];

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  static create(values?: any, options?: ICreateOptions): Promise<Movie> {
    const include: any = [];
    if (values) {
      if (values.cast) include.push(Actor);
      if (values.genres) include.push(Genre);
    }
    if (!options) options = {};
    options.include = options.include ? options.include.concat(include) : include;

    return super.create.call(this, values, options);
  }

  static scope(name: string = 'defaultScope'): typeof Movie {
    return super.scope.call(this, name);
  }
}
