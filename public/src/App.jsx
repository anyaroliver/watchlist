import { useState, useEffect } from "react";

const ANIME_DATA = [
  // ── S-TIER MASTERPIECES ──────────────────────────────────────────────
  { rank: 1,  title: "Fullmetal Alchemist: Brotherhood", type: "TV Series", genre: "Action, Fantasy, Drama",       length: "64 eps",       why: "The gold standard of anime storytelling — flawless pacing, unforgettable characters, a richly built world, and a thematically resonant conclusion.", tier: "S" },
  { rank: 2,  title: "Steins;Gate",                      type: "TV Series", genre: "Sci-Fi, Thriller, Romance",    length: "24 eps",       why: "A slow-burn time-travel masterpiece that pays off every single detail. Its emotional gut-punch is legendary.", tier: "S" },
  { rank: 3,  title: "Hunter x Hunter (2011)",           type: "TV Series", genre: "Action, Adventure, Fantasy",   length: "148 eps",      why: "Deconstructs shonen tropes at every turn. The Chimera Ant arc is one of anime's greatest narrative achievements.", tier: "S" },
  { rank: 4,  title: "Attack on Titan",                  type: "TV Series", genre: "Action, Drama, Mystery",       length: "94 eps",       why: "Audacious plot twists, breathtaking action, and a story that dares to challenge the viewer's moral compass.", tier: "S" },
  { rank: 5,  title: "Neon Genesis Evangelion",          type: "TV Series", genre: "Mecha, Psychological, Drama",  length: "26 eps + film",why: "The anime that redefined what the medium could say about trauma, identity, and loneliness. Endlessly debated for good reason.", tier: "S" },
  { rank: 6,  title: "Monster",                          type: "TV Series", genre: "Psychological, Thriller, Mystery","length": "74 eps", why: "A slow, cerebral thriller about a surgeon who saves a child who grows up to become a serial killer. Riveting and mature.", tier: "S" },
  { rank: 7,  title: "Berserk (1997)",                   type: "TV Series", genre: "Dark Fantasy, Action, Drama",  length: "25 eps",       why: "Raw, brutal, and emotionally devastating. The Golden Age arc remains one of the best character studies in anime.", tier: "S" },
  { rank: 8,  title: "Spirited Away",                    type: "Film",      genre: "Fantasy, Adventure",           length: "125 min",      why: "Miyazaki's Oscar-winning magnum opus. A surreal, visually astonishing coming-of-age journey through a spirit world.", tier: "S" },
  { rank: 9,  title: "Violet Evergarden",                type: "TV Series", genre: "Drama, Fantasy, Slice of Life","length": "13 eps + film",why:"Devastating emotional storytelling wrapped in some of the most beautiful animation ever produced.", tier: "S" },
  { rank: 10, title: "Cowboy Bebop",                     type: "TV Series", genre: "Sci-Fi, Action, Drama",        length: "26 eps",       why: "The blueprint for stylish anime. Jazz, existentialism, and a ragtag crew of bounty hunters in a perfectly constructed world.", tier: "S" },
  { rank: 11, title: "Vinland Saga",                     type: "TV Series", genre: "Historical, Action, Drama",    length: "48 eps",       why: "A Viking epic that evolves from revenge thriller to a profound meditation on pacifism, slavery, and true strength.", tier: "S" },
  { rank: 12, title: "Mob Psycho 100",                   type: "TV Series", genre: "Action, Comedy, Supernatural", length: "37 eps",       why: "Dazzling animation and a surprisingly deep story about self-worth, emotional growth, and choosing kindness.", tier: "S" },
  { rank: 13, title: "Clannad + After Story",            type: "TV Series", genre: "Drama, Romance, Slice of Life","length": "49 eps",     why: "After Story in particular delivers one of anime's most emotionally overwhelming narratives about family and loss.", tier: "S" },
  { rank: 14, title: "Legend of the Galactic Heroes",   type: "TV Series", genre: "Sci-Fi, Historical, Drama",    length: "110 eps",      why: "A political and military epic of unrivaled depth. Often called the War and Peace of anime.", tier: "S" },
  { rank: 15, title: "Princess Mononoke",                type: "Film",      genre: "Fantasy, Action, Historical",  length: "134 min",      why: "A morally complex war between humanity and nature with no easy villains. Miyazaki at his most ambitious.", tier: "S" },
  { rank: 16, title: "Your Name",                        type: "Film",      genre: "Romance, Fantasy, Drama",      length: "112 min",      why: "A body-swap romance that becomes something far more profound. Visually stunning and emotionally irresistible.", tier: "S" },
  { rank: 17, title: "Puella Magi Madoka Magica",        type: "TV Series", genre: "Psychological, Dark Fantasy",  length: "12 eps",       why: "A subversive deconstruction of the magical-girl genre that becomes a tragedy of cosmic scale.", tier: "S" },
  { rank: 18, title: "Code Geass",                       type: "TV Series", genre: "Mecha, Thriller, Political",   length: "50 eps",       why: "A chess match of a story with one of anime's most brilliant, morally complex protagonists and a legendary ending.", tier: "S" },
  { rank: 19, title: "Death Note",                       type: "TV Series", genre: "Psychological, Thriller, Mystery","length": "37 eps", why: "A cat-and-mouse thriller between two genius minds discussing justice and morality. Impossible to put down.", tier: "S" },
  { rank: 20, title: "Grave of the Fireflies",           type: "Film",      genre: "Drama, Historical, War",       length: "89 min",       why: "Perhaps the most emotionally devastating war film ever made — in any medium. A must-watch, but bring tissues.", tier: "S" },

  // ── A-TIER ESSENTIALS ─────────────────────────────────────────────────
  { rank: 21, title: "Hajime no Ippo",                   type: "TV Series", genre: "Sports, Action, Comedy",       length: "75 eps",       why: "The definitive boxing anime with incredible fight choreography and a hero whose determination is genuinely inspiring.", tier: "A" },
  { rank: 22, title: "One Piece",                        type: "TV Series", genre: "Action, Adventure, Fantasy",   length: "1100+ eps",    why: "The most epic adventure in anime. The world-building and emotional highs (Marineford, Enies Lobby) are unmatched.", tier: "A" },
  { rank: 23, title: "Gintama",                          type: "TV Series", genre: "Comedy, Action, Sci-Fi",       length: "367 eps",      why: "The funniest anime ever made that also delivers some of the most emotional and epic arcs when you least expect it.", tier: "A" },
  { rank: 24, title: "Demon Slayer",                     type: "TV Series", genre: "Action, Supernatural, Fantasy","length": "55+ eps",    why: "Breathtaking Ufotable animation with emotional storytelling. The Mugen Train film is a cultural phenomenon.", tier: "A" },
  { rank: 25, title: "Jujutsu Kaisen",                   type: "TV Series", genre: "Action, Supernatural, Dark Fantasy","length": "47+ eps",why: "A modern shonen powerhouse with exceptional fight animation, a likeable cast, and genuine stakes.", tier: "A" },
  { rank: 26, title: "My Hero Academia",                 type: "TV Series", genre: "Action, Superhero, Drama",     length: "130+ eps",     why: "The best modern superhero story in anime, with a heart-full protagonist and an imaginative power system.", tier: "A" },
  { rank: 27, title: "Naruto / Shippuden",               type: "TV Series", genre: "Action, Adventure, Fantasy",   length: "720 eps",      why: "Foundational shonen with iconic characters and arcs (Pain arc, Chunin Exams) that defined a generation.", tier: "A" },
  { rank: 28, title: "Dragon Ball Z",                    type: "TV Series", genre: "Action, Adventure, Fantasy",   length: "291 eps",      why: "The blueprint for power-scaling anime. The Frieza and Cell sagas remain iconic pieces of pop culture.", tier: "A" },
  { rank: 29, title: "Haikyuu!!",                        type: "TV Series", genre: "Sports, Drama, Comedy",        length: "85 eps",       why: "Makes volleyball feel like life or death. Masterfully written ensemble cast with no wasted characters.", tier: "A" },
  { rank: 30, title: "Nana",                             type: "TV Series", genre: "Drama, Romance, Slice of Life","length": "47 eps",     why: "One of anime's most honest portrayals of adult relationships, love, and the cost of ambition.", tier: "A" },
  { rank: 31, title: "Fruits Basket (2019)",             type: "TV Series", genre: "Drama, Romance, Supernatural", length: "63 eps",       why: "A complete, gorgeous adaptation with powerful themes of trauma, acceptance, and unconditional love.", tier: "A" },
  { rank: 32, title: "Howl's Moving Castle",             type: "Film",      genre: "Fantasy, Romance, Adventure",  length: "119 min",      why: "Lush Studio Ghibli craftsmanship with a distinctive heroine and a timeless anti-war romance at its core.", tier: "A" },
  { rank: 33, title: "Nausicaä of the Valley of the Wind",type:"Film",     genre: "Fantasy, Sci-Fi, Adventure",   length: "117 min",      why: "The proto-Ghibli film that established Miyazaki's visual language. Ecologically profound and visually striking.", tier: "A" },
  { rank: 34, title: "Ghost in the Shell (1995)",        type: "Film",      genre: "Sci-Fi, Cyberpunk, Philosophical","length": "83 min",  why: "Defined cyberpunk anime aesthetics and asked foundational questions about consciousness and identity.", tier: "A" },
  { rank: 35, title: "Akira",                            type: "Film",      genre: "Sci-Fi, Action, Psychological","length": "124 min",    why: "Groundbreaking in animation technique. A dystopian classic that changed what anime could look like.", tier: "A" },
  { rank: 36, title: "JoJo's Bizarre Adventure",         type: "TV Series", genre: "Action, Supernatural, Comedy", length: "190+ eps",     why: "Utterly unique in style and tone — each part reinvents itself. An absurdist masterpiece of character and hype.", tier: "A" },
  { rank: 37, title: "Parasyte: The Maxim",              type: "TV Series", genre: "Sci-Fi, Horror, Drama",        length: "24 eps",       why: "A tense body-horror series that gradually becomes a philosophical inquiry into what makes us human.", tier: "A" },
  { rank: 38, title: "Classroom of the Elite",           type: "TV Series", genre: "Psychological, Drama, Mystery","length": "37+ eps",    why: "A social experiment anime following a cold genius navigating a hyper-competitive school hierarchy.", tier: "A" },
  { rank: 39, title: "Erased",                           type: "TV Series", genre: "Mystery, Thriller, Drama",     length: "12 eps",       why: "A tight, emotional mystery about a man who travels back in time to prevent a childhood murder.", tier: "A" },
  { rank: 40, title: "Ping Pong the Animation",         type: "TV Series", genre: "Sports, Drama, Philosophical", length: "11 eps",       why: "An unconventional art style masks one of the deepest explorations of talent, ambition, and identity in sports anime.", tier: "A" },
  { rank: 41, title: "Banana Fish",                      type: "TV Series", genre: "Action, Drama, Thriller",      length: "24 eps",       why: "A gritty crime drama with incredible chemistry between its leads. Emotional, cinematic, and unflinching.", tier: "A" },
  { rank: 42, title: "Shouwa Genroku Rakugo Shinjuu",    type: "TV Series", genre: "Historical, Drama, Slice of Life","length": "25 eps", why: "An intimate portrait of a dying art form and the three people bound to it. Sophisticated and deeply human.", tier: "A" },
  { rank: 43, title: "Re:ZERO",                          type: "TV Series", genre: "Fantasy, Psychological, Drama","length": "50+ eps",    why: "A brutal subversion of isekai tropes that uses its time-loop mechanic to explore trauma, obsession, and growth.", tier: "A" },
  { rank: 44, title: "Trigun",                           type: "TV Series", genre: "Sci-Fi, Action, Western",      length: "26 eps",       why: "A pacifist gunslinger in a desert world. Tonally brilliant — effortlessly switches from comedy to tragedy.", tier: "A" },
  { rank: 45, title: "Mushishi",                         type: "TV Series", genre: "Supernatural, Mystery, Slice of Life","length": "46 eps",why:"Meditative and hauntingly beautiful. An anthology of supernatural encounters told with quiet wisdom.", tier: "A" },
  { rank: 46, title: "Samurai Champloo",                 type: "TV Series", genre: "Action, Historical, Comedy",   length: "26 eps",       why: "Hip-hop meets Edo-era Japan in this visually kinetic, endlessly stylish samurai road-trip.", tier: "A" },
  { rank: 47, title: "Made in Abyss",                    type: "TV Series", genre: "Adventure, Fantasy, Dark Fantasy","length": "25+ eps", why: "An impossibly beautiful world hiding monstrous horrors. Pushes boundaries of what adventure anime can depict.", tier: "A" },
  { rank: 48, title: "Spy x Family",                     type: "TV Series", genre: "Comedy, Action, Slice of Life","length": "37+ eps",    why: "Irresistibly charming. A spy, assassin, and telepath pretending to be a family — with genuine warmth throughout.", tier: "A" },
  { rank: 49, title: "91 Days",                          type: "TV Series", genre: "Historical, Thriller, Drama",  length: "13 eps",       why: "A tightly crafted Prohibition-era revenge story. Dark, elegant, and narratively efficient.", tier: "A" },
  { rank: 50, title: "Psycho-Pass",                      type: "TV Series", genre: "Sci-Fi, Psychological, Thriller","length": "22 eps",  why: "A thought-provoking cyberpunk dystopia exploring justice, free will, and the danger of algorithmic governance.", tier: "A" },
  { rank: 51, title: "Soul Eater",                       type: "TV Series", genre: "Action, Fantasy, Supernatural","length": "51 eps",     why: "Wildly inventive world and aesthetic, with enough creative flair and emotional investment to stand on its own.", tier: "A" },
  { rank: 52, title: "Toradora!",                        type: "TV Series", genre: "Romance, Comedy, Drama",       length: "25 eps",       why: "The benchmark of the tsundere romance. Charming, funny, and concludes with genuine emotional payoff.", tier: "A" },
  { rank: 53, title: "Eureka Seven",                     type: "TV Series", genre: "Mecha, Romance, Adventure",    length: "50 eps",       why: "A mecha series with a surfing aesthetic and a love story that earns every one of its emotional beats.", tier: "A" },
  { rank: 54, title: "Wolf Children",                    type: "Film",      genre: "Fantasy, Drama, Slice of Life","length": "117 min",    why: "Mamoru Hosoda's most beautiful film — a mother's story of raising two half-wolf children alone. Deeply moving.", tier: "A" },
  { rank: 55, title: "A Silent Voice",                   type: "Film",      genre: "Drama, Romance, Psychological","length": "130 min",    why: "A stunning Kyoto Animation film about bullying, guilt, redemption, and the courage to forgive yourself.", tier: "A" },
  { rank: 56, title: "The Wind Rises",                   type: "Film",      genre: "Historical, Drama, Romance",   length: "126 min",      why: "Miyazaki's farewell film is a bittersweet meditation on creativity, ambition, and the cost of dreams.", tier: "A" },
  { rank: 57, title: "Weathering with You",              type: "Film",      genre: "Romance, Fantasy, Drama",      length: "112 min",      why: "Shinkai's follow-up to Your Name — visually breathtaking rain-drenched romance with a subversive ending.", tier: "A" },
  { rank: 58, title: "Sword Art Online (S1)",            type: "TV Series", genre: "Sci-Fi, Action, Romance",      length: "25 eps",       why: "Flawed but foundational. The Aincrad arc captured the imagination of a generation and defined isekai anime.", tier: "A" },
  { rank: 59, title: "Golden Kamuy",                     type: "TV Series", genre: "Historical, Action, Adventure","length": "56+ eps",    why: "Post-Russo-Japanese War survival thriller packed with Ainu culture, gritty action, and absurd comedy.", tier: "A" },
  { rank: 60, title: "The Promised Neverland (S1)",      type: "TV Series", genre: "Thriller, Mystery, Sci-Fi",    length: "12 eps",       why: "Season 1 is a near-perfect suspense thriller about children in a sinister orphanage planning their escape.", tier: "A" },

  // ── B-TIER HIGHLY RECOMMENDED ─────────────────────────────────────────
  { rank: 61, title: "Overlord",                         type: "TV Series", genre: "Fantasy, Action, Comedy",      length: "52+ eps",      why: "A refreshingly clever isekai from the villain's perspective. Dark humor meets genuine world-building.", tier: "B" },
  { rank: 62, title: "That Time I Got Reincarnated as a Slime",type:"TV Series",genre:"Fantasy, Adventure, Comedy",length:"50+ eps",      why: "One of the most thoughtfully constructed isekai worlds with a consistently entertaining protagonist.", tier: "B" },
  { rank: 63, title: "Odd Taxi",                         type: "TV Series", genre: "Mystery, Thriller, Slice of Life","length": "13 eps", why: "A talking-animal noir mystery that slowly reveals a shocking web of interconnected stories. A hidden treasure.", tier: "B" },
  { rank: 64, title: "Kaiji",                            type: "TV Series", genre: "Psychological, Thriller, Drama","length": "52 eps",    why: "A gambling thriller with existential stakes. Nail-biting tension built from simple games.", tier: "B" },
  { rank: 65, title: "No Game No Life",                  type: "TV Series", genre: "Fantasy, Comedy, Sci-Fi",      length: "12 eps",       why: "A stylish, hyper-saturated game-world fantasy with clever strategies and a fun sibling duo.", tier: "B" },
  { rank: 66, title: "Black Clover",                     type: "TV Series", genre: "Action, Fantasy, Adventure",   length: "170 eps",      why: "Slow to start, but the magic system creativity and Asta's raw determination produce legitimately great arcs.", tier: "B" },
  { rank: 67, title: "Chainsaw Man",                     type: "TV Series", genre: "Action, Dark Fantasy, Horror", length: "12 eps",       why: "MAPPA's wild, kinetic adaptation of a deranged manga. Pure visceral energy with surprising emotional depth.", tier: "B" },
  { rank: 68, title: "Blue Period",                      type: "TV Series", genre: "Drama, Slice of Life, Art",    length: "12 eps",       why: "A rare anime about the creative process — the obsession, doubt, and joy of becoming an artist.", tier: "B" },
  { rank: 69, title: "Shirobako",                        type: "TV Series", genre: "Slice of Life, Comedy, Drama", length: "24 eps",       why: "A love letter to the anime industry itself. Authentic, warm, and inspiring for anyone in a creative career.", tier: "B" },
  { rank: 70, title: "Barakamon",                        type: "TV Series", genre: "Slice of Life, Comedy, Drama", length: "12 eps",       why: "A calligrapher exiled to a rural island rediscovers his passion through the village children. Delightful.", tier: "B" },
  { rank: 71, title: "Anohana",                          type: "TV Series", genre: "Drama, Supernatural, Romance", length: "11 eps",       why: "A compact, emotionally obliterating story about a group of childhood friends haunted by the death of their best friend.", tier: "B" },
  { rank: 72, title: "Tokyo Revengers",                  type: "TV Series", genre: "Action, Drama, Sci-Fi",        length: "63+ eps",      why: "A compelling time-travel delinquent drama with high emotional stakes and gang war tension.", tier: "B" },
  { rank: 73, title: "Sk8 the Infinity",                 type: "TV Series", genre: "Sports, Action, Comedy",       length: "12 eps",       why: "Unapologetically over-the-top skateboarding anime with electrifying animation and genuine heart.", tier: "B" },
  { rank: 74, title: "Megalobox",                        type: "TV Series", genre: "Sports, Sci-Fi, Drama",        length: "26 eps",       why: "A visually gritty cyberpunk boxing story that modernizes Ashita no Joe's themes with style.", tier: "B" },
  { rank: 75, title: "The Vision of Escaflowne",         type: "TV Series", genre: "Fantasy, Mecha, Romance",      length: "26 eps",       why: "A classic 90s fantasy-mecha with strong tarot symbolism and an unusually emotional female lead.", tier: "B" },
  { rank: 76, title: "Tengen Toppa Gurren Lagann",        type: "TV Series", genre: "Mecha, Action, Adventure",     length: "27 eps",       why: "Pure escalating hype from episode one to finale. Drill-powered mecha philosophy at its most bombastic.", tier: "B" },
  { rank: 77, title: "Bungo Stray Dogs",                 type: "TV Series", genre: "Action, Supernatural, Mystery","length": "60+ eps",    why: "Literary figures reimagined as supernatural ability users. Stylish, witty, and narratively inventive.", tier: "B" },
  { rank: 78, title: "March Comes in like a Lion",       type: "TV Series", genre: "Drama, Slice of Life, Sports", length: "44 eps",       why: "A shogi prodigy's struggle with depression and isolation rendered with extraordinary emotional honesty.", tier: "B" },
  { rank: 79, title: "Kaguya-sama: Love is War",         type: "TV Series", genre: "Comedy, Romance, Psychological","length": "37 eps",    why: "The smartest romantic comedy in anime. Two geniuses too proud to confess, scheming in increasingly absurd ways.", tier: "B" },
  { rank: 80, title: "Nichijou",                         type: "TV Series", genre: "Comedy, Slice of Life",        length: "26 eps",       why: "Absurdist comedy that runs entirely on escalating mundane chaos. The animation during its gags is stunning.", tier: "B" },
  { rank: 81, title: "Ouran High School Host Club",      type: "TV Series", genre: "Comedy, Romance, Slice of Life","length": "26 eps",    why: "A joyful reverse-harem that lovingly parodies its own genre while developing genuine emotional connections.", tier: "B" },
  { rank: 82, title: "Natsume's Book of Friends",        type: "TV Series", genre: "Supernatural, Slice of Life, Drama","length": "74 eps",why:"A gentle, healing series about a boy who can see spirits. One of anime's most comforting and quietly profound journeys.", tier: "B" },
  { rank: 83, title: "Land of the Lustrous",             type: "TV Series", genre: "Fantasy, Sci-Fi, Psychological","length": "12 eps",    why: "Groundbreaking full-CG animation with a philosophically rich story about identity, memory, and loss.", tier: "B" },
  { rank: 84, title: "Claymore",                         type: "TV Series", genre: "Dark Fantasy, Action, Drama",  length: "26 eps",       why: "A grim, compelling fantasy with a stoic female warrior lead that still ranks among the best of its genre.", tier: "B" },
  { rank: 85, title: "Black Lagoon",                     type: "TV Series", genre: "Action, Thriller, Crime",      length: "24 eps",       why: "Explosive gun-fu action in a criminal underworld. Revy is one of anime's most iconic anti-heroines.", tier: "B" },
  { rank: 86, title: "Tatami Galaxy",                    type: "TV Series", genre: "Psychological, Comedy, Drama", length: "11 eps",       why: "A time-loop character study with a relentless monologue style and a visual flair that's impossible to replicate.", tier: "B" },
  { rank: 87, title: "Darker than Black",                type: "TV Series", genre: "Sci-Fi, Action, Supernatural", length: "25 eps",       why: "A moody, stylish sci-fi noir with a compelling powers system and an emotionally guarded protagonist.", tier: "B" },
  { rank: 88, title: "Texhnolyze",                       type: "TV Series", genre: "Sci-Fi, Psychological, Dark",  length: "22 eps",       why: "Brutally nihilistic underground-city sci-fi. Demanding but immensely rewarding for patient viewers.", tier: "B" },
  { rank: 89, title: "Planetes",                         type: "TV Series", genre: "Sci-Fi, Drama, Slice of Life", length: "26 eps",       why: "Hard science fiction about orbital debris collectors. Grounded, romantic, and quietly profound.", tier: "B" },
  { rank: 90, title: "The Boy and the Heron",            type: "Film",      genre: "Fantasy, Drama, Adventure",    length: "124 min",      why: "Miyazaki's 2023 semi-autobiographical masterpiece. Dense, dreamlike, and overflowing with symbolic imagery.", tier: "B" },
  { rank: 91, title: "Suzume",                           type: "Film",      genre: "Fantasy, Drama, Romance",      length: "122 min",      why: "Makoto Shinkai's most thematically ambitious film — a road trip about grief, disaster, and Japanese memory.", tier: "B" },
  { rank: 92, title: "Millennium Actress",               type: "Film",      genre: "Drama, Historical, Mystery",   length: "87 min",       why: "Satoshi Kon's love letter to Japanese cinema. A layered narrative that blurs film and memory beautifully.", tier: "B" },
  { rank: 93, title: "Paprika",                          type: "Film",      genre: "Sci-Fi, Psychological, Fantasy","length": "90 min",    why: "Satoshi Kon's dream-invasion thriller influenced Inception. Vivid, chaotic, and brilliantly imagined.", tier: "B" },
  { rank: 94, title: "Perfect Blue",                     type: "Film",      genre: "Psychological, Thriller, Horror","length": "81 min",   why: "Satoshi Kon's debut is a harrowing dissection of idol culture, obsession, and fractured identity.", tier: "B" },
  { rank: 95, title: "From Up on Poppy Hill",            type: "Film",      genre: "Drama, Romance, Historical",   length: "91 min",       why: "A warm, underseen Ghibli gem about post-war Japan, first love, and preserving what's worth keeping.", tier: "B" },
  { rank: 96, title: "The Girl Who Leapt Through Time",  type: "Film",      genre: "Sci-Fi, Romance, Drama",       length: "98 min",       why: "A sweet, nostalgic time-travel story about a girl who realizes her actions have lasting consequences.", tier: "B" },
  { rank: 97, title: "Devilman Crybaby",                 type: "TV Series", genre: "Supernatural, Horror, Drama",  length: "10 eps",       why: "Masaaki Yuasa's Netflix adaptation: a visually wild, emotionally devastating exploration of what it means to be human.", tier: "B" },
  { rank: 98, title: "Keep Your Hands Off Eizouken!",    type: "TV Series", genre: "Comedy, Slice of Life, Drama", length: "12 eps",       why: "A love letter to animation itself. Three girls building their dream anime studio, bursting with creative energy.", tier: "B" },
  { rank: 99, title: "Prison School",                    type: "TV Series", genre: "Comedy, Ecchi, Drama",         length: "12 eps",       why: "Outrageously funny and absurdly well-plotted. A comedic prison thriller that escalates brilliantly.", tier: "B" },
  { rank: 100,title: "Yuri!!! on ICE",                   type: "TV Series", genre: "Sports, Romance, Drama",       length: "12 eps",       why: "Beautifully animated figure skating with a groundbreaking gay romance handled with rare maturity and warmth.", tier: "B" },
  { rank: 101,title: "Dungeon Meshi (Delicious in Dungeon)",type:"TV Series",genre:"Fantasy, Adventure, Comedy",   length: "24+ eps",      why: "An imaginative fantasy about cooking monsters. Worldbuilding is exceptional and the cast is instantly loveable.", tier: "B" },
  { rank: 102,title: "Bocchi the Rock!",                 type: "TV Series", genre: "Comedy, Slice of Life, Music", length: "12 eps",       why: "A hilariously animated portrait of crippling social anxiety, music, and growing up that's deeply relatable.", tier: "B" },
  { rank: 103,title: "Blue Lock",                        type: "TV Series", genre: "Sports, Psychological, Drama", length: "24+ eps",      why: "A hyper-competitive soccer series that treats the sport as psychological warfare between ego and ambition.", tier: "B" },
  { rank: 104,title: "Oshi no Ko",                       type: "TV Series", genre: "Drama, Mystery, Psychological","length": "23+ eps",    why: "A pitch-black deconstruction of idol culture with a jaw-dropping first episode and sharp industry commentary.", tier: "B" },
  { rank: 105,title: "Frieren: Beyond Journey's End",    type: "TV Series", genre: "Fantasy, Drama, Adventure",    length: "28+ eps",      why: "An elven mage reflects on time, mortality, and connection long after the adventure ends. Profoundly moving.", tier: "B" },
];

