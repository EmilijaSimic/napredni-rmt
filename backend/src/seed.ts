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

  // 1. Find or create a Kompanija to link the company user to
  const kompanijaResult = await AppDataSource.query<{ id: number }[]>(
    `SELECT id FROM kompanija LIMIT 1`,
  );

  let kompanijaId: number;
  if (kompanijaResult.length > 0) {
    kompanijaId = kompanijaResult[0].id;
    console.log(`Koristimo postojeću kompaniju ID=${kompanijaId}`);
  } else {
    const inserted = await AppDataSource.query<{ id: number }[]>(
      `INSERT INTO kompanija (naziv, websajt, kontakt) VALUES ($1, $2, $3) RETURNING id`,
      ['Test Kompanija', 'https://testkompanija.rs', 'kontakt@testkompanija.rs'],
    );
    kompanijaId = inserted[0].id;
    console.log(`Kreirana nova kompanija ID=${kompanijaId}`);
  }

  // 2. Seed users
  const users = [
    {
      username: 'admin',
      lozinka: await bcrypt.hash('admin123', 10),
      ime: 'Admin',
      prezime: 'Korisnik',
      tip: 'admin',
      kompanija_id: null,
    },
    {
      username: 'kompanija',
      lozinka: await bcrypt.hash('kompanija123', 10),
      ime: 'Test',
      prezime: 'Kompanija',
      tip: 'kompanija',
      kompanija_id: kompanijaId,
    },
  ];

  for (const u of users) {
    const exists = await AppDataSource.query<{ id: number }[]>(
      `SELECT id FROM korisnik WHERE username = $1`,
      [u.username],
    );
    if (exists.length > 0) {
      await AppDataSource.query(
        `UPDATE korisnik SET lozinka=$1, ime=$2, prezime=$3, tip=$4, kompanija_id=$5 WHERE username=$6`,
        [u.lozinka, u.ime, u.prezime, u.tip, u.kompanija_id, u.username],
      );
      console.log(`Ažuriran korisnik: ${u.username}`);
    } else {
      await AppDataSource.query(
        `INSERT INTO korisnik (username, lozinka, ime, prezime, tip, kompanija_id) VALUES ($1,$2,$3,$4,$5,$6)`,
        [u.username, u.lozinka, u.ime, u.prezime, u.tip, u.kompanija_id],
      );
      console.log(`Kreiran korisnik: ${u.username}`);
    }
  }

  await AppDataSource.destroy();
  console.log('\nSeed završen!');
  console.log('  admin     / admin123');
  console.log(`  kompanija / kompanija123  (kompanija_id=${kompanijaId})`);
}

seed().catch((err) => {
  console.error('Seed greška:', err);
  process.exit(1);
});
