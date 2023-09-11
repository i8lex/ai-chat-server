module.exports = {
  type: 'sqlite',
  database: 'db.sqlite', // Имя файла SQLite базы данных
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // Включите это только для разработки, лучше выключить в продакшене
};
