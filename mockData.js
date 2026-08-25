// Realistic sample data for the platform. In production this would be
// served from Node.js + Express + MongoDB — see README for the mapping.

export const CITIES = [
  'Ludhiana', 'Chandigarh', 'Amritsar', 'Bathinda', 'Jalandhar',
  'Patiala', 'Mohali', 'Delhi',
]

export const CATEGORIES = [
  { id: 'smartphones', label: 'Smartphones', icon: 'Smartphone' },
  { id: 'laptops', label: 'Laptops', icon: 'Laptop' },
  { id: 'appliances', label: 'Home Appliances', icon: 'WashingMachine' },
  { id: 'electronics', label: 'Electronics', icon: 'Cpu' },
  { id: 'furniture', label: 'Furniture', icon: 'Armchair' },
  { id: 'vehicles', label: 'Vehicles / Bikes', icon: 'Bike' },
  { id: 'watches', label: 'Watches', icon: 'Watch' },
  { id: 'other', label: 'Other', icon: 'Wrench' },
]

const names = [
  'Harpreet Singh', 'Simran Kaur', 'Rajesh Kumar', 'Anita Sharma', 'Gurdeep Singh',
  'Priya Mehta', 'Manpreet Kaur', 'Vikram Chaudhary', 'Neha Verma', 'Sukhbir Singh',
  'Ramandeep Kaur', 'Arjun Malhotra', 'Kirandeep Singh', 'Pooja Bansal', 'Jaspreet Singh',
  'Deepak Aggarwal', 'Meera Kapoor', 'Amarjit Singh',
]

const specialties = {
  smartphones: 'Smartphone & Tablet Repair',
  laptops: 'Laptop & PC Repair',
  appliances: 'Home Appliance Repair',
  electronics: 'Consumer Electronics Repair',
  furniture: 'Furniture Restoration',
  vehicles: 'Bike & Scooter Mechanic',
  watches: 'Watch & Clock Repair',
  other: 'Multi-skill General Repair',
}

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export const REPAIRERS = names.map((name, i) => {
  const catKeys = Object.keys(specialties)
  const category = catKeys[i % catKeys.length]
  const city = CITIES[i % CITIES.length]
  const rating = Math.round((3.6 + seededRandom(i * 7) * 1.4) * 10) / 10
  const repairs = Math.floor(60 + seededRandom(i * 3) * 900)
  const price = Math.floor(200 + seededRandom(i * 11) * 800)
  return {
    id: `rep-${i + 1}`,
    name,
    category,
    specialty: specialties[category],
    rating: Math.min(rating, 5),
    reviewCount: Math.floor(repairs * 0.4),
    repairsCompleted: repairs,
    city,
    distanceKm: Math.round((0.8 + seededRandom(i * 5) * 11) * 10) / 10,
    startingPrice: price,
    verified: seededRandom(i * 13) > 0.25,
    yearsExperience: Math.floor(1 + seededRandom(i * 17) * 14),
    availability: seededRandom(i * 19) > 0.3 ? 'Available Today' : 'Available Tomorrow',
    workingHours: '10:00 AM – 8:00 PM',
    phone: `+91 98${(100000000 + i * 7654321) % 100000000}`.slice(0, 13),
    bio: `${name.split(' ')[0]} has spent ${Math.floor(1 + seededRandom(i * 17) * 14)} years fixing ${specialties[category].toLowerCase()} problems across ${city}, known for honest diagnostics and fair pricing.`,
    services: serviceListFor(category),
    initials: name.split(' ').map((n) => n[0]).join('').slice(0, 2),
  }
})

