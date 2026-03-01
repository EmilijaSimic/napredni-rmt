import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5431,
  username: 'postgres',
  password: 'lozinka',
  database: 'napredni_rmt_baza',
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();

  // Seed users
  const users = [
    {
      username: 'admin',
      lozinka: await bcrypt.hash('admin123', 10),
      ime: 'Admin',
      prezime: 'Korisnik',
      tip: 'admin',
    },
    {
      username: 'kompanija',
      lozinka: await bcrypt.hash('kompanija123', 10),
      ime: 'Test',
      prezime: 'Kompanija',
      tip: 'kompanija',
    },
  ];

  for (const u of users) {
    const exists = await AppDataSource.query<{ id: number }[]>(
      `SELECT id FROM korisnik WHERE username = $1`,
      [u.username],
    );
    if (exists.length > 0) {
      await AppDataSource.query(
        `UPDATE korisnik SET lozinka=$1, ime=$2, prezime=$3, tip=$4 WHERE username=$5`,
        [u.lozinka, u.ime, u.prezime, u.tip, u.username],
      );
      console.log(`Ažuriran korisnik: ${u.username}`);
    } else {
      await AppDataSource.query(
        `INSERT INTO korisnik (username, lozinka, ime, prezime, tip) VALUES ($1,$2,$3,$4,$5)`,
        [u.username, u.lozinka, u.ime, u.prezime, u.tip],
      );
      console.log(`Kreiran korisnik: ${u.username}`);
    }
  }

  await AppDataSource.destroy();
  console.log('\nSeed završen!');
  console.log('  admin     / admin123');
  console.log('  kompanija / kompanija123');
}

seed().catch((err) => {
  console.error('Seed greška:', err);
  process.exit(1);
});
