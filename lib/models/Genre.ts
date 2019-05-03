import {Model, Column, Table, BelongsToMany, Scopes, PrimaryKey, CreatedAt, UpdatedAt} from "sequelize-typescript";
import {Movie} from "./Movie";
import {MovieGenre} from "./MovieGenre";

@Scopes(() => ({
  movies: {
    include: [
      {
        model: Movie,
        through: {attributes: []},
      },
    ],
  },
}))
@Table
export class Genre extends Model<Genre> {

  @PrimaryKey
  @Column
  name!: string;

  @BelongsToMany(() => Movie, () => MovieGenre)
  movies?: Movie[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