function serviceListFor(category) {
  const map = {
    smartphones: [
      { name: 'Screen Replacement', price: '₹1,800 – ₹4,500' },
      { name: 'Battery Replacement', price: '₹900 – ₹2,200' },
      { name: 'Charging Port Repair', price: '₹600 – ₹1,500' },
      { name: 'Water Damage Recovery', price: '₹1,200 – ₹3,000' },
    ],
    laptops: [
      { name: 'Screen Replacement', price: '₹3,500 – ₹8,000' },
      { name: 'Keyboard Replacement', price: '₹1,500 – ₹3,500' },
      { name: 'Motherboard Repair', price: '₹2,500 – ₹9,000' },
      { name: 'RAM / SSD Upgrade', price: '₹1,800 – ₹6,000' },
    ],
    appliances: [
      { name: 'Washing Machine Repair', price: '₹500 – ₹2,500' },
      { name: 'Refrigerator Gas Refill', price: '₹1,800 – ₹3,500' },
      { name: 'Microwave Repair', price: '₹400 – ₹1,800' },
      { name: 'AC Servicing', price: '₹600 – ₹2,200' },
    ],
    electronics: [
      { name: 'TV Panel Repair', price: '₹1,500 – ₹6,000' },
      { name: 'Speaker Repair', price: '₹500 – ₹1,800' },
      { name: 'Circuit Diagnosis', price: '₹300 – ₹1,200' },
    ],
    furniture: [
      { name: 'Wood Polish & Restoration', price: '₹800 – ₹3,000' },
      { name: 'Upholstery Repair', price: '₹1,200 – ₹4,500' },
      { name: 'Joint & Hinge Fixing', price: '₹300 – ₹1,200' },
    ],
    vehicles: [
      { name: 'General Bike Servicing', price: '₹400 – ₹1,200' },
      { name: 'Brake & Chain Repair', price: '₹300 – ₹900' },
      { name: 'Battery Replacement', price: '₹1,500 – ₹3,500' },
    ],
    watches: [
      { name: 'Battery & Strap Change', price: '₹150 – ₹600' },
      { name: 'Movement Servicing', price: '₹800 – ₹2,500' },
      { name: 'Glass Replacement', price: '₹400 – ₹1,500' },
    ],
    other: [
      { name: 'General Diagnosis', price: '₹200 – ₹800' },
      { name: 'Custom Repair', price: 'Varies' },
    ],
  }
  return map[category] || map.other
}

export const REVIEWS = Array.from({ length: 18 }).map((_, i) => {
  const rep = REPAIRERS[i % REPAIRERS.length]
  const reviewer = names[(i + 5) % names.length]
  const comments = [
    'Fixed my screen in under an hour, works like new.',
    'Honest about what could and couldn\'t be repaired. Saved me money.',
    'A bit late to arrive but the repair quality was excellent.',
    'Explained the issue clearly and gave a fair quote upfront.',
    'Great work — my washing machine is running quietly again.',
    'Professional and quick. Would book again.',
  ]
  return {
    id: `rev-${i + 1}`,
    repairerId: rep.id,
    reviewer,
    rating: [4, 5, 5, 4, 5, 3][i % 6],
    comment: comments[i % comments.length],
    date: new Date(Date.now() - i * 86400000 * 3).toISOString(),
  }
})

export const SPARE_PART_CATEGORIES = ['Mobile', 'Laptop', 'Electronics', 'Appliances', 'Bike', 'Other']

const partNamesByCategory = {
  Mobile: ['OLED Display Assembly', 'Li-ion Battery 4000mAh', 'Type-C Charging Flex', 'Rear Camera Module', 'Ear Speaker Unit', 'Back Glass Panel'],
  Laptop: ['SSD 512GB NVMe', 'DDR4 RAM 8GB', 'Laptop Keyboard Unit', 'Cooling Fan Assembly', 'Laptop Battery Cell Pack', 'Hinge Set (Pair)'],
  Electronics: ['LED TV Panel Strip', 'Bluetooth Speaker Driver', 'Universal Remote Board', 'Power Supply Board'],
  Appliances: ['Washing Machine Motor', 'Fridge Compressor Relay', 'Microwave Magnetron', 'AC Compressor Capacitor'],
  Bike: ['Brake Pad Set', 'Chain & Sprocket Kit', 'Bike Battery 12V', 'Clutch Cable'],
  Other: ['Universal Adapter', 'Soldering Kit', 'Tool Repair Kit'],
}

