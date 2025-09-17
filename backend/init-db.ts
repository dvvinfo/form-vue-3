import { DataSource } from 'typeorm';
import ormconfig from './ormconfig';

async function runMigrations() {
  const dataSource = new DataSource(ormconfig.options);
  
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');
    
    // Run all pending migrations
    await dataSource.runMigrations();
    console.log('Migrations have been executed successfully!');
    
    await dataSource.destroy();
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

runMigrations();