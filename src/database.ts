import * as fs from 'fs';
import { fatal, InterfaceDatabase } from './util';

let database: InterfaceDatabase;

function read() {
  try {
    if (fs.existsSync('./database.json')) {
      database = JSON.parse(fs.readFileSync('./database.json', 'utf-8'));
    }
  } catch (e) {
    fatal('Failed to read the database! Did you create the database file?');
  }
}

function write() {
  try {
    fs.writeFileSync('./database.json', JSON.stringify(database));
  } catch (e) {
    fatal('Failed to write to the database!');
  }
  read();
}

function getDatabase(): InterfaceDatabase {
  read();
  return database;
}

function increaseTicketCounter() {
  read();
  database.ticketCount += 1;
  write();
}

export {
  getDatabase,
  increaseTicketCounter,
};
