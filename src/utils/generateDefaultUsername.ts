function generateDefaultUsername(): string {
  // Daftar nama atau kata yang terdengar asing atau internasional
  const names: string[] = [
    'Aurelius',
    'Celestia',
    'Zephyr',
    'Elara',
    'Valerian',
    'Orion',
    'Seraphina',
    'Calix',
    'Isolde',
    'Thalassa',
    'Elysian',
    'Caius',
    'Nyx',
    'Zarael',
    'Amara',
    'Solara',
    'Corvus',
    'Lyra',
    'Galad',
    'Kael',
    'Vesper',
    'Daelis',
    'Mithras',
    'Liora',
    'Kainoa',
    'Maeve',
    'Riven',
    'Nero',
    'Selene',
    'Theron',
  ];

  // Pilih nama secara acak dari daftar
  const chosenName: string = names[Math.floor(Math.random() * names.length)];

  // Tambahkan angka acak (misalnya, 2 atau 3 digit) untuk membuatnya unik
  const numberSuffix: number = Math.floor(Math.random() * 990) + 10; // Angka dari 10 hingga 999

  // Gabungkan nama dengan angka untuk menghasilkan username
  const uniqueUsername: string = `${chosenName}${numberSuffix}`;

  return uniqueUsername;
}

export default generateDefaultUsername;
