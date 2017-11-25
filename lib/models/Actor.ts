import {Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt} from "sequelize-typescript";
import {Movie} from "./Movie";
import {MovieActor} from "./MovieActor";

@Scopes({
  movies: {
    include: [
      {
        model: () => Movie,
        through: {attributes: []},
      },
    ],
  },
})
@Table
export class Actor extends Model<Actor> {

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  birthday: Date;

  @BelongsToMany(() => Movie, () => MovieActor)
  movies?: Movie[];

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  static scope(name: string = 'defaultScope'): typeof Actor {
    return super.scope.call(this, name);
  }
}
