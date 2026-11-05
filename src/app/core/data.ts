export interface Kpi {
  label: string;
  value: string;
  delta: number;
  spark: number[];
}

export const KPIS: Kpi[] = [
  { label: 'Revenue', value: '$482,900', delta: 12.4, spark: [12, 18, 15, 22, 19, 27, 31, 29, 38] },
  { label: 'Active Users', value: '18,204', delta: 6.8, spark: [8, 11, 10, 14, 16, 15, 19, 22, 24] },
  { label: 'Conversion', value: '3.94%', delta: -1.2, spark: [22, 20, 21, 18, 19, 16, 17, 15, 14] },
  { label: 'Avg. Order', value: '$126.40', delta: 2.3, spark: [14, 15, 15, 17, 16, 18, 19, 19, 21] },
];

export type OrderStatus = 'Paid' | 'Pending' | 'Refunded' | 'Failed';

export interface Order {
  id: string;
  customer: string;
  email: string;
  initials: string;
  plan: string;
  items: number;
  amount: number;
  status: OrderStatus;
  date: string;
}

const NAMES: [string, string][] = [
  ['Amara Okafor', 'amara.okafor@nexlify.io'],
  ['Lucia Ferreira', 'lucia.f@brightpath.co'],
  ['Noah Bergström', 'noah.b@northwind.se'],
  ['Priya Raman', 'priya@ramanlabs.in'],
  ['Diego Salazar', 'diego.s@andina.mx'],
  ['Hana Sato', 'hana.sato@kiri.jp'],
  ['Elias Weber', 'e.weber@alpenwerk.de'],
  ['Fatima Al-Rashid', 'fatima@dune.sa'],
  ['Mikkel Sørensen', 'mikkel@fjord.dk'],
  ['Grace Chen', 'grace.chen@lotuslabs.cn'],
  ['Tomás Herrera', 'tomas@sur.ar'],
  ['Aisha Bello', 'aisha.bello@sahara.ng'],
];

const PLANS = ['Enterprise', 'Growth', 'Starter'];
const STATUSES: OrderStatus[] = ['Paid', 'Paid', 'Pending', 'Paid', 'Refunded', 'Failed'];

function initialsOf(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export const ORDERS: Order[] = Array.from({ length: 28 }, (_, i) => {
  const [customer, email] = NAMES[i % NAMES.length];
  const plan = PLANS[i % PLANS.length];
  const status = STATUSES[i % STATUSES.length];
  const amount = plan === 'Enterprise' ? 4820 + i * 130 : plan === 'Growth' ? 1240 : 98;
  const day = 4 - Math.floor(i / 6);
  return {
    id: `#ORD-${7841 - i}`,
    customer,
    email,
    initials: initialsOf(customer),
    plan,
    items: ((i * 3) % 7) + 1,
    amount,
    status,
    date: `Nov ${String(Math.max(day, 1)).padStart(2, '0')}, 2026`,
  };
});

export interface Customer {
  id: string;
  name: string;
  email: string;
  initials: string;
  company: string;
  plan: string;
  spend: number;
  orders: number;
  status: 'Active' | 'Trial' | 'Churned';
  joined: string;
}

const COMPANIES = ['Nexlify', 'Brightpath', 'Northwind', 'Raman Labs', 'Andina', 'Kiri Co', 'Alpenwerk', 'Dune', 'Fjord', 'Lotus Labs', 'Sur', 'Sahara'];
const CUST_STATUS: Customer['status'][] = ['Active', 'Active', 'Trial', 'Active', 'Churned', 'Trial'];

export const CUSTOMERS: Customer[] = NAMES.map(([name, email], i) => ({
  id: `CUS-${1200 + i}`,
  name,
  email,
  initials: initialsOf(name),
  company: COMPANIES[i],
  plan: PLANS[i % PLANS.length],
  spend: [18400, 6200, 480, 9400, 23100, 1240, 7600, 3200, 5200, 15800, 2100, 8800][i],
  orders: [24, 11, 3, 17, 31, 5, 14, 7, 9, 21, 4, 15][i],
  status: CUST_STATUS[i % CUST_STATUS.length],
  joined: `202${4 + (i % 2)}-0${(i % 9) + 1}-1${i % 9}`,
}));

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
  glyph: string;
}

