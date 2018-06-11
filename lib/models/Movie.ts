import {
  BelongsToMany,
  Column,
  CreatedAt,
  ICreateOptions,
  Model,
  Scopes,
  Table,
  UpdatedAt,
  FilteredModelAttributes
} from "sequelize-typescript";
import * as Promise from "bluebird";
import {MovieActor} from "./MovieActor";
import {Actor} from "./Actor";
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

  static create<T extends Model<T>>(this: (new () => T), values?: FilteredModelAttributes<T>, options: ICreateOptions = {}): Promise<T> {
    const include: any = [];
    if (values) {
      if (values.cast) include.push(Actor);
      if (values.genres) include.push(Genre);
    }
    options.include = options.include ? options.include.concat(include) : include;

    return super.create.call(this, values, options);
  }

  static scope(...args: any[]): typeof Movie {
    args[0] = args[0] || 'defaultScope';
    return super.scope.call(this, ...args);
  }
}