export const SPARE_PARTS = Object.entries(partNamesByCategory).flatMap(([cat, items], ci) =>
  items.map((name, i) => {
    const idx = ci * 10 + i
    const price = Math.floor(150 + seededRandom(idx * 3) * 3500)
    return {
      id: `part-${idx + 1}`,
      name,
      category: cat,
      compatibility: compatibilityFor(cat, name),
      price,
      rating: Math.round((3.5 + seededRandom(idx * 9) * 1.5) * 10) / 10,
      stock: Math.floor(seededRandom(idx * 4) * 40),
      reviewCount: Math.floor(10 + seededRandom(idx * 6) * 200),
    }
  })
)

function compatibilityFor(cat, name) {
  const map = {
    Mobile: 'Compatible with most Android & iPhone models',
    Laptop: 'Compatible with Dell, HP, Lenovo, ASUS',
    Electronics: 'Universal fit — check specs before ordering',
    Appliances: 'Compatible with LG, Samsung, Whirlpool, IFB',
    Bike: 'Compatible with Hero, Honda, TVS, Bajaj',
    Other: 'Universal',
  }
  return map[cat] || 'Universal'
}

export const PROBLEM_OPTIONS = {
  Smartphone: ['Broken Screen', 'Battery Problem', 'Charging Port', 'Camera', 'Speaker', 'Water Damage'],
  Laptop: ['Broken Screen', 'Battery Problem', 'Keyboard Fault', 'Overheating', 'Slow Performance', 'Water Damage'],
  'Washing Machine': ['Not Spinning', 'Water Leakage', 'Noisy Operation', 'Not Draining', 'Motor Failure'],
  Refrigerator: ['Not Cooling', 'Gas Leakage', 'Noisy Compressor', 'Door Seal Damage'],
  Television: ['No Display', 'Cracked Panel', 'No Sound', 'Lines on Screen'],
  Bike: ['Engine Trouble', 'Brake Issue', 'Battery Dead', 'Chain Problem'],
  Watch: ['Not Working', 'Cracked Glass', 'Strap Broken', 'Water Damage'],
  Furniture: ['Broken Joint', 'Torn Upholstery', 'Faded Polish', 'Broken Leg/Handle'],
}

export const ESTIMATE_RANGES = {
  'Broken Screen': [2500, 5000],
  'Battery Problem': [900, 2500],
  'Charging Port': [600, 1600],
  'Camera': [1200, 3200],
  'Speaker': [500, 1500],
  'Water Damage': [1500, 4000],
  'Keyboard Fault': [1200, 3000],
  'Overheating': [800, 2200],
  'Slow Performance': [500, 1800],
  'Not Spinning': [700, 2200],
  'Water Leakage': [500, 1800],
  'Noisy Operation': [400, 1200],
  'Not Draining': [500, 1500],
  'Motor Failure': [1800, 4500],
  'Not Cooling': [1500, 3800],
  'Gas Leakage': [1800, 3500],
  'Noisy Compressor': [1200, 3000],
  'Door Seal Damage': [400, 1200],
  'No Display': [2000, 6000],
  'Cracked Panel': [1500, 6000],
  'No Sound': [500, 1800],
  'Lines on Screen': [1800, 5000],
  'Engine Trouble': [1000, 4000],
  'Brake Issue': [300, 900],
  'Battery Dead': [1500, 3500],
  'Chain Problem': [300, 900],
  'Not Working': [300, 1200],
  'Cracked Glass': [400, 1500],
  'Strap Broken': [150, 600],
  'Broken Joint': [300, 1200],
  'Torn Upholstery': [1200, 4500],
  'Faded Polish': [800, 3000],
  'Broken Leg/Handle': [400, 1500],
}

export const REPAIR_STATUSES = ['Pending', 'Accepted', 'Repair in Progress', 'Ready for Pickup', 'Completed', 'Cancelled']

export const AI_SIMULATED_RESULTS = [
  { keyword: 'screen', issue: 'Screen damage', action: 'Visit a screen repair specialist.' },
  { keyword: 'battery', issue: 'Battery degradation', action: 'Consider a battery replacement.' },
  { keyword: 'water', issue: 'Liquid damage', action: 'Stop charging the device and visit a repairer immediately.' },
  { keyword: 'default', issue: 'General hardware fault', action: 'Book a diagnostic visit with a nearby repairer.' },
]
