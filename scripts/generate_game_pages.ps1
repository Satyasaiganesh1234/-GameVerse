# PowerShell Generator for 20 Dedicated GameVerse Web Pages
$gamesDir = "c:\Users\marth\.gemini\antigravity\scratch\GameVerse-Project\public\games"
if (!(Test-Path $gamesDir)) {
    New-Item -ItemType Directory -Path $gamesDir -Force | Out-Null
}

$games = @(
    @{
        id = 1
        slug = "gta-vi"
        title = "Grand Theft Auto VI (GTA VI)"
        shortTitle = "GTA VI"
        genre = "Open-World Action-Adventure"
        genreTags = @("Action", "Adventure", "Open-World", "Action-Adventure")
        platforms = @("PS5", "Xbox Series X/S")
        releaseStatus = "2026"
        releaseYear = "2026"
        isUpcoming = $false
        developer = "Rockstar Games"
        publisher = "Take-Two Interactive"
        engine = "RAGE Engine 9"
        sampleRating = 4.9
        samplePopularity = 99
        coverImage = "../images/gta-vi.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=QdBZY2fkU-0"
        youtubeId = "QdBZY2fkU-0"
        tagline = "Welcome back to Vice City — Bigger, wilder, and more immersive than ever."
        description = "Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet. Follow the dual protagonist dynamic of Lucia and Jason as they navigate an unapologetically chaotic modern criminal underworld."
        features = @(
            "Expansive, hyper-detailed recreation of Vice City and the surrounding state of Leonida.",
            "Dual-protagonist storyline with complementary narrative perspectives.",
            "Next-generation AI crowd density, realistic weather physics, and volumetric volumetric clouds.",
            "Dynamic criminal enterprises, high-speed getaway mechanics, and advanced law enforcement response."
        )
        prevSlug = "tekken-3"
        prevTitle = "Tekken 3"
        nextSlug = "uncharted-lost-legacy"
        nextTitle = "Uncharted: The Lost Legacy"
    },
    @{
        id = 2
        slug = "uncharted-lost-legacy"
        title = "Uncharted: The Lost Legacy"
        shortTitle = "Uncharted: Lost Legacy"
        genre = "Action-Adventure"
        genreTags = @("Action", "Adventure", "Action-Adventure")
        platforms = @("PS4", "PS5", "PC")
        releaseStatus = "2017"
        releaseYear = "2017"
        isUpcoming = $false
        developer = "Naughty Dog"
        publisher = "Sony Interactive Entertainment"
        engine = "Naughty Dog In-House Engine"
        sampleRating = 4.6
        samplePopularity = 85
        coverImage = "../images/uncharted-lost-legacy.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=-PhhiKPHTWM"
        youtubeId = "-PhhiKPHTWM"
        tagline = "To save an ancient treasure, Chloe Frazer and Nadine Ross must unite in the Western Ghats."
        description = "In order to recover an ancient artifact and keep it out of the hands of a ruthless warmonger, Chloe Frazer must enlist the aid of renowned mercenary Nadine Ross and venture deep into India's Western Ghats to locate the Golden Tusk of Ganesh."
        features = @(
            "Vibrant, semi-open exploration across lush jungles and ancient ruins in India's Western Ghats.",
            "Deep puzzle-solving, lockpicking mechanics, and cinematic high-stakes platforming.",
            "Tactical stealth infiltration options with silenced weaponry and close-quarters hand-to-hand combat.",
            "Critically acclaimed cinematic narrative exploring Chloe Frazer's heritage."
        )
        prevSlug = "gta-vi"
        prevTitle = "Grand Theft Auto VI"
        nextSlug = "cyberpunk-2077"
        nextTitle = "Cyberpunk 2077"
    },
    @{
        id = 3
        slug = "cyberpunk-2077"
        title = "Cyberpunk 2077"
        shortTitle = "Cyberpunk 2077"
        genre = "Open-World Action RPG"
        genreTags = @("Action", "RPG", "Open-World", "Action RPG")
        platforms = @("PC", "PS4", "PS5", "Xbox One", "Xbox Series X/S")
        releaseStatus = "2020"
        releaseYear = "2020"
        isUpcoming = $false
        developer = "CD Projekt Red"
        publisher = "CD Projekt"
        engine = "REDengine 4"
        sampleRating = 4.7
        samplePopularity = 94
        coverImage = "../images/cyberpunk-2077.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=8X2kIfS6fb8"
        youtubeId = "8X2kIfS6fb8"
        tagline = "Become a legendary cybernetic mercenary in the heart of Night City."
        description = "An open-world, action-adventure RPG set in the megalopolis of Night City, where you play as V, a cyberpunk mercenary caught in a do-or-die struggle for survival. Upgraded with full ray tracing, overhauled skill trees, and vehicular combat."
        features = @(
            "Massive, multi-level futuristic city featuring six distinct districts with rich cultural identities.",
            "Endless character build customization through cyberware implants, perks, and hacking abilities.",
            "Non-linear quest architecture with branching dialogue choices and multiple story endings.",
            "Deep weapon modification system including smart weapons, tech rifles, and mantis blades."
        )
        prevSlug = "uncharted-lost-legacy"
        prevTitle = "Uncharted: The Lost Legacy"
        nextSlug = "rdr2"
        nextTitle = "Red Dead Redemption 2"
    },
    @{
        id = 4
        slug = "rdr2"
        title = "Red Dead Redemption 2 (RDR2)"
        shortTitle = "Red Dead Redemption 2"
        genre = "Open-World Action-Adventure"
        genreTags = @("Action", "Adventure", "Open-World", "Action-Adventure")
        platforms = @("PC", "PS4", "Xbox One")
        releaseStatus = "2018"
        releaseYear = "2018"
        isUpcoming = $false
        developer = "Rockstar Games"
        publisher = "Rockstar Games"
        engine = "RAGE Engine"
        sampleRating = 4.9
        samplePopularity = 97
        coverImage = "../images/rdr2.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=eaW0tYpxyp0"
        youtubeId = "eaW0tYpxyp0"
        tagline = "Outlaws for life across the dying embers of the American frontier."
        description = "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight across the rugged heartland of America to survive."
        features = @(
            "An unmatched level of environmental detail, reactive wildlife ecosystems, and realistic physics.",
            "Living, breathing camp dynamic where interpersonal gang relationships evolve based on decisions.",
            "Deadeye targeting system for surgical gunplay and cinematic shootout sequences.",
            "Emotional, award-winning narrative chronicling the sunset of the American Wild West era."
        )
        prevSlug = "cyberpunk-2077"
        prevTitle = "Cyberpunk 2077"
        nextSlug = "black-myth-wukong"
        nextTitle = "Black Myth: Wukong"
    },
    @{
        id = 5
        slug = "black-myth-wukong"
        title = "Black Myth: Wukong"
        shortTitle = "Black Myth: Wukong"
        genre = "Action RPG"
        genreTags = @("Action", "RPG", "Action RPG")
        platforms = @("PC", "PS5", "Xbox Series X/S")
        releaseStatus = "2024"
        releaseYear = "2024"
        isUpcoming = $false
        developer = "Game Science"
        publisher = "Game Science"
        engine = "Unreal Engine 5"
        sampleRating = 4.8
        samplePopularity = 95
        coverImage = "../images/black-myth-wukong.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=pnSsgRJmsCc"
        youtubeId = "pnSsgRJmsCc"
        tagline = "Set out as the Destined One across the mythic tapestry of Journey to the West."
        description = "An action RPG rooted in Chinese mythology and based on Journey to the West. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend."
        features = @(
            "Dynamic martial arts staff combat with multiple stances (Smash, Pillar, and Thrust).",
            "Extensive shapeshifting transformations allowing you to wield defeated bosses' abilities.",
            "Stunning next-generation visual fidelity powered by Unreal Engine 5 Nanite and Lumen.",
            "Epic mythological boss encounters inspired by classical Chinese folklore and literature."
        )
        prevSlug = "rdr2"
        prevTitle = "Red Dead Redemption 2"
        nextSlug = "god-of-war"
        nextTitle = "God of War (2018)"
    },
    @{
        id = 6
        slug = "god-of-war"
        title = "God of War (2018)"
        shortTitle = "God of War (2018)"
        genre = "Action-Adventure"
        genreTags = @("Action", "Adventure", "Action-Adventure")
        platforms = @("PS4", "PC")
        releaseStatus = "2018"
        releaseYear = "2018"
        isUpcoming = $false
        developer = "Santa Monica Studio"
        publisher = "Sony Interactive Entertainment"
        engine = "Santa Monica In-House Engine"
        sampleRating = 4.9
        samplePopularity = 94
        coverImage = "../images/god-of-war.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=K0u_kAWLJOA"
        youtubeId = "K0u_kAWLJOA"
        tagline = "His vengeance against the gods behind him, Kratos must mentor his son Atreus."
        description = "Living as a man outside the shadow of the gods, Kratos must adapt to unfamiliar Norse lands, unexpected threats, and a second chance at being a father alongside his son Atreus as they journey to scatter his wife's ashes atop the highest peak."
        features = @(
            "Revolutionary uninterrupted single-shot camera direction with zero cuts or camera fades.",
            "Visceral, weighty combat mechanics centered around the recallable frost Leviathan Axe.",
            "Heartfelt emotional storytelling exploring the complex bonds of fatherhood and redemption.",
            "Deep exploration of the Norse realms filled with mythical beasts, Valkyries, and puzzles."
        )
        prevSlug = "black-myth-wukong"
        prevTitle = "Black Myth: Wukong"
        nextSlug = "007-first-light"
        nextTitle = "007 First Light"
    },
    @{
        id = 7
        slug = "007-first-light"
        title = "007 First Light"
        shortTitle = "007 First Light"
        genre = "Action-Adventure / Stealth"
        genreTags = @("Action", "Adventure", "Stealth", "Action-Adventure")
        platforms = @("PC", "PS5", "Xbox Series X/S")
        releaseStatus = "2026"
        releaseYear = "2026"
        isUpcoming = $false
        developer = "IO Interactive"
        publisher = "IO Interactive"
        engine = "Glacier Engine"
        sampleRating = 4.5
        samplePopularity = 84
        coverImage = "../images/007-first-light.jpg"
        trailerUrl = $null
        youtubeId = $null
        tagline = "Earn the Double-O status in an all-original James Bond origin thriller."
        description = "An upcoming espionage action-adventure and stealth experience featuring an original James Bond origin story developed by the masters of stealth at IO Interactive, blending high-stakes covert infiltration, bespoke gadgets, and cinematic globe-trotting missions."
        features = @(
            "Original James Bond origin storyline built completely from the ground up.",
            "Signature IO Interactive sandbox infiltration gameplay with freedom of tactical approach.",
            "High-tech MI6 spy gadgetry, disguise mechanics, and precision silenced gunplay.",
            "Cinematic globe-trotting exotic locales ranging from alpine retreats to Mediterranean casinos."
        )
        prevSlug = "god-of-war"
        prevTitle = "God of War (2018)"
        nextSlug = "ghost-of-tsushima"
        nextTitle = "Ghost of Tsushima"
    },
    @{
        id = 8
        slug = "ghost-of-tsushima"
        title = "Ghost of Tsushima"
        shortTitle = "Ghost of Tsushima"
        genre = "Open-World Action-Adventure"
        genreTags = @("Action", "Adventure", "Open-World", "Action-Adventure")
        platforms = @("PS4", "PS5", "PC")
        releaseStatus = "2020"
        releaseYear = "2020"
        isUpcoming = $false
        developer = "Sucker Punch Productions"
        publisher = "Sony Interactive Entertainment"
        engine = "Sucker Punch Proprietary Engine"
        sampleRating = 4.8
        samplePopularity = 92
        coverImage = "../images/ghost-of-tsushima.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=iqysmS4lxwQ"
        youtubeId = "iqysmS4lxwQ"
        tagline = "A storm is coming. Cast aside samurai code to protect your people."
        description = "In the late 13th century, the Mongol empire has laid waste to entire nations. Samurai warrior Jin Sakai must forge a new path—the path of the Ghost—and wage an unconventional war for the freedom of Tsushima Island."
        features = @(
            "Organic navigation guided by the Guiding Wind instead of intrusive mini-map waypoints.",
            "Precision katana dueling with multiple combat stances (Stone, Water, Wind, and Moon).",
            "Dual playstyle freedom: face enemies head-on with honorable standoff strikes or strike from the shadows.",
            "Breathtaking Japanese landscapes with pampas grass fields, golden forests, and cherry blossoms."
        )
        prevSlug = "007-first-light"
        prevTitle = "007 First Light"
        nextSlug = "ac-shadows"
        nextTitle = "Assassin’s Creed Shadows"
    },
    @{
        id = 9
        slug = "ac-shadows"
        title = "Assassin’s Creed Shadows"
        shortTitle = "AC Shadows"
        genre = "Open-World Action-Adventure / Stealth"
        genreTags = @("Action", "Adventure", "Open-World", "Stealth", "Action-Adventure")
        platforms = @("PC", "PS5", "Xbox Series X/S", "macOS")
        releaseStatus = "2025"
        releaseYear = "2025"
        isUpcoming = $false
        developer = "Ubisoft Quebec"
        publisher = "Ubisoft"
        engine = "Anvil Engine"
        sampleRating = 4.5
        samplePopularity = 89
        coverImage = "../images/ac-shadows.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=vovkzbtYBC8"
        youtubeId = "vovkzbtYBC8"
        tagline = "Unite the shadows of feudal Japan through two intertwined destinies."
        description = "Experience an intertwined story set in 16th-century feudal Japan during the turbulent Azuchi-Momoyama period. Master complementary playstyles as Naoe, an adept shinobi Assassin from Iga, and Yasuke, the powerful African samurai of historical legend."
        features = @(
            "Dual-protagonist gameplay: fluid shinobi parkour & stealth (Naoe) vs brutal heavy combat (Yasuke).",
            "Dynamic seasonal weather cycle impacting gameplay (frozen ponds in winter, hiding in tall grass in summer).",
            "Light and shadow stealth mechanics with extinguishable lanterns and crawl concealment.",
            "Customizable shinobi spy network and base building across historic Japanese provinces."
        )
        prevSlug = "ghost-of-tsushima"
        prevTitle = "Ghost of Tsushima"
        nextSlug = "forza-horizon-6"
        nextTitle = "Forza Horizon 6"
    },
    @{
        id = 10
        slug = "forza-horizon-6"
        title = "Forza Horizon 6"
        shortTitle = "Forza Horizon 6"
        genre = "Open-World Racing"
        genreTags = @("Racing", "Open-World", "Open-World Racing")
        platforms = @("PC", "Xbox Series X/S")
        releaseStatus = "2026"
        releaseYear = "2026"
        isUpcoming = $false
        developer = "Playground Games"
        publisher = "Xbox Game Studios"
        engine = "ForzaTech Engine"
        sampleRating = 4.6
        samplePopularity = 87
        coverImage = "../images/forza-horizon-6.jpg"
        trailerUrl = $null
        youtubeId = $null
        tagline = "The pinnacle of open-world automotive celebration and hypercar racing."
        description = "The highly anticipated next installment in the open-world Horizon Festival racing franchise, promising expansive dynamic biomes, hundreds of hypercars, and seamless horizon tour events across a brand new global destination."
        features = @(
            "Expansive, hyper-realistic open world with seasonal climate shifts and atmospheric lighting.",
            "Roster of over 700 meticulously modeled licensed cars from vintage icons to modern concept hypercars.",
            "EventLab 2.0 blueprint creator for community custom tracks, stunt courses, and game modes.",
            "Seamless drop-in multiplayer convoys, eliminator battle royale races, and festival playlist challenges."
        )
        prevSlug = "ac-shadows"
        prevTitle = "Assassin’s Creed Shadows"
        nextSlug = "spider-man-remastered"
        nextTitle = "Marvel’s Spider-Man Remastered"
    },
    @{
        id = 11
        slug = "spider-man-remastered"
        title = "Marvel’s Spider-Man Remastered"
        shortTitle = "Spider-Man Remastered"
        genre = "Superhero Action-Adventure"
        genreTags = @("Action", "Adventure", "Superhero", "Action-Adventure")
        platforms = @("PS5", "PC")
        releaseStatus = "2020"
        releaseYear = "2020"
        isUpcoming = $false
        developer = "Insomniac Games"
        publisher = "Sony Interactive Entertainment"
        engine = "Insomniac Proprietary Engine"
        sampleRating = 4.8
        samplePopularity = 93
        coverImage = "../images/spider-man-remastered.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=1E051WtpyWg"
        youtubeId = "1E051WtpyWg"
        tagline = "Be greater. Swing through the vibrant canyons of Marvel's New York."
        description = "An experienced Peter Parker is fighting big crime and iconic villains in Marvel’s New York. At the same time, he is struggling to balance his chaotic personal life and career while the fate of millions rests on his shoulders."
        features = @(
            "Industry-defining web-swinging physics that makes traversing Manhattan an absolute joy.",
            "Acrobatic, combo-heavy combat system featuring web shooters, gadget wheel, and aerial juggles.",
            "All-star rogues' gallery including Doc Ock, Mister Negative, Electro, Rhino, and Scorpion.",
            "Dozens of unlockable Spider-Suits each with unique suit powers and mods."
        )
        prevSlug = "forza-horizon-6"
        prevTitle = "Forza Horizon 6"
        nextSlug = "last-of-us"
        nextTitle = "The Last of Us Part I"
    },
    @{
        id = 12
        slug = "last-of-us"
        title = "The Last of Us Part I"
        shortTitle = "The Last of Us Part I"
        genre = "Action-Adventure / Survival Horror"
        genreTags = @("Action", "Adventure", "Survival Horror", "Survival", "Action-Adventure")
        platforms = @("PS5", "PC")
        releaseStatus = "2022"
        releaseYear = "2022"
        isUpcoming = $false
        developer = "Naughty Dog"
        publisher = "Sony Interactive Entertainment"
        engine = "Naughty Dog In-House Engine"
        sampleRating = 4.8
        samplePopularity = 91
        coverImage = "../images/last-of-us.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=WxjeV10H1F0"
        youtubeId = "WxjeV10H1F0"
        tagline = "Endure and survive in a devastated post-cordyceps America."
        description = "In a ravaged civilization, where infected and hardened survivors run rampant, Joel, a weary protagonist, is hired to smuggle 14-year-old Ellie out of a military quarantine zone across the United States. A masterpiece of dramatic tension and survival horror."
        features = @(
            "Tense, resource-starved survival horror combat where every bullet and shiv matters.",
            "Terrifying Infected variants including Runners, Stalkers, Clickers, and the monstrous Bloaters.",
            "Overhauled enemy combat AI with flanking behaviors and realistic communication callouts.",
            "Emotional masterclass narrative exploring the depths of human love, loss, and ruthlessness."
        )
        prevSlug = "spider-man-remastered"
        prevTitle = "Marvel’s Spider-Man Remastered"
        nextSlug = "nfs-most-wanted"
        nextTitle = "Need for Speed: Most Wanted"
    },
    @{
        id = 13
        slug = "nfs-most-wanted"
        title = "Need for Speed: Most Wanted"
        shortTitle = "NFS: Most Wanted"
        genre = "Street Racing"
        genreTags = @("Racing", "Street Racing")
        platforms = @("PC", "PS2", "Xbox 360", "GameCube")
        releaseStatus = "2005"
        releaseYear = "2005"
        isUpcoming = $false
        developer = "EA Black Box"
        publisher = "Electronic Arts"
        engine = "EAGL Engine"
        sampleRating = 4.8
        samplePopularity = 91
        coverImage = "../images/nfs-most-wanted.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=fR91feES1P0"
        youtubeId = "fR91feES1P0"
        tagline = "Climb the Blacklist 15 and outrun the Rockport Police Department."
        description = "Outrun rivals, evade relentless Rockport police pursuits, and climb the iconic Blacklist 15 street racing ladder to reclaim your legendary blue-and-silver BMW M3 GTR. Universally hailed as one of the finest arcade street racers ever produced."
        features = @(
            "Iconic Blacklist 15 progression challenging you against unforgettable street racing bosses.",
            "High-stakes police pursuit system featuring escalating heat levels, spike strips, and road blocks.",
            "Legendary BMW M3 GTR GT and extensive performance tuning and body kit customizations.",
            "Adrenaline-fueled licensed rock and electronic soundtrack complementing high-speed pursuits."
        )
        prevSlug = "last-of-us"
        prevTitle = "The Last of Us Part I"
        nextSlug = "gta-vice-city"
        nextTitle = "Grand Theft Auto: Vice City"
    },
    @{
        id = 14
        slug = "gta-vice-city"
        title = "Grand Theft Auto: Vice City"
        shortTitle = "GTA: Vice City"
        genre = "Open-World Action-Adventure"
        genreTags = @("Action", "Adventure", "Open-World", "Action-Adventure")
        platforms = @("PC", "PS2", "Xbox")
        releaseStatus = "2002"
        releaseYear = "2002"
        isUpcoming = $false
        developer = "Rockstar North"
        publisher = "Rockstar Games"
        engine = "RenderWare"
        sampleRating = 4.8
        samplePopularity = 92
        coverImage = "../images/gta-vice-city.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=MpmDawqOfqs"
        youtubeId = "MpmDawqOfqs"
        tagline = "Pastel suits, neon palms, and Tommy Vercetti’s criminal empire."
        description = "Welcome to the 1980s. From the decade of big hair, excess, and pastel suits comes a story of Tommy Vercetti’s rise to the top of the criminal pile in a sprawling tropical metropolis. An undisputed cultural landmark in gaming history."
        features = @(
            "Sun-soaked 1980s retro aesthetics set across Vice Beach and Mainland.",
            "Landmark licensed radio stations spanning 80s pop, new wave, rock, and electro funk.",
            "Asset acquisition empire gameplay: purchase nightclubs, taxi firms, and film studios.",
            "Classic drive-by combat, motorcycle mechanics, and helicopter flight missions."
        )
        prevSlug = "nfs-most-wanted"
        prevTitle = "Need for Speed: Most Wanted"
        nextSlug = "ac-mirage"
        nextTitle = "Assassin’s Creed Mirage"
    },
    @{
        id = 15
        slug = "ac-mirage"
        title = "Assassin’s Creed Mirage"
        shortTitle = "AC Mirage"
        genre = "Action-Adventure / Stealth"
        genreTags = @("Action", "Adventure", "Stealth", "Action-Adventure")
        platforms = @("PC", "PS4", "PS5", "Xbox One", "Xbox Series X/S")
        releaseStatus = "2023"
        releaseYear = "2023"
        isUpcoming = $false
        developer = "Ubisoft Bordeaux"
        publisher = "Ubisoft"
        engine = "Ubisoft Anvil"
        sampleRating = 4.3
        samplePopularity = 82
        coverImage = "../images/ac-mirage.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=x55lAlFtXmw"
        youtubeId = "x55lAlFtXmw"
        tagline = "Return to the roots of the creed in Golden Age ninth-century Baghdad."
        description = "Experience the story of Basim, a cunning street thief with nightmarish visions, seeking answers and justice as he navigates the bustling streets of ninth-century Baghdad and joins the ancient organization of the Hidden Ones."
        features = @(
            "A heartfelt homage to the original Assassin's Creed titles with tight urban parkour.",
            "Pure stealth assassination gameplay: eavesdropping, social stealth blending, and smoke bombs.",
            "Dense, alive recreation of ninth-century Baghdad during the Islamic Golden Age.",
            "Assassin Focus ability for rapid chained assassinations from vantage points."
        )
        prevSlug = "gta-vice-city"
        prevTitle = "Grand Theft Auto: Vice City"
        nextSlug = "resident-evil-requiem"
        nextTitle = "Resident Evil Requiem"
    },
    @{
        id = 16
        slug = "resident-evil-requiem"
        title = "Resident Evil Requiem"
        shortTitle = "Resident Evil Requiem"
        genre = "Survival Horror / Action"
        genreTags = @("Action", "Survival Horror", "Survival")
        platforms = @("PC", "PS5", "Xbox Series X/S")
        releaseStatus = "2026"
        releaseYear = "2026"
        isUpcoming = $false
        developer = "Capcom"
        publisher = "Capcom"
        engine = "RE Engine"
        sampleRating = 4.7
        samplePopularity = 90
        coverImage = "../images/resident-evil-requiem.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=bJc5_2m3XQo"
        youtubeId = "bJc5_2m3XQo"
        tagline = "Enter the next nightmare of biohazard terror and survival dread."
        description = "The next chapter in Capcom’s flagship survival horror series, combining claustrophobic atmospheric dread, resource management, and high-tension biohazard combat powered by the latest iteration of the RE Engine."
        features = @(
            "State-of-the-art RE Engine photorealism and spatial 3D audio terrifying atmosphere.",
            "Classic inventory puzzle management with limited ammunition and herb crafting.",
            "Terrifying bio-organic weapons with stalker AI mechanics keeping you on edge.",
            "Adaptive horror combat balancing fight-or-flight resource conservation."
        )
        prevSlug = "ac-mirage"
        prevTitle = "Assassin’s Creed Mirage"
        nextSlug = "cs2"
        nextTitle = "Counter-Strike 2"
    },
    @{
        id = 17
        slug = "cs2"
        title = "Counter-Strike 2"
        shortTitle = "Counter-Strike 2"
        genre = "Tactical First-Person Shooter / FPS"
        genreTags = @("FPS", "Tactical First-Person Shooter", "Shooter")
        platforms = @("PC")
        releaseStatus = "2023"
        releaseYear = "2023"
        isUpcoming = $false
        developer = "Valve"
        publisher = "Valve"
        engine = "Source 2"
        sampleRating = 4.6
        samplePopularity = 96
        coverImage = "../images/cs2.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=c80dVYcL69E"
        youtubeId = "c80dVYcL69E"
        tagline = "The world's premier competitive tactical first-person shooter."
        description = "Built on the Source 2 engine, Counter-Strike 2 marks the largest technical leap in Counter-Strike’s history with responsive volumetric smoke physics, sub-tick server architecture, and upgraded competitive maps."
        features = @(
            "Volumetric smokes that interact with lighting and can be temporarily cleared with grenades and bullets.",
            "Sub-tick update rate ensuring movement and shooting are equally responsive at any frame rate.",
            "Complete overhaul of iconic maps (Dust II, Mirage, Inferno, Nuke) with Source 2 PBR materials.",
            "Global CS Rating system and Premier mode with map pick/ban competitive phases."
        )
        prevSlug = "resident-evil-requiem"
        prevTitle = "Resident Evil Requiem"
        nextSlug = "project-igi"
        nextTitle = "Project IGI"
    },
    @{
        id = 18
        slug = "project-igi"
        title = "Project IGI"
        shortTitle = "Project IGI"
        genre = "Tactical First-Person Shooter / Stealth"
        genreTags = @("FPS", "Stealth", "Tactical First-Person Shooter", "Shooter")
        platforms = @("PC")
        releaseStatus = "2000"
        releaseYear = "2000"
        isUpcoming = $false
        developer = "Innerloop Studios"
        publisher = "Eidos Interactive"
        engine = "Innerloop In-House Engine"
        sampleRating = 4.5
        samplePopularity = 83
        coverImage = "../images/project-igi.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=7fB6U8t2u1c"
        youtubeId = "7fB6U8t2u1c"
        tagline = "I'm Going In. Solo tactical infiltration behind enemy lines."
        description = "A pioneering tactical stealth first-person shooter where operative David Jones infiltrates heavily guarded military bases using satellite map recon, security camera hacking, and precision weaponry. A nostalgic masterpiece of PC tactical gaming."
        features = @(
            "Expansive military installations with freedom of tactical entry and sniper vantage points.",
            "Digital PDA satellite map for recon, enemy surveillance, and camera grid tracking.",
            "Authentic military arsenal including MP5SD, Dragunov sniper, Spas-12, and Jackhammer.",
            "Zero mid-mission checkpoints delivering an unforgiving tactical survival experience."
        )
        prevSlug = "cs2"
        prevTitle = "Counter-Strike 2"
        nextSlug = "minecraft"
        nextTitle = "Minecraft"
    },
    @{
        id = 19
        slug = "minecraft"
        title = "Minecraft"
        shortTitle = "Minecraft"
        genre = "Sandbox / Survival / Adventure"
        genreTags = @("Sandbox", "Survival", "Adventure")
        platforms = @("PC", "PS4", "PS5", "Xbox One", "Xbox Series X/S", "Nintendo Switch", "Mobile")
        releaseStatus = "2011"
        releaseYear = "2011"
        isUpcoming = $false
        developer = "Mojang Studios"
        publisher = "Xbox Game Studios"
        engine = "Custom Voxel Engine"
        sampleRating = 4.9
        samplePopularity = 98
        coverImage = "../images/minecraft.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=MmB9b5njVbA"
        youtubeId = "MmB9b5njVbA"
        tagline = "Place blocks, discover infinite worlds, and build your imagination."
        description = "Explore infinite procedurally generated block worlds and build everything from the simplest of homes to the grandest of castles in Creative mode, or craft weapons and armor to fend off dangerous mobs in Survival mode."
        features = @(
            "Infinite procedurally generated biomes featuring mountains, deep dark caves, and nether dimensions.",
            "Redstone circuitry enabling complex automation, logic gates, and computing inside the game.",
            "Cooperative multiplayer survival with cross-play across PC, consoles, and mobile devices.",
            "Endless creative freedom: craft, farm, enchant, mine, and slay the Ender Dragon."
        )
        prevSlug = "project-igi"
        prevTitle = "Project IGI"
        nextSlug = "tekken-3"
        nextTitle = "Tekken 3"
    },
    @{
        id = 20
        slug = "tekken-3"
        title = "Tekken 3"
        shortTitle = "Tekken 3"
        genre = "Fighting Game"
        genreTags = @("Fighting Game", "Fighting")
        platforms = @("PlayStation", "Arcade")
        releaseStatus = "1997"
        releaseYear = "1997"
        isUpcoming = $false
        developer = "Namco"
        publisher = "Namco"
        engine = "Namco System 12"
        sampleRating = 4.8
        samplePopularity = 89
        coverImage = "../images/tekken-3.jpg"
        trailerUrl = "https://www.youtube.com/watch?v=I6p7qg9c2FE"
        youtubeId = "I6p7qg9c2FE"
        tagline = "Enter the King of Iron Fist Tournament 3 — The golden era of 3D martial arts."
        description = "One of the greatest fighting games of all time. Enter the third King of Iron Fist Tournament featuring Jin Kazama, Eddy Gordo, Hwoarang, Ling Xiaoyu, and true 3D sidestep martial arts combat that revolutionized the arcade and PlayStation era."
        features = @(
            "Pioneering 3D sidestepping and evasive martial arts footwork system.",
            "Iconic roster of 23 combatants each with genuine martial arts styles (Capoeira, Taekwondo, Mishima Karate).",
            "Beloved side modes including Tekken Force beat-'em-up and Tekken Ball beach volleyball.",
            "Crisp, fluid 60 FPS combat with legendary character FMV ending sequences."
        )
        prevSlug = "minecraft"
        prevTitle = "Minecraft"
        nextSlug = "gta-vi"
        nextTitle = "Grand Theft Auto VI"
    }
)

