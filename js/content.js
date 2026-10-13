/* Editorial content for the guide. Photo keys refer to window.PX in data.js. Edit freely. */
window.GUIDE = {

  hero: [
    { key: 'prom_beach', pos: '50% 60%', eyebrow: 'The Seafront', title: 'Where the Bay of Bengal<br>meets a little corner of France', text: 'Sunrise walks on the Promenade, wide-open skies and the easiest, most walkable coastline in South India.', cta: ['Explore the seafront', '#explore?cat=Beaches'] },
    { key: 'yellow1', pos: '50% 40%', eyebrow: 'White Town', title: 'Yellow villas, bougainvillea<br>and quiet colonial streets', text: 'A grid of French-era lanes best explored on foot or by bicycle, with cafes, boutiques and heritage stays at every corner.', cta: ['Walk White Town', '#walk'] },
    { key: 'mat1', pos: '50% 50%', eyebrow: 'Auroville', title: 'A golden sphere in a<br>forest of ideas', text: 'Matrimandir, green trails and a township built around human unity, thirty minutes from the city.', cta: ['Visit Auroville', '#auroville'] },
    { key: 'church', pos: '50% 35%', eyebrow: 'Faith & Heritage', title: 'Temples, basilicas and<br>centuries of coexistence', text: 'Gopurams and Gothic spires share the same streets. Start early, dress modestly and linger.', cta: ['See sacred places', '#explore?cat=Temples'] },
    { key: 'aerial_beach', pos: '50% 50%', eyebrow: 'Beaches & Backwaters', title: 'Surf at dawn, a boat to<br>Paradise by morning', text: 'From Serenity and Eden to Paradise Beach, there is a stretch of sand for every kind of day.', cta: ['Find a beach', '#explore?cat=Beaches'] },
  ],

  facts: [
    ['Distance', '~150 km', 'from Chennai, about 3 to 3.5 hours by road'],
    ['Best season', 'Nov – Feb', 'cool, dry and festive'],
    ['Languages', 'Tamil · English · French', 'street names in French and Tamil'],
    ['Ideal stay', '2 – 3 days', 'town, Auroville and one beach day'],
  ],

  interests: [
    { title: 'Beaches & Seafront', cat: 'Beaches', key: 'sunset_boat', blurb: 'Promenade, Eden, Serenity and Paradise' },
    { title: 'White Town & Heritage', cat: 'Heritage & Museums', key: 'colour_street', blurb: 'Colonial streets, museums and markets' },
    { title: 'Temples & Churches', cat: 'Temples', key: 'gopuram_col', blurb: 'Gopurams, basilicas and a mosque' },
    { title: 'Auroville', section: 'auroville', key: 'mat5', blurb: 'Matrimandir, bird park and sound garden' },
    { title: 'Cafes & Food', section: 'eat', key: 'croissant2', blurb: 'Croissants, seafood, biryani and dosa' },
    { title: 'Stay', section: 'stay', key: 'blue_hotel', blurb: 'Heritage mansions to beach resorts' },
  ],

  featured: [
    { name: 'White Town (French Quarter)', kicker: 'Heritage', line: 'Mustard-yellow villas, shuttered windows and bougainvillea over every wall. Go at 7 AM when the lanes are empty.', key: 'yellow_walk' },
    { name: 'Promenade Beach', kicker: 'Seafront', line: 'The city\'s living room. Watch sunrise from the Gandhi statue and stay for tea at a sea-facing stall.', key: 'prom_beach' },
    { name: 'Auroville Matrimandir', kicker: 'Auroville', line: 'The golden sphere at the heart of Auroville. Reach the Visitors Centre early and book the inner chamber slot ahead.', key: 'mat1' },
    { name: 'Paradise Beach', kicker: 'Boat trip', line: 'A short boat ride from Chunnambar across the backwaters to a soft, sandy cove.', key: 'aerial_beach' },
    { name: 'Manakula Vinayagar Temple', kicker: 'Temple', line: 'A lively, colourful Ganesha temple at the centre of town. Arrive between 6 and 8 AM.', key: 'local_manakula' },
    { name: 'Sacred Heart Basilica', kicker: 'Church', line: 'Gothic arches and stained glass. Morning light is at its most beautiful.', key: 'colour_street' },
    { name: 'Eden Beach (Blue Flag)', kicker: 'Beach', line: 'Blue Flag-certified sand for a cleaner, calmer beach day. Swim only in marked areas.', key: 'aerial_beach2' },
    { name: 'Puducherry Museum', kicker: 'Museum', line: 'French-era furniture, sculpture and Arikamedu finds, in a cool and shaded building.', key: 'hotel_facade' },
  ],

  walk: {
    title: 'A morning in White Town',
    intro: 'A self-guided loop of roughly three hours. Start at sunrise, finish with breakfast.',
    stops: [
      { t: '6:00 AM', name: 'Promenade Beach & Gandhi statue', text: 'Begin on the seafront as the light turns gold. The promenade is quiet and cool.', key: 'prom_beach' },
      { t: '6:45 AM', name: 'French War Memorial & Old Lighthouse area', text: 'Walk south along Goubert Avenue past the memorial and the old lighthouse area.', key: 'lighthouse' },
      { t: '7:30 AM', name: 'Raj Nivas & Bharathi Park', text: 'The colonial governor\'s residence (view from outside) and the park around the Aayi Mandapam.', key: 'yellow1' },
      { t: '8:15 AM', name: 'Manakula Vinayagar Temple', text: 'Short queues before 8 AM. Remove footwear and dress modestly.', key: 'local_manakula' },
      { t: '9:00 AM', name: 'Our Lady of Angels & the Cathedral', text: 'Two of the best-known churches, a short walk apart. Visit outside service times.', key: 'church' },
      { t: '10:00 AM', name: 'Tamil Quarter streets', text: 'Cross the canal for traditional houses with tiled roofs, painted doors and raised verandas.', key: 'old_town' },
      { t: '11:00 AM', name: 'Breakfast or coffee in White Town', text: 'End with croissants, filter coffee or a long brunch in a courtyard cafe.', key: 'cafe2' },
    ],
  },

  auroville: {
    title: 'Auroville',
    text: 'An experimental township founded in 1968, about 30 to 45 minutes from the city. Start at the Visitors Centre, take the walk to the Matrimandir View Point, and plan an afternoon among its green lanes, cafes and craft shops.',
    tips: [
      ['Start early', 'Reach the Visitors Centre before 10 AM for passes and maps.'],
      ['Matrimandir', 'The inner chamber requires an advance slot, silence and a quiet frame of mind.'],
      ['Getting there', 'Rent a scooter or take an auto. A few local buses also stop near the Visitors Centre.'],
    ],
  },

  food: [
    { dish: 'South Indian Breakfast', text: 'Idli, dosa, vada and filter coffee, served hot and fast.', key: 'dosa', q: 'Veg' },
    { dish: 'Fresh Seafood', text: 'Catch of the day, grilled or in a coastal curry.', key: 'seafood', q: 'Non-Veg' },
    { dish: 'Biryani & Meals', text: 'Hearty non-veg meals and biryani at local favourites.', key: 'biryani', q: 'Non-Veg' },
    { dish: 'French Bakery', text: 'Croissants, baguettes, quiches and gelato.', key: 'croissant', q: 'Cafes & Bakeries' },
    { dish: 'Banana-leaf Lunch', text: 'A traditional vegetarian meal with rice, sambar and sides.', key: 'banana_leaf', q: 'Veg' },
    { dish: 'Cafe Culture', text: 'White Town courtyards, garden cafes and seafront coffee.', key: 'cafe2', q: 'Cafes & Bakeries' },
  ],

  itineraries: [
    { id: '1d', name: '1 Day', tag: 'Essential Puducherry', key: 'yellow_walk', note: 'The best of town in a single day.',
      days: [
        ['Morning', ['Sunrise at Promenade Beach', 'Breakfast at Baker Street or Surguru Spot', 'Manakula Vinayagar Temple and White Town walk']],
        ['Afternoon', ['Lunch at Pondicherry Kamatchi or Kailash Parbat', 'Puducherry Museum or Bharathi Park']],
        ['Evening', ['Coffee at Starbucks White Town', 'Rock Beach sunset and a seafood dinner']],
      ],
      picks: ['Promenade Beach', 'Baker Street', 'Manakula Vinayagar Temple', 'White Town (French Quarter)', 'Pondicherry Kamatchi (White Town)', 'Puducherry Museum', 'Rock Beach'] },
    { id: '2d', name: '2 Days', tag: 'Town + Auroville', key: 'mat1', note: 'Heritage on day one, Auroville on day two.',
      days: [
        ['Day 1 · Town', ['Sunrise shoot on the promenade', 'Temples on MG Road and Sacred Heart Basilica', 'Cafe hopping in White Town', 'Evening at a resto-pub']],
        ['Day 2 · Auroville', ['Rent a scooter early', 'Visitors Centre, then Matrimandir View Point', 'SVARAM Sound Garden or Bird Park', 'Pyramid Temple at dusk']],
      ],
      picks: ['Promenade Beach', 'Sacred Heart Basilica', 'White Town (French Quarter)', 'Auroville Visitors Centre', 'Matrimandir View Point', 'SVARAM Sound Garden', 'Pyramid Temple (Karaneswar Nataraja)'] },
    { id: '3d', name: '3 Days', tag: 'Heritage, Auroville, Beaches', key: 'aerial_beach', note: 'The relaxed, complete version.',
      days: [
        ['Day 1 · Heritage', ['White Town, cathedral and museum', 'Dinner at Copper Kitchen']],
        ['Day 2 · Auroville', ['Matrimandir and forest cycling', 'Auroville Bakery lunch']],
        ['Day 3 · Beaches & Fun', ['Eden Beach at sunrise', 'Boat to Paradise Beach', 'Providence Mall and a PVR movie']],
      ],
      picks: ['White Town (French Quarter)', 'Immaculate Conception Cathedral', 'Puducherry Museum', 'Copper Kitchen', 'Auroville Matrimandir', 'Auroville Bakery', 'Eden Beach (Blue Flag)', 'Paradise Beach'] },
    { id: 'budget', name: 'Budget Day', tag: '₹700 – 1,500 per person', key: 'street_autos', note: 'Estimate excludes shopping.',
      days: [
        ['7:00 AM', ['Sunrise at Promenade Beach']],
        ['8:30 AM', ['Breakfast at a local veg restaurant or bakery']],
        ['10:00 AM', ['Manakula Vinayagar Temple and White Town walk']],
        ['12:30 PM', ['Lunch on Mission Street or Anna Salai']],
        ['3:00 PM', ['Providence Mall or a cafe']],
        ['5:00 PM', ['Sunset walk and snacks']],
      ],
      picks: ['Promenade Beach', 'Minakshi Veg Restaurant', 'Manakula Vinayagar Temple', 'Mission Street', 'Providence Mall'] },
    { id: 'cafes', name: 'Beach & Cafes', tag: '₹1,000 – 2,500 per person', key: 'cafe2', note: 'Transport, food and shopping vary.',
      days: [
        ['6:00 AM', ['Serenity Beach sunrise']],
        ['8:30 AM', ['Breakfast and coffee']],
        ['10:00 AM', ['White Town photo walk']],
        ['12:30 PM', ['Lunch in the French Quarter']],
        ['3:00 PM', ['A second cafe or boutiques']],
        ['5:00 PM', ['Promenade Beach walk']],
      ],
      picks: ['Serenity Beach', 'Baker Street', 'White Town (French Quarter)', 'La Maison Rose', 'Promenade Beach'] },
    { id: 'paradise', name: 'Paradise Day', tag: '₹1,500 – 3,500 per person', key: 'backwater', note: 'Boat services depend on the weather.',
      days: [
        ['7:00 AM', ['Breakfast in town']],
        ['8:30 AM', ['Travel to Chunnambar Boat House']],
        ['Morning', ['Boat ride and Paradise Beach']],
        ['1:00 PM', ['Lunch after returning']],
        ['Evening', ['Promenade Beach and dinner']],
      ],
      picks: ['Chunnambar Boat House', 'Paradise Beach', 'Promenade Beach'] },
    { id: 'friends', name: 'Friends Weekend', tag: '₹3,000 – 7,000 per person', key: 'bar1', note: 'Assumes shared accommodation.',
      days: [
        ['Day 1', ['White Town, temples, cafes, shopping and Promenade Beach', 'Dinner and a suitable nightlife venue, then stay']],
        ['Day 2', ['Serenity Beach or Auroville', 'Lunch at a cafe', 'Optional Chunnambar, then return']],
      ],
      picks: ['White Town (French Quarter)', 'Promenade Beach', 'Way To Fly Restopub', 'Serenity Beach', 'Auroville Visitors Centre'] },
  ],

  months: [
    ['Jan', 3, 'Best and driest. Cool mornings, calm sea.'],
    ['Feb', 3, 'Excellent for beaches and Auroville.'],
    ['Mar', 2, 'Warming up. Best early in the day.'],
    ['Apr', 1, 'Hot. Plan mornings and evenings.'],
    ['May', 0, 'Hottest. Only if you stay by the sea.'],
    ['Jun', 1, 'Hot with a sea breeze.'],
    ['Jul', 1, 'Warm and humid with showers.'],
    ['Aug', 1, 'Humid, occasional rain.'],
    ['Sep', 2, 'Pleasant, some rain.'],
    ['Oct', 2, 'Northeast monsoon begins. Rain is possible.'],
    ['Nov', 2, 'Rainy spells. Check the forecast.'],
    ['Dec', 3, 'Cooler and festive, though rain is possible.'],
  ],
  monthLabels: ['Avoid', 'Fair', 'Good', 'Best'],

  events: [
    { mo: 1, d: 'Early Jan', t: 'International Yoga Festival', tag: 'Wellness', x: 'A week of yoga, wellness and cultural events by the sea.' },
    { mo: 1, d: 'Mid Jan', t: 'Pongal', tag: 'Festival', x: 'The harvest festival lights up homes and streets across Tamil Nadu and Puducherry.' },
    { mo: 2, d: '21 Feb', t: 'The Mother\'s Birthday', tag: 'Ashram', x: 'A darshan day at the Sri Aurobindo Ashram. Expect queues near the Samadhi.' },
    { mo: 2, d: '28 Feb', t: 'Auroville Founding Day', tag: 'Auroville', x: 'Celebrations at the Matrimandir amphitheatre to mark the township\'s founding in 1968.' },
    { mo: 2, d: 'Feb – Mar', t: 'Masi Magam', tag: 'Festival', x: 'Temple deities are carried in procession to the sea at Vaithikuppam beach.' },
    { mo: 3, d: 'Feb – Mar', t: 'Maha Shivaratri', tag: 'Festival', x: 'Night-long worship at Shiva temples such as Vedapuriswarar and Thirukameswarar.' },
    { mo: 4, d: '14 Apr', t: 'Tamil New Year (Puthandu)', tag: 'Festival', x: 'Kolams at every doorstep and special prayers in temples across town.' },
    { mo: 7, d: '14 Jul', t: 'Bastille Day', tag: 'Heritage', x: 'A French national day ceremony at the war memorial, reflecting the town\'s colonial link.' },
    { mo: 8, d: '15 Aug', t: 'Sri Aurobindo\'s Birth Anniversary', tag: 'Ashram', x: 'One of the key darshan days at the Ashram. Expect crowds near the Samadhi.' },
    { mo: 8, d: 'Aug – Sep', t: 'Vinayaka Chaturthi', tag: 'Festival', x: 'Festival of Ganesha, with special celebrations at Manakula Vinayagar Temple.' },
    { mo: 9, d: 'Sep – Oct', t: 'Navaratri', tag: 'Festival', x: 'Nine nights of golu displays in homes and temples, ending with Dussehra.' },
    { mo: 10, d: 'Oct – Nov', t: 'Deepavali', tag: 'Festival', x: 'Oil baths at dawn, lamps, sweets and fireworks. Many shops close for a day or two.' },
    { mo: 11, d: '24 Nov', t: 'Siddhi Day', tag: 'Ashram', x: 'A darshan day at the Ashram marking the descent of the Overmind consciousness in 1926.' },
    { mo: 11, d: 'Nov – Dec', t: 'Karthigai Deepam', tag: 'Festival', x: 'Rows of oil lamps light up temples and houses at dusk.' },
    { mo: 12, d: '24 – 31 Dec', t: 'Christmas & New Year', tag: 'Celebration', x: 'Churches glow with midnight mass, and the seafront fills up for New Year.' },
  ],

  planTabs: {
    getting: {
      title: 'Getting there',
      facts: [['150 km', 'from Chennai'], ['3 – 3.5 hr', 'by road on ECR'], ['₹130 – 300', 'bus fare'], ['35 km', 'to Villupuram rail hub']],
      rows: [
        ['By road from Chennai', 'About 3 to 3.5 hours (150 km) along the East Coast Road. Buses run from Chennai CMBT, Koyambedu, to the Puducherry bus stand for roughly ₹130 to 300 (AC costs more).'],
        ['By rail', 'Puducherry has its own station. Villupuram Junction, about 35 km away, is the larger rail hub with more connections.'],
        ['By air', 'Puducherry has a small airport with limited services. Chennai International Airport is the usual gateway, around 150 km away.'],
        ['Cab or self-drive', 'Pre-booked cabs run Chennai–Puducherry. Self-drive rentals are available in town (see Getting Around).'],
      ],
    },
    around: {
      title: 'Getting around',
      head: ['Option', 'Typical cost', 'Notes'],
      rows: [
        ['Local bus', 'Under ₹20', 'Cheap, resident-focused. Some run to Auroville Visitors Centre.'],
        ['Auto-rickshaw', '₹50–100 short; ₹200–300 to Auroville Beach', 'Agree the fare first.'],
        ['Bicycle', '₹50–100 per day', 'Flat terrain, ideal for White Town.'],
        ['Scooter', '₹250–500 per day', 'Reviews mention about ₹500 at some shops. Fuel extra.'],
        ['Motorcycle', '₹600–1,000 per day', 'Coastal rides and longer trips.'],
        ['Car or taxi with driver', '₹1,500–2,500 half-day', 'Full-day priced per km plus driver allowance.'],
      ],
    },
    costs: {
      title: 'Cost estimates',
      tables: [
        { head: ['Stay type', 'Per room per night'], rows: [['Basic lodge or guesthouse', '₹800–1,800'], ['Standard hotel', '₹1,500–3,500'], ['Boutique or heritage hotel', '₹3,000–8,000+'], ['Resort or pool villa', '₹4,000–15,000+']] },
        { head: ['Transport', 'Estimate', 'Best use'], rows: [['Scooter', '₹400–800 per day', 'City and beaches'], ['Motorcycle', '₹700–1,500+ per day', 'Longer rides'], ['Hatchback self-drive', '₹1,500–3,000+ per day', 'Friends and family'], ['Sedan or larger car', '₹2,000–4,500+ per day', 'Long trips, luggage'], ['Auto-rickshaw', 'Ask the fare first', 'Short trips'], ['Taxi with driver', 'Request a quote', 'Outstation']] },
      ],
      note: 'Planning estimates, not live quotes. Weekends and festivals cost more.',
    },
    times: {
      title: 'Travel times',
      head: ['Destination', 'Approx. one-way time'],
      rows: [
        ['Promenade Beach, White Town, Manakula Vinayagar', '0–15 min'],
        ['Providence Mall', '10–20 min'],
        ['Serenity Beach', '15–30 min'],
        ['Chunnambar Boat House', '20–35 min'],
        ['Auroville visitor area', '30–45 min'],
        ['Cuddalore / Silver Beach', '45–75 min'],
        ['Chidambaram', '1.5–2 hr'],
        ['Pichavaram', '1.5–2.5 hr'],
        ['Mahabalipuram', '2.5–3.5 hr'],
      ],
    },
  },

  tips: [
    { t: 'Dress code', x: 'Cover shoulders and knees at temples, churches and the Ashram. Remove footwear where signs ask.', icon: 'shirt' },
    { t: 'Helmets & licence', x: 'Carry a valid licence and ID if renting two-wheelers. Photograph the vehicle first and wear a helmet.', icon: 'helmet' },
    { t: 'Swimming safety', x: 'Currents can be strong. Prefer supervised beaches, follow flags and local advice, and avoid swimming after dark.', icon: 'wave' },
    { t: 'Cash & UPI', x: 'UPI works at most shops and cafes. Carry some cash for autos, markets and small stalls.', icon: 'wallet' },
    { t: 'Heat & hydration', x: 'Plan outdoor sights for early morning or late afternoon. Carry water, a hat and sunscreen.', icon: 'sun' },
    { t: 'Photography etiquette', x: 'Ask before photographing people. Check signs at temples, the Ashram and Matrimandir.', icon: 'camera' },
  ],

  buzz: [
    { k: 'Auroville', t: 'Register before you walk to Matrimandir', x: 'Day visitors check in at the Visitors Centre first, then walk to the viewing point. Inner chamber slots need booking ahead.' },
    { k: 'Getting around', t: 'Agree the fare before you hop in', x: 'Autos and rickshaws are the easy way around White Town, and some drivers there speak a little French. Settle the price first or ask for the meter.' },
    { k: 'Timing', t: 'October to March is the sweet spot', x: 'Cool, dry weather makes walking pleasant. June to September brings heavy rain that can disrupt plans, and midday heat is strong most of the year.' },
    { k: 'Cafes', t: 'Go on a weekday morning', x: 'The popular French Quarter cafes and bakeries fill up at weekend brunch. Weekday mornings are calmer and better for photos.' },
    { k: 'Solo travel', t: 'Relaxed, but stay in lit areas at night', x: 'Many solo travellers describe Pondicherry as one of the easier places in India to explore alone. Normal precautions still apply after dark.' },
    { k: 'Ashrams & temples', t: 'Dress modestly and be quiet', x: 'Cover shoulders and knees, remove shoes where asked, keep voices low and check photography rules at each entrance.' },
    { k: 'Auroville cafes', t: 'Cafe-hop the Main Road', x: 'The Main Road and market area has the densest cluster: Marc\'s Cafe, The Greek Cafe, Bread & Chocolate and Tanto\'s wood-fired pizza. Cafe prices there run higher than in town.' },
    { k: 'Night sky', t: 'Try a stargazing session', x: 'Local astronomy groups run guided sessions outside the city lights, a good plan for an evening after the beach.' },
    { k: 'Slow travel', t: 'Walk White Town at sunrise', x: 'Yellow villas, bougainvillea and empty lanes are best before 8 AM. Finish with coffee and a croissant when the bakeries open.' },
  ],
  buzzLinks: [
    ['Instagram #pondicherry', 'https://www.instagram.com/explore/tags/pondicherry/'],
    ['Instagram #puducherry', 'https://www.instagram.com/explore/tags/puducherry/'],
    ['Instagram #auroville', 'https://www.instagram.com/explore/tags/auroville/'],
    ['Quora: Pondicherry travel', 'https://www.quora.com/search?q=Pondicherry%20travel%20tips'],
    ['Quora: Auroville', 'https://www.quora.com/search?q=Auroville%20visit']
  ],

  emergency: [['Emergency', '112'], ['Police', '100'], ['Ambulance', '108'], ['Fire', '101']],

  faq: [
    ['When is the best time to visit Puducherry?', 'November to February is the most comfortable, with cooler mornings and clear skies. October to December brings northeast-monsoon showers. April to June is hot, so plan for mornings and evenings.'],
    ['How many days do I need?', 'Two to three days covers the town, Auroville and one beach day. Add a day for backwaters or a day trip.'],
    ['Do I need to book Matrimandir in advance?', 'The View Point is free and open to all. Entry to the inner chamber needs an advance slot and silence. Check the Auroville website for current rules.'],
    ['Can I swim at Puducherry\'s beaches?', 'Currents can be strong. The city seafront is rocky and not for swimming. Choose supervised beaches such as Eden (Blue Flag), follow local advice and keep children close.'],
    ['What is the easiest way to get around?', 'Walk or cycle in White Town. Rent a scooter for beaches and Auroville, or use autos and cabs. Always agree auto fares in advance.'],
    ['Is alcohol available?', 'Yes. Licensed bars and resto-pubs are common. Carry ID and never drink and drive.'],
    ['Which airport should I fly into?', 'Puducherry has a small airport with limited flights. Most travellers fly into Chennai, around 150 km away.'],
    ['What should I wear at religious sites?', 'Modest clothing that covers shoulders and knees. Remove footwear where required, and keep quiet inside prayer areas.'],
  ],

  official: [
    ['Government of Puducherry', 'Regional tourism overview.', 'https://py.gov.in'],
    ['Puducherry Tourism', 'Tourism information and bookings.', 'https://pondytourism.py.gov.in'],
    ['Auroville', 'Visitor info and Matrimandir arrangements.', 'https://auroville.org'],
    ['Incredible India', 'Exploring Puducherry guide.', 'https://www.incredibleindia.gov.in/en/puducherry/puducherry/exploring-puducherry'],
  ],

  gallery: [
    ['prom_beach', 'Promenade Beach'], ['yellow1', 'White Town'], ['mat1', 'Matrimandir'], ['colour_street', 'Heritage streets'],
    ['sunset_boat', 'Sunset on the coast'], ['church', 'Our Lady of Angels'], ['lighthouse', 'Old lighthouse'], ['old_town', 'Tamil Quarter'],
    ['aerial_beach', 'Beach from above'], ['gopuram_col', 'Temple gopuram'], ['mat_discs', 'Matrimandir golden discs'], ['fishermen', 'Fishermen at sunset'],
    ['gate_bike', 'French quarter entrance'], ['mural', 'Seafront mural'], ['promenade_trees', 'Promenade'], ['twilight_boat', 'Twilight'],
  ],

  /* hash-name of the primary sections shown in the explorer */
  sections: [
    ['all', 'All', null],
    ['sights', 'Sights', ['Beaches', 'Temples', 'Churches & Mosques', 'Heritage & Museums', 'Parks & Nature']],
    ['auroville', 'Auroville', null],
    ['eat', 'Eat & Drink', ['Veg', 'Non-Veg', 'Cafes & Bakeries', 'Fast Food']],
    ['stay', 'Stay', null],
    ['fun', 'Shop & Nightlife', ['Malls & Shops', 'Cinemas', 'Nightlife']],
    ['ride', 'Rentals', ['Rentals', 'Car Rentals']],
    ['trips', 'Day Trips', null],
  ],
};
