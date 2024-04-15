import "dotenv/config";
import { DataSource } from "typeorm";
import { Country } from "./entities/Country";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from '@apollo/server/standalone';
import { CountryResolver } from "./resolvers/CountryResolver";
import { ApolloServer } from "@apollo/server";

async function main() {
  // Configuration de la connexion à la base de données SQLite
  const dataSourceOptions: SqliteConnectionOptions = {
    type: "sqlite",
    database: "database.sqlite",
    entities: [Country],
    synchronize: true,
    logging: true,
  };


  const dataSource = new DataSource(dataSourceOptions);


  const schema = await buildSchema({

 resolvers: [CountryResolver],
  });

  const server = new ApolloServer({ schema });

  await dataSource.initialize();

  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });


  console.log(`Serveur démarré à ${url}`);
}

main().catch((error) => {
  console.error(error);
});
