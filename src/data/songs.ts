export interface SongIntro {
  id: string;
  title: string;
  type: 'Single' | 'Album Track' | 'EP Track';
  releaseYear: string;
  coverImage: string;
  discImage: string;
  duration: string;
  description: string;
  story: string;
  spotifyUrl: string;
  audioSample?: string;
  bpm?: number;
  key?: string;
}

export const SONGS_CATALOG: SongIntro[] = [
  {
    id: 'song-make-a-wish',
    title: 'Make a Wish (interlude)',
    type: 'Album Track',
    releaseYear: '2024',
    coverImage: '/assets/products/cd_ether_case.jpg',
    discImage: '/assets/products/cd_ether_disc.jpg',
    duration: '2:14',
    description: 'The sonic cornerstone of Darany’s universe. Haunting layered harmonies floating above ocean synthesizers.',
    story: 'Recorded at 3:00 AM on a solitary night in Paris. The song represents a fragile prayer whispered into the surface of dark water before diving beneath. It serves as the official auditory soundtrack of this website.',
    spotifyUrl: 'https://open.spotify.com/artist/6WSMhnCFhu5pqknyWdb9IH',
    audioSample: '/assets/audio/make_a_wish_interlude.mp3',
    bpm: 72,
    key: 'D Minor',
  },
  {
    id: 'song-white-roses',
    title: 'White Roses',
    type: 'Single',
    releaseYear: '2024',
    coverImage: '/assets/products/cd_whiteroses_case.jpg',
    discImage: '/assets/products/cd_whiteroses_disc.jpg',
    duration: '3:32',
    description: 'A delicate yet crushing ballad of romantic devotion, vulnerability, and the ache of sudden silence.',
    story: 'Written after heartbreak that felt like an ocean undertow. White roses symbolize innocence surrendered. Darany layered six separate vocal tracks to create a choral effect mimicking echoes in empty rooms.',
    spotifyUrl: 'https://open.spotify.com/artist/6WSMhnCFhu5pqknyWdb9IH',
    bpm: 84,
    key: 'F# Minor',
  },
  {
    id: 'song-baby-boy',
    title: 'Baby Boy',
    type: 'EP Track',
    releaseYear: '2026',
    coverImage: '/assets/products/cd_babyboy_case.jpg',
    discImage: '/assets/products/cd_babyboy_disc.jpg',
    duration: '3:08',
    description: 'The titular anthem of the 2026 EP. Subterranean electronic soul anchored by deep wasian vocal timbre.',
    story: 'A confrontation with the ghosts of youth and unresolved longing. Merges Western bedroom pop intimacy with traditional Southeast Asian micro-tonal vocal slides that honor Darany’s Cambodian roots.',
    spotifyUrl: 'https://open.spotify.com/artist/6WSMhnCFhu5pqknyWdb9IH',
    bpm: 96,
    key: 'A Minor',
  },
  {
    id: 'song-living-for',
    title: 'Living for',
    type: 'Single',
    releaseYear: '2024',
    coverImage: '/assets/products/cd_livingfor_case.jpg',
    discImage: '/assets/products/cd_livingfor_disc.jpg',
    duration: '3:15',
    description: 'Sub-bass frequencies that vibrate the chest cavity. An existential meditation on purpose and emotional survival.',
    story: '“Why do we fight to stay afloat when the depths are so quiet?” This single was produced with analog synthesizers dialed into frequencies meant to mimic the sensation of water pressure on the body.',
    spotifyUrl: 'https://open.spotify.com/artist/6WSMhnCFhu5pqknyWdb9IH',
    bpm: 110,
    key: 'C Minor',
  },
  {
    id: 'song-spell',
    title: 'Spell',
    type: 'Single',
    releaseYear: '2024',
    coverImage: '/assets/products/cd_spell_case.jpg',
    discImage: '/assets/products/cd_spell_disc.jpg',
    duration: '2:56',
    description: 'An atmospheric siren incantation exploring love as an inescapable magnetic trance.',
    story: 'Inspired by Khmer oral folklore of river water sirens. The vocal melody is sung in a low, whisper-soft register that pulls the listener inward, stripping away all defensive walls.',
    spotifyUrl: 'https://open.spotify.com/artist/6WSMhnCFhu5pqknyWdb9IH',
    bpm: 68,
    key: 'E Minor',
  },
  {
    id: 'song-lifetime',
    title: 'Lifetime',
    type: 'Single',
    releaseYear: '2020',
    coverImage: '/assets/products/cd_lifetime_case.jpg',
    discImage: '/assets/products/cd_lifetime_disc.jpg',
    duration: '3:45',
    description: 'Darany’s 2020 origin single. The genesis of her sonic mythos and solitary piano compositions.',
    story: 'The very first song Darany uploaded to Spotify in 2020. Recorded in a tiny student room with an upright piano, it laid the foundation for everything that followed: the water, the nocturnal mist, the unshakeable honesty.',
    spotifyUrl: 'https://open.spotify.com/artist/6WSMhnCFhu5pqknyWdb9IH',
    bpm: 78,
    key: 'G Major',
  },
  {
    id: 'song-take-a-breath',
    title: 'Take a Breath',
    type: 'Single',
    releaseYear: '2023',
    coverImage: '/assets/products/cd_takeabreath_case.jpg',
    discImage: '/assets/products/cd_takeabreath_disc.jpg',
    duration: '3:20',
    description: 'A meditation on holding air before sinking beneath cold tides. Minimalist acoustic textures.',
    story: 'A guide to staying calm during panic attacks and existential dread. Sung almost entirely in head voice over sparse Rhode chords that shimmer like sunlight hitting the seabed.',
    spotifyUrl: 'https://open.spotify.com/artist/6WSMhnCFhu5pqknyWdb9IH',
    bpm: 80,
    key: 'Bb Major',
  },
  {
    id: 'song-downtown-bars',
    title: 'Downtown Bars',
    type: 'Album Track',
    releaseYear: '2024',
    coverImage: '/assets/products/cd_ether_case.jpg',
    discImage: '/assets/products/cd_ether_disc.jpg',
    duration: '3:40',
    description: 'The opening track of the “Ether” studio album. Wandering through nocturnal Paris streets feeling invisible.',
    story: 'Captures the strange isolation of walking past crowded Parisian terraces while carrying an ancient, faraway grief. A testament to Darany’s mixed French and Cambodian identity living between crowded rooms and solitary thoughts.',
    spotifyUrl: 'https://open.spotify.com/artist/6WSMhnCFhu5pqknyWdb9IH',
    bpm: 88,
    key: 'D Minor',
  },
];