foreach ($g in $games) {
    $platformPills = ""
    foreach ($p in $g.platforms) {
        $platformPills += "<span class='px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-cyan-300 flex items-center gap-1.5'><i class='fa-solid fa-gamepad text-[10px] text-cyan-400'></i> $p</span>"
    }

    $genreBadges = ""
    foreach ($gt in $g.genreTags) {
        $genreBadges += "<span class='px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-medium'>#$gt</span>"
    }

    $featureItems = ""
    foreach ($f in $g.features) {
        $featureItems += "<li class='flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800'><i class='fa-solid fa-circle-check text-cyan-400 mt-1 shrink-0'></i><span class='text-xs sm:text-sm text-slate-300'>$f</span></li>"
    }

    $trailerSection = ""
    if ($g.youtubeId) {
        $trailerSection = @"
        <div class="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-rose-400 block"><i class="fa-brands fa-youtube mr-1"></i> Official Media</span>
              <h3 class="font-display font-bold text-xl text-white">Official Game Trailer</h3>
            </div>
            <a href="$($g.trailerUrl)" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition inline-flex items-center gap-2">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open on YouTube
            </a>
          </div>
          <div class="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
            <iframe 
              src="https://www.youtube-nocookie.com/embed/$($g.youtubeId)?rel=0&modestbranding=1" 
              title="$($g.title) Official Trailer" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen 
              class="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
"@
    } else {
        $trailerSection = @"
        <div class="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-amber-400 block"><i class="fa-solid fa-film mr-1"></i> Official Media</span>
              <h3 class="font-display font-bold text-xl text-white">Official Game Trailer Status</h3>
            </div>
            <span class="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">TBA Notice</span>
          </div>
          <div class="p-8 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-3">
            <div class="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 text-2xl">
              <i class="fa-solid fa-video-slash"></i>
            </div>
            <h4 class="font-display font-bold text-lg text-white">Trailer Announcement Pending</h4>
            <p class="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              No official cinematic or gameplay trailer link has been publicly broadcast for <strong>$($g.title)</strong> yet ($($g.releaseStatus)). This page will be updated immediately upon the publisher's official media reveal.
            </p>
          </div>
        </div>
"@
    }

    $statusClass = if ($g.isUpcoming) { "bg-amber-500/20 text-amber-300 border-amber-400/40" } else { "bg-cyan-500/15 text-cyan-300 border-cyan-500/30" }

    $html = @"
<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>$($g.title) — GameVerse Dedicated Webpage</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Font Awesome Free CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <!-- Google Fonts: Orbitron & Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Orbitron:wght@500;600;700;800;900&display=swap" rel="stylesheet">

  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            display: ['Orbitron', 'Inter', 'sans-serif'],
          },
          colors: {
            gv: {
              bg: '#070913',
              surface: '#0f1428',
              card: '#131a33',
              cyan: '#00f2fe',
              purple: '#9d4edd',
              pink: '#ff2a85',
              emerald: '#10b981',
              amber: '#f59e0b'
            }
          }
        }
      }
    };
  </script>

  <style>
    body {
      background-color: #070913;
      background-image:
        radial-gradient(circle at 15% 15%, rgba(0, 242, 254, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 85% 25%, rgba(157, 78, 221, 0.1) 0%, transparent 40%),
        radial-gradient(circle at 50% 80%, rgba(255, 42, 133, 0.05) 0%, transparent 50%);
      color: #f1f5f9;
      overflow-x: hidden;
    }
    .glass-panel {
      background: rgba(15, 20, 40, 0.82);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .neon-text-gradient {
      background: linear-gradient(90deg, #00f2fe 0%, #a855f7 52%, #ff2a85 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .neon-btn-primary {
      background: linear-gradient(135deg, #00c6ff 0%, #7c3aed 100%);
      box-shadow: 0 4px 20px -2px rgba(0, 242, 254, 0.38);
      transition: all 0.22s ease;
    }
    .neon-btn-primary:hover {
      box-shadow: 0 6px 26px 0px rgba(0, 242, 254, 0.58);
      transform: translateY(-1px);
    }
  </style>
</head>
<body class="min-h-screen flex flex-col selection:bg-cyan-500 selection:text-slate-950">

  <!-- TOP BANNER -->
  <div class="bg-gradient-to-r from-slate-950 via-indigo-950/90 to-slate-950 border-b border-cyan-500/20 text-xs py-2 px-4">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-300">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
          <i class="fa-solid fa-graduation-cap"></i> Academic SE &amp; System Design Project
        </span>
        <span class="hidden sm:inline text-slate-400">
          Game #$($g.id) of 20 &bull; Dedicated Webpage
        </span>
      </div>
      <div class="flex items-center gap-3">
        <a href="../index.html" class="text-[11px] text-cyan-300 hover:text-white flex items-center gap-1 transition">
          <i class="fa-solid fa-arrow-left"></i> Return to Main GameVerse Portal
        </a>
      </div>
    </div>
  </div>

  <!-- NAVIGATION HEADER -->
  <header class="sticky top-0 z-40 glass-panel border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
      <a href="../index.html" class="flex items-center gap-3 text-left group">
        <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-purple-600 to-pink-500 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition">
          <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <i class="fa-solid fa-gamepad text-xl text-cyan-400 group-hover:scale-110 transition"></i>
          </div>
        </div>
        <div>
          <span class="font-display font-extrabold text-xl sm:text-2xl tracking-wider text-white block leading-none">
            GAME<span class="neon-text-gradient">VERSE</span>
          </span>
          <span class="text-[10px] uppercase tracking-widest text-slate-400 block mt-1">
            Dedicated Game Explorer
          </span>
        </div>
      </a>

      <!-- Quick Nav Links -->
      <nav class="hidden md:flex items-center gap-2">
        <a href="../index.html" class="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1.5">
          <i class="fa-solid fa-house text-cyan-400"></i> Home
        </a>
        <a href="../index.html#explore" class="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1.5">
          <i class="fa-solid fa-compass text-cyan-400"></i> All 20 Games
        </a>
        <a href="../index.html#compare" class="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1.5">
          <i class="fa-solid fa-chart-column text-purple-400"></i> Compare
        </a>
        <a href="../index.html#favorites" class="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1.5">
          <i class="fa-solid fa-heart text-pink-400"></i> Favorites
        </a>
      </nav>

      <!-- User Auth Profile & Favorite State -->
      <div class="flex items-center gap-2.5">
        <div id="auth-header-container" class="flex items-center gap-2">
          <!-- Populated dynamically via JS -->
        </div>
        <button id="btn-page-favorite" onclick="toggleCurrentFavorite()" class="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 hover:text-pink-400 transition flex items-center gap-1.5">
          <i id="btn-page-favorite-icon" class="fa-regular fa-heart"></i>
          <span id="btn-page-favorite-text" class="hidden sm:inline">Favorite</span>
        </button>
      </div>
    </div>
  </header>

  <!-- MAIN WRAPPER -->
  <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">

    <!-- BREADCRUMBS & PREV/NEXT QUICK NAV -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <nav class="flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
        <a href="../index.html" class="hover:text-cyan-400 transition"><i class="fa-solid fa-house mr-1"></i>Home</a>
        <span>/</span>
        <a href="../index.html" class="hover:text-cyan-400 transition">Explore Games</a>
        <span>/</span>
        <span class="text-white font-medium">$($g.shortTitle)</span>
      </nav>

      <div class="flex items-center gap-2">
        <a href="$($g.prevSlug).html" class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs transition flex items-center gap-1.5" title="Previous: $($g.prevTitle)">
          <i class="fa-solid fa-chevron-left text-[10px]"></i> <span class="hidden sm:inline">Prev:</span> $($g.prevTitle)
        </a>
        <a href="$($g.nextSlug).html" class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs transition flex items-center gap-1.5" title="Next: $($g.nextTitle)">
          <span class="hidden sm:inline">Next:</span> $($g.nextTitle) <i class="fa-solid fa-chevron-right text-[10px]"></i>
        </a>
      </div>
    </div>

    <!-- HERO SECTION -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Cover Artwork Container (Locked 16:10 Aspect Ratio) -->
      <div class="lg:col-span-5 space-y-4">
        <div class="relative aspect-[16/10] rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-2xl group">
          <img 
            id="game-cover-art"
            src="$($g.coverImage)" 
            alt="$($g.title) Cover" 
            onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 260\'><rect width=\'400\' height=\'260\' fill=\'%230f172a\'/><text x=\'200\' y=\'130\' fill=\'%2300f2fe\' font-family=\'sans-serif\' font-size=\'18\' font-weight=\'bold\' text-anchor=\'middle\'>$($g.shortTitle)</text></svg>';" 
            class="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          />
          <span class="absolute top-4 left-4 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border backdrop-blur-md $statusClass">
            $($g.releaseStatus)
          </span>
          <span class="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs font-bold text-slate-300">
            Game #$($g.id) of 20
          </span>
        </div>

        <!-- Telemetry Badges Card -->
        <div class="glass-panel rounded-2xl p-4 border border-white/10 grid grid-cols-2 gap-3">
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span class="text-[11px] text-slate-400 block"><i class="fa-solid fa-star text-amber-400 mr-1"></i> Sample Rating</span>
            <div class="font-display font-bold text-2xl text-amber-400 mt-1">$($g.sampleRating.ToString("F1")) <span class="text-xs text-slate-500">/ 5.0</span></div>
            <span class="text-[10px] text-slate-500">Illustrative Demo Data</span>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span class="text-[11px] text-slate-400 block"><i class="fa-solid fa-bolt text-cyan-400 mr-1"></i> Popularity Index</span>
            <div class="font-display font-bold text-2xl text-cyan-400 mt-1">$($g.samplePopularity)% <span class="text-xs text-slate-500">Score</span></div>
            <span class="text-[10px] text-slate-500">Academic Benchmark</span>
          </div>
        </div>
      </div>

      <!-- Hero Information Panel -->
      <div class="lg:col-span-7 space-y-6">
        <div class="space-y-3">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
              $($g.genre)
            </span>
            $genreBadges
          </div>
          <h1 class="font-display font-extrabold text-3xl sm:text-4xl xl:text-5xl text-white tracking-tight leading-tight">
            $($g.title)
          </h1>
          <p class="text-sm sm:text-base text-cyan-300/90 font-medium italic">
            "$($g.tagline)"
          </p>
        </div>

        <!-- Synopsis -->
        <div class="glass-panel rounded-3xl p-6 border border-white/10 space-y-3">
          <h2 class="font-display font-bold text-lg text-white flex items-center gap-2">
            <i class="fa-solid fa-book-open text-cyan-400"></i> Story Synopsis &amp; Overview
          </h2>
          <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
            $($g.description)
          </p>
        </div>

        <!-- Action Bar -->
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <button onclick="toggleCurrentFavorite()" class="neon-btn-primary px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 inline-flex items-center gap-2">
            <i id="btn-hero-favorite-icon" class="fa-regular fa-heart"></i>
            <span id="btn-hero-favorite-text">Save to Favorites</span>
          </button>
          <a href="../index.html" class="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition inline-flex items-center gap-2">
            <i class="fa-solid fa-compass"></i> Explore All 20 Games
          </a>
        </div>
      </div>
    </div>

    <!-- SPECIFICATIONS & HARDWARE COMPATIBILITY MATRIX -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Specifications Table -->
      <div class="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
        <h3 class="font-display font-bold text-xl text-white flex items-center gap-2">
          <i class="fa-solid fa-microchip text-purple-400"></i> Technical Specifications &amp; Metadata
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs sm:text-sm border-collapse">
            <tbody class="divide-y divide-slate-800">
              <tr>
                <th class="py-3 px-3 text-slate-400 font-medium">Developer</th>
                <td class="py-3 px-3 text-white font-semibold">$($g.developer)</td>
              </tr>
              <tr>
                <th class="py-3 px-3 text-slate-400 font-medium">Publisher</th>
                <td class="py-3 px-3 text-slate-200">$($g.publisher)</td>
              </tr>
              <tr>
                <th class="py-3 px-3 text-slate-400 font-medium">Game Engine</th>
                <td class="py-3 px-3 text-cyan-300 font-mono">$($g.engine)</td>
              </tr>
              <tr>
                <th class="py-3 px-3 text-slate-400 font-medium">Release Year / Status</th>
                <td class="py-3 px-3 text-white">$($g.releaseYear)</td>
              </tr>
              <tr>
                <th class="py-3 px-3 text-slate-400 font-medium">Official Genre</th>
                <td class="py-3 px-3 text-purple-300 font-medium">$($g.genre)</td>
              </tr>
              <tr>
                <th class="py-3 px-3 text-slate-400 font-medium">Catalog Index</th>
                <td class="py-3 px-3 text-slate-400 font-mono">GameVerse #$($g.id.ToString("D2"))</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pt-4 border-t border-slate-800">
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Supported Platforms:</span>
          <div class="flex flex-wrap gap-2">
            $platformPills
          </div>
        </div>
      </div>

      <!-- Key Features List -->
      <div class="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
        <h3 class="font-display font-bold text-xl text-white flex items-center gap-2">
          <i class="fa-solid fa-gamepad text-cyan-400"></i> Key Features &amp; Mechanics
        </h3>
        <ul class="space-y-2.5">
          $featureItems
        </ul>
      </div>
    </div>

    <!-- OFFICIAL TRAILER / MEDIA EMBED -->
    $trailerSection

    <!-- BOTTOM PREV / NEXT NAVIGATION BAR -->
    <div class="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <a href="$($g.prevSlug).html" class="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-left border border-slate-800 transition group">
        <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:-translate-x-1 transition">
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div>
          <span class="text-[10px] uppercase tracking-wider text-slate-400 block">Previous Game</span>
          <span class="font-semibold text-sm text-white group-hover:text-cyan-400 transition">$($g.prevTitle)</span>
        </div>
      </a>

      <a href="../index.html" class="px-5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition text-center">
        <i class="fa-solid fa-grid-2 mr-1"></i> Catalog Grid (20 Games)
      </a>

      <a href="$($g.nextSlug).html" class="flex items-center justify-end gap-3 p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-right border border-slate-800 transition group">
        <div>
          <span class="text-[10px] uppercase tracking-wider text-slate-400 block">Next Game</span>
          <span class="font-semibold text-sm text-white group-hover:text-cyan-400 transition">$($g.nextTitle)</span>
        </div>
        <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:translate-x-1 transition">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </a>
    </div>

  </main>

  <!-- LOGIN MODAL -->
  <div id="login-modal" class="fixed inset-0 z-50 hidden bg-slate-950/85 backdrop-blur-md overflow-y-auto p-4 flex items-center justify-center" onclick="if(event.target === this) closeLoginModal()">
    <div class="glass-panel rounded-3xl max-w-md w-full p-6 sm:p-8 border border-cyan-500/40 shadow-2xl space-y-6 my-auto">
      <div class="flex items-start justify-between gap-4">
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-cyan-400 block mb-1">Simple Sign In</span>
          <h3 class="font-display font-bold text-2xl text-white">Enter GameVerse</h3>
        </div>
        <button onclick="closeLoginModal()" class="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 flex items-center justify-center">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <p class="text-xs text-slate-300">
        Enter your username or gamer name. No password required — your profile and favorites sync directly to the Vercel/MongoDB database with zero-downtime offline support!
      </p>
      <form onsubmit="handleLoginSubmit(event)" class="space-y-4">
        <div>
          <label for="username-input" class="block text-xs font-semibold text-slate-300 mb-1.5">Username or Gamer Name</label>
          <div class="relative">
            <i class="fa-solid fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input 
              type="text" 
              id="username-input" 
              placeholder="e.g. Alex, NeonPlayer, Satyasaiganesh" 
              required 
              minlength="2"
              class="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>
        </div>
        <button type="submit" class="w-full neon-btn-primary py-3 rounded-xl font-bold text-sm text-slate-950 flex items-center justify-center gap-2">
          <i class="fa-solid fa-right-to-bracket"></i> Sign In &amp; Sync Profile
        </button>
      </form>
    </div>
  </div>

  <!-- TOAST CONTAINER -->
  <div id="toast-container" class="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"></div>

  <!-- FOOTER -->
  <footer class="bg-slate-950 border-t border-white/10 mt-16 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400 space-y-2">
      <p>&copy; 2026 GameVerse Academic Project &bull; Dedicated Page for <strong>$($g.title)</strong></p>
      <p>Trademarks and game titles belong to their respective publishers. Built for educational demonstration.</p>
    </div>
  </footer>

  <script>
    const CURRENT_GAME_ID = $($g.id);
    const FAVORITES_KEY = "gameverse_favorites_v1";
    const USER_KEY = "gameverse_user";

    function getCurrentUser() {
      try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    }

    function getFavorites() {
      try {
        const raw = localStorage.getItem(FAVORITES_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    }

    function isCurrentGameFavorite() {
      const favs = getFavorites();
      return favs.includes(CURRENT_GAME_ID);
    }

    function updateFavoriteButtons() {
      const isFav = isCurrentGameFavorite();
      const headerIcon = document.getElementById("btn-page-favorite-icon");
      const heroIcon = document.getElementById("btn-hero-favorite-icon");
      const heroText = document.getElementById("btn-hero-favorite-text");

      if (headerIcon) {
        headerIcon.className = isFav ? "fa-solid fa-heart text-pink-400" : "fa-regular fa-heart";
      }
      if (heroIcon) {
        heroIcon.className = isFav ? "fa-solid fa-heart text-pink-400" : "fa-regular fa-heart";
      }
      if (heroText) {
        heroText.textContent = isFav ? "Saved in Favorites" : "Save to Favorites";
      }
    }

    function toggleCurrentFavorite() {
      let favs = getFavorites();
      const idx = favs.indexOf(CURRENT_GAME_ID);
      const isRemoving = idx > -1;

      if (isRemoving) {
        favs.splice(idx, 1);
        showToast("Removed from Favorites", "info");
      } else {
        favs.push(CURRENT_GAME_ID);
        showToast("Added to Favorites!", "success");
      }

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
      updateFavoriteButtons();

      // Sync with MongoDB backend if user is logged in
      const user = getCurrentUser();
      if (user && user.username) {
        fetch("/api/auth", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username, favorites: favs })
        }).catch(() => {});
      }
    }

    function renderAuthHeader() {
      const container = document.getElementById("auth-header-container");
      if (!container) return;
      const user = getCurrentUser();

      if (user && user.username) {
        container.innerHTML = '<div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs">' +
          '<i class="fa-solid fa-circle-user text-cyan-400"></i>' +
          '<span class="font-semibold text-white truncate max-w-[100px]">' + (user.displayName || user.username) + '</span>' +
          '<button onclick="handleLogout()" class="text-slate-400 hover:text-rose-400 ml-1 transition" title="Sign Out">' +
          '<i class="fa-solid fa-arrow-right-from-bracket"></i>' +
          '</button>' +
          '</div>';
      } else {
        container.innerHTML = '<button onclick="openLoginModal()" class="px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition flex items-center gap-1.5">' +
          '<i class="fa-solid fa-user text-[11px]"></i> <span>Sign In</span>' +
          '</button>';
      }
    }

    function openLoginModal() {
      const modal = document.getElementById("login-modal");
      if (modal) modal.classList.remove("hidden");
    }

    function closeLoginModal() {
      const modal = document.getElementById("login-modal");
      if (modal) modal.classList.add("hidden");
    }

    async function handleLoginSubmit(event) {
      event.preventDefault();
      const input = document.getElementById("username-input");
      const username = input ? input.value.trim() : "";
      if (!username) return;

      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, name: username })
        });
        const data = await res.json();
        const userObj = data.user || { username, displayName: username };
        localStorage.setItem(USER_KEY, JSON.stringify(userObj));
        closeLoginModal();
        renderAuthHeader();
        showToast("Welcome, " + (userObj.displayName || username) + "! Signed in successfully.", "success");
      } catch {
        // Offline fallback
        const userObj = { username, displayName: username };
        localStorage.setItem(USER_KEY, JSON.stringify(userObj));
        closeLoginModal();
        renderAuthHeader();
        showToast("Signed in locally as " + username + " (Offline Mode)", "info");
      }
    }

    function handleLogout() {
      localStorage.removeItem(USER_KEY);
      renderAuthHeader();
      showToast("Signed out of GameVerse", "info");
    }

    function showToast(message, type = "info") {
      const container = document.getElementById("toast-container");
      if (!container) return;
      const colors = {
        success: "border-emerald-400/50 bg-slate-900/95 text-emerald-200",
        info: "border-cyan-400/50 bg-slate-900/95 text-cyan-200"
      };
      const toast = document.createElement("div");
      toast.className = "p-3 rounded-xl border backdrop-blur-md shadow-xl text-xs font-medium flex items-center gap-2 transition duration-300 " + (colors[type] || colors.info);
      toast.innerHTML = '<i class="fa-solid fa-circle-info"></i><span>' + message + '</span>';
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
      }, 2500);
    }

    window.addEventListener("DOMContentLoaded", () => {
      renderAuthHeader();
      updateFavoriteButtons();
    });
  </script>
</body>
</html>
"@

    $filePath = Join-Path $gamesDir "$($g.slug).html"
    Set-Content -Path $filePath -Value $html -Encoding UTF8
    Write-Output "Created: $($g.slug).html"
}

Write-Output "Successfully generated all 20 dedicated game web pages!"
