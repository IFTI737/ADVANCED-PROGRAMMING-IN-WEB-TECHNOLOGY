import {
  DefaultNamingStrategy,
  NamingStrategyInterface,
  DataSourceOptions,
} from "typeorm";
import { camelCase, snakeCase } from "typeorm/util/StringUtils";
import { Product } from "@/modules/product/entities/product.entity";
import { CreateProductTable1793000000000 } from "@/database/migrations/1793000000000-create-product-table";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * Snake naming will be used in database operations
 */
export class SnakeNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(className: string, customName: string): string {
    if (customName) return customName;
    const snakeCasedClassName = snakeCase(className);
    const splittedClassName = snakeCasedClassName.split("_");
    const lastWord = splittedClassName[splittedClassName.length];
    switch (lastWord) {
      case "status":
        return `${snakeCasedClassName}es`;
      default:
        return `${snakeCasedClassName}s`;
    }
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return (
      snakeCase(embeddedPrefixes.join("_")) +
      (customName || snakeCase(propertyName))
    );
  }

  relationName(propertyName: string): string {
    return camelCase(propertyName, true);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(`${relationName}_${referencedColumnName}`);
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
  ): string {
    return snakeCase(
      `${firstTableName}_${firstPropertyName.replace(
        /\./gi,
        "_",
      )}_${secondTableName}`,
    );
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return snakeCase(`${tableName}_${columnName || propertyName}`);
  }

  classTableInheritanceParentColumnName(
    parentTableName: string,
    parentTableIdPropertyName: string,
  ): string {
    return snakeCase(`${parentTableName}_${parentTableIdPropertyName}`);
  }
}

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: "public",
  // Listed explicitly (instead of a file-search pattern) so it works on every
  // computer, even when the folder path has characters like [ ] or backslashes.
  // When you add a new module, add its entity and migration here too.
  entities: [Product],
  namingStrategy: new SnakeNamingStrategy(),
  migrations: [CreateProductTable1793000000000],
  logging: process.env.NODE_DB_ENV
    ? process.env.NODE_DB_ENV == "development"
      ? false
      : false
    : false,
  synchronize: false,
};

export default dataSourceOptions;
