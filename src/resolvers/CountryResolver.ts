import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";


@Resolver()
export class CountryResolver {
  @Mutation(() => Country)
  async createCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string
  ): Promise<Country> {
    const country = Country.create({ code, name, emoji });
    await country.save();
    return country;
  }

  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return await Country.find();
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string): Promise<Country | null> {
    return await Country.findOne({ where: { code } });
  }
}