const TIERS = {
  S: { label: "S-Tier · Masterpieces", color: "#f5c542", bg: "rgba(245,197,66,0.10)", border: "#f5c542" },
  A: { label: "A-Tier · Essential Watches", color: "#a8c7fa", bg: "rgba(168,199,250,0.08)", border: "#a8c7fa" },
  B: { label: "B-Tier · Highly Recommended", color: "#81e6a0", bg: "rgba(129,230,160,0.08)", border: "#81e6a0" },
};

const GENRES = ["All", ...Array.from(new Set(ANIME_DATA.flatMap(a => a.genre.split(", ").map(g => g.trim())))).sort()];
const TYPES = ["All", "TV Series", "Film"];

const TOP10_BEGINNERS = [1,10,8,17,39,22,29,55,24,96];
const TOP10_ADVANCED = [6,14,86,88,42,40,45,7,89,63];
const TOP10_HIDDEN = [63,42,86,89,40,88,45,68,69,97];

function Badge({ color, children }) {
  return (
    <span style={{
      display:"inline-block", padding:"2px 8px", borderRadius:99,
      fontSize:11, fontWeight:700, letterSpacing:"0.04em",
      background: color + "22", color, border:`1px solid ${color}44`,
    }}>{children}</span>
  );
}

export default function AnimeWatchlist() {
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("aw_completed") || "{}"); } catch { return {}; }
  });
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showCompleted, setShowCompleted] = useState(true);
  const [activeTab, setActiveTab] = useState("list"); // list | summary
  const [collapsedTiers, setCollapsedTiers] = useState({});

  const toggleCompleted = (rank) => {
    const next = { ...completed, [rank]: !completed[rank] };
    setCompleted(next);
    try { localStorage.setItem("aw_completed", JSON.stringify(next)); } catch {}
  };

  const toggleTier = (tier) => setCollapsedTiers(p => ({ ...p, [tier]: !p[tier] }));

  const filtered = ANIME_DATA.filter(a => {
    if (!showCompleted && completed[a.rank]) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.genre.toLowerCase().includes(search.toLowerCase())) return false;
    if (genreFilter !== "All" && !a.genre.includes(genreFilter)) return false;
    if (typeFilter !== "All" && a.type !== typeFilter) return false;
    return true;
  });

  const completedCount = Object.values(completed).filter(Boolean).length;
  const pct = Math.round((completedCount / ANIME_DATA.length) * 100);

  const tvCount = ANIME_DATA.filter(a => a.type === "TV Series").length;
  const filmCount = ANIME_DATA.filter(a => a.type === "Film").length;

  const getRankInfo = (ranks) => ANIME_DATA.filter(a => ranks.includes(a.rank));

  return (
    <div style={{ background:"#0d0f14", minHeight:"100vh", color:"#e4e8f0", fontFamily:"'Inter', 'Helvetica Neue', sans-serif" }}>
      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg, #0d0f14 0%, #151a28 50%, #0d1220 100%)", padding:"48px 24px 32px", textAlign:"center", borderBottom:"1px solid #1e2436" }}>
        <div style={{ fontSize:11, letterSpacing:"0.2em", color:"#a8c7fa", textTransform:"uppercase", marginBottom:12 }}>The Ultimate</div>
        <h1 style={{ margin:0, fontSize:"clamp(28px,6vw,52px)", fontWeight:900, letterSpacing:"-0.02em", background:"linear-gradient(90deg,#f5c542,#a8c7fa,#81e6a0)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          Anime Watchlist
        </h1>
        <p style={{ color:"#8892a4", marginTop:10, fontSize:14, maxWidth:480, marginLeft:"auto", marginRight:"auto" }}>
          105 curated titles across S, A, and B tiers — your long-term watch tracker.
        </p>
        {/* Progress */}
        <div style={{ maxWidth:360, margin:"24px auto 0", background:"#1a1f2e", borderRadius:12, padding:"16px 20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, fontSize:13 }}>
            <span style={{ color:"#8892a4" }}>Progress</span>
            <span style={{ color:"#f5c542", fontWeight:700 }}>{completedCount} / {ANIME_DATA.length}</span>
          </div>
          <div style={{ background:"#0d0f14", borderRadius:99, height:6, overflow:"hidden" }}>
            <div style={{ width:`${pct}%`, height:"100%", background:"linear-gradient(90deg,#f5c542,#a8c7fa)", borderRadius:99, transition:"width 0.4s ease" }} />
          </div>
          <div style={{ textAlign:"right", fontSize:11, color:"#4a5568", marginTop:4 }}>{pct}% complete</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:"1px solid #1e2436", background:"#0d0f14" }}>
        {[["list","📋 Watchlist"], ["summary","📊 Summary"]].map(([key, label]) => (
          <button key={key} onClick={() => setActiveTab(key)} style={{
            flex:1, padding:"14px 0", background:"none", border:"none", cursor:"pointer",
            color: activeTab===key ? "#f5c542" : "#4a5568",
            borderBottom: activeTab===key ? "2px solid #f5c542" : "2px solid transparent",
            fontWeight: activeTab===key ? 700 : 400, fontSize:14, transition:"all 0.2s",
          }}>{label}</button>
        ))}
      </div>

      {activeTab === "list" && (
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 16px" }}>
          {/* Filters */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:20 }}>
            <input
              placeholder="Search title or genre…"
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex:"1 1 200px", background:"#1a1f2e", border:"1px solid #2a3044", borderRadius:8, padding:"9px 14px", color:"#e4e8f0", fontSize:14, outline:"none" }}
            />
            <select value={genreFilter} onChange={e => setGenreFilter(e.target.value)}
              style={{ background:"#1a1f2e", border:"1px solid #2a3044", borderRadius:8, padding:"9px 14px", color:"#e4e8f0", fontSize:13, outline:"none", cursor:"pointer" }}>
              {GENRES.map(g => <option key={g}>{g}</option>)}
            </select>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
              style={{ background:"#1a1f2e", border:"1px solid #2a3044", borderRadius:8, padding:"9px 14px", color:"#e4e8f0", fontSize:13, outline:"none", cursor:"pointer" }}>
              {TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <button onClick={() => setShowCompleted(p => !p)} style={{
              background: showCompleted ? "#1a1f2e" : "#81e6a022",
              border: `1px solid ${showCompleted ? "#2a3044" : "#81e6a0"}`,
              borderRadius:8, padding:"9px 14px", color: showCompleted ? "#8892a4" : "#81e6a0",
              fontSize:13, cursor:"pointer", whiteSpace:"nowrap",
            }}>
              {showCompleted ? "Hide Completed" : "Show Completed"}
            </button>
          </div>

          {/* Tier groups */}
          {(["S","A","B"]).map(tier => {
            const items = filtered.filter(a => a.tier === tier);
            if (!items.length) return null;
            const { label, color, bg, border } = TIERS[tier];
            const collapsed = collapsedTiers[tier];
            return (
              <div key={tier} style={{ marginBottom:32 }}>
                <button onClick={() => toggleTier(tier)} style={{
                  display:"flex", alignItems:"center", gap:10, background:"none", border:"none",
                  cursor:"pointer", padding:"0 0 12px", width:"100%", textAlign:"left",
                }}>
                  <span style={{ fontSize:18, fontWeight:900, color }}>{tier}</span>
                  <span style={{ fontSize:14, fontWeight:600, color:"#8892a4" }}>{label}</span>
                  <span style={{ fontSize:12, color:"#4a5568", marginLeft:"auto" }}>{items.length} titles  {collapsed ? "▸" : "▾"}</span>
                </button>
                {!collapsed && (
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {items.map(anime => (
                      <div key={anime.rank} onClick={() => toggleCompleted(anime.rank)} style={{
                        display:"grid", gridTemplateColumns:"40px 36px 1fr", gap:"0 14px", alignItems:"start",
                        background: completed[anime.rank] ? "rgba(129,230,160,0.04)" : bg,
                        border: `1px solid ${completed[anime.rank] ? "#81e6a044" : border+"33"}`,
                        borderRadius:10, padding:"14px 16px", cursor:"pointer",
                        opacity: completed[anime.rank] ? 0.55 : 1,
                        transition:"all 0.18s ease",
                      }}>
                        {/* Checkbox */}
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", paddingTop:2 }}>
                          <div style={{
                            width:20, height:20, borderRadius:5, border:`2px solid ${completed[anime.rank] ? "#81e6a0" : "#2a3044"}`,
                            background: completed[anime.rank] ? "#81e6a0" : "transparent",
                            display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.18s",
                          }}>
                            {completed[anime.rank] && <span style={{ color:"#0d1220", fontWeight:900, fontSize:12 }}>✓</span>}
                          </div>
                        </div>
                        {/* Rank */}
                        <div style={{ textAlign:"center", paddingTop:2 }}>
                          <span style={{ fontSize:11, fontWeight:700, color:"#4a5568" }}>#{anime.rank}</span>
                        </div>
                        {/* Info */}
                        <div>
                          <div style={{ display:"flex", flexWrap:"wrap", gap:6, alignItems:"center", marginBottom:4 }}>
                            <span style={{ fontWeight:700, fontSize:15, color: completed[anime.rank] ? "#8892a4" : "#e4e8f0", textDecoration: completed[anime.rank] ? "line-through" : "none" }}>{anime.title}</span>
                            <Badge color={anime.type === "Film" ? "#a8c7fa" : "#f5c542"}>{anime.type}</Badge>
                            <span style={{ fontSize:11, color:"#4a5568" }}>{anime.length}</span>
                          </div>
                          <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:6 }}>
                            {anime.genre.split(", ").map(g => (
                              <span key={g} style={{ fontSize:10, padding:"2px 6px", borderRadius:99, background:"#1a1f2e", color:"#8892a4", border:"1px solid #2a3044" }}>{g}</span>
                            ))}
                          </div>
                          <p style={{ margin:0, fontSize:12, color:"#6b7687", lineHeight:1.6 }}>{anime.why}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign:"center", padding:"60px 0", color:"#4a5568" }}>No anime match your filters.</div>
          )}
        </div>
      )}

      {activeTab === "summary" && (
        <div style={{ maxWidth:900, margin:"0 auto", padding:"24px 16px" }}>
          {/* Stats row */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:12, marginBottom:32 }}>
            {[
              ["Total Anime", ANIME_DATA.length, "#f5c542"],
              ["TV Series", tvCount, "#a8c7fa"],
              ["Films", filmCount, "#81e6a0"],
              ["Completed", completedCount, "#f87171"],
              ["Remaining", ANIME_DATA.length - completedCount, "#8892a4"],
            ].map(([label, val, color]) => (
              <div key={label} style={{ background:"#1a1f2e", border:"1px solid #2a3044", borderRadius:10, padding:"16px", textAlign:"center" }}>
                <div style={{ fontSize:28, fontWeight:900, color }}>{val}</div>
                <div style={{ fontSize:11, color:"#4a5568", marginTop:4, letterSpacing:"0.05em", textTransform:"uppercase" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Three top-10 lists */}
          {[
            { title:"🌱 Top 10 for Beginners", ranks: TOP10_BEGINNERS, color:"#81e6a0" },
            { title:"🧠 Top 10 for Advanced Fans", ranks: TOP10_ADVANCED, color:"#a8c7fa" },
            { title:"💎 Top 10 Hidden Gems", ranks: TOP10_HIDDEN, color:"#f5c542" },
          ].map(({ title, ranks, color }) => (
            <div key={title} style={{ marginBottom:28 }}>
              <h3 style={{ color, fontWeight:800, margin:"0 0 12px", fontSize:17 }}>{title}</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {getRankInfo(ranks).map((anime, i) => (
                  <div key={anime.rank} style={{
                    display:"flex", alignItems:"center", gap:12,
                    background:"#1a1f2e", border:"1px solid #2a3044", borderRadius:8, padding:"10px 14px",
                  }}>
                    <span style={{ minWidth:22, fontSize:12, fontWeight:800, color }}>{i+1}.</span>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14 }}>{anime.title}</div>
                      <div style={{ fontSize:11, color:"#4a5568" }}>{anime.type} · {anime.genre.split(", ").slice(0,2).join(", ")} · {anime.length}</div>
                    </div>
                    <div onClick={() => toggleCompleted(anime.rank)} style={{
                      marginLeft:"auto", width:20, height:20, borderRadius:4,
                      border:`2px solid ${completed[anime.rank] ? "#81e6a0" : "#2a3044"}`,
                      background: completed[anime.rank] ? "#81e6a0" : "transparent",
                      display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0,
                    }}>
                      {completed[anime.rank] && <span style={{ color:"#0d1220", fontWeight:900, fontSize:10 }}>✓</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign:"center", padding:"32px 16px", color:"#2a3044", fontSize:12 }}>
        105 titles · curated for long-term watching · click any card to mark complete
      </div>
    </div>
  );
}
