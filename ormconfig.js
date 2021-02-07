module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [process.env.TYPEORM_CONFIG_ENTITIES],
  synchronize: true,
  migrationsTableName: 'migration_table',
  migrations: ['migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migration',
  },
};