export const PRODUCTS: Product[] = [
  { id: 'PRD-001', name: 'Aurora Desk Lamp', sku: 'LMP-AUR-01', category: 'Lighting', price: 149, stock: 84, sold: 1240, rating: 4.8, glyph: 'L' },
  { id: 'PRD-002', name: 'Halcyon Chair', sku: 'CHR-HAL-02', category: 'Seating', price: 429, stock: 12, sold: 640, rating: 4.6, glyph: 'H' },
  { id: 'PRD-003', name: 'Meridian Standing Desk', sku: 'DSK-MER-03', category: 'Desks', price: 899, stock: 0, sold: 312, rating: 4.9, glyph: 'M' },
  { id: 'PRD-004', name: 'Nimbus Monitor Arm', sku: 'ARM-NIM-04', category: 'Accessories', price: 79, stock: 156, sold: 2870, rating: 4.4, glyph: 'N' },
  { id: 'PRD-005', name: 'Solace Acoustic Panel', sku: 'PNL-SOL-05', category: 'Acoustics', price: 59, stock: 34, sold: 980, rating: 4.3, glyph: 'S' },
  { id: 'PRD-006', name: 'Vantage Bookshelf', sku: 'SHF-VAN-06', category: 'Storage', price: 319, stock: 7, sold: 421, rating: 4.7, glyph: 'V' },
  { id: 'PRD-007', name: 'Tessera Rug', sku: 'RUG-TES-07', category: 'Textiles', price: 249, stock: 62, sold: 705, rating: 4.5, glyph: 'T' },
  { id: 'PRD-008', name: 'Lumen Floor Light', sku: 'LMP-LUM-08', category: 'Lighting', price: 199, stock: 0, sold: 1580, rating: 4.8, glyph: 'F' },
];

export interface ActivityItem {
  who: string;
  initials: string;
  action: string;
  when: string;
}

export const ACTIVITY: ActivityItem[] = [
  { who: 'Amara Okafor', initials: 'AO', action: 'upgraded to Enterprise plan', when: '12m ago' },
  { who: 'System', initials: 'SY', action: 'nightly backup completed successfully', when: '1h ago' },
  { who: 'Noah Bergström', initials: 'NB', action: 'invited 3 teammates to the workspace', when: '2h ago' },
  { who: 'Priya Raman', initials: 'PR', action: 'requested a refund for #ORD-7838', when: '5h ago' },
  { who: 'Diego Salazar', initials: 'DS', action: 'connected the Stripe integration', when: 'Yesterday' },
];

export interface Slice {
  label: string;
  share: number;
}

export const CHANNELS: Slice[] = [
  { label: 'Organic Search', share: 38 },
  { label: 'Direct', share: 26 },
  { label: 'Referral', share: 18 },
  { label: 'Social', share: 12 },
  { label: 'Email', share: 6 },
];

export const TRAFFIC = [
  { label: 'Mon', a: 46, b: 28 },
  { label: 'Tue', a: 58, b: 34 },
  { label: 'Wed', a: 51, b: 30 },
  { label: 'Thu', a: 72, b: 41 },
  { label: 'Fri', a: 84, b: 47 },
  { label: 'Sat', a: 66, b: 38 },
  { label: 'Sun', a: 58, b: 33 },
];

export const REVENUE_TREND = [32, 38, 35, 44, 41, 52, 49, 58, 63, 59, 71, 78];

export const PLAN_MIX: Slice[] = [
  { label: 'Enterprise', share: 46 },
  { label: 'Growth', share: 34 },
  { label: 'Starter', share: 20 },
];

export const TOP_PAGES: { path: string; views: number; bounce: number }[] = [
  { path: '/pricing', views: 18420, bounce: 32 },
  { path: '/features', views: 12980, bounce: 41 },
  { path: '/docs/getting-started', views: 10440, bounce: 26 },
  { path: '/blog/launch-week', views: 8110, bounce: 54 },
  { path: '/integrations', views: 6320, bounce: 38 },
];

export const DEVICES: Slice[] = [
  { label: 'Desktop', share: 58 },
  { label: 'Mobile', share: 33 },
  { label: 'Tablet', share: 9 },
];
