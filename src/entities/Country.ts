import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field } from "type-graphql";


@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  code!: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  emoji!: string;
}
