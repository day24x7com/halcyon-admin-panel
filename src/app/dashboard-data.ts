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

export interface Order {
  id: string;
  customer: string;
  initials: string;
  plan: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Refunded';
  date: string;
}

export const ORDERS: Order[] = [
  { id: '#ORD-7841', customer: 'Amara Okafor', initials: 'AO', plan: 'Enterprise', amount: 4820, status: 'Paid', date: 'Nov 04, 2026' },
  { id: '#ORD-7840', customer: 'Lucia Ferreira', initials: 'LF', plan: 'Growth', amount: 1240, status: 'Pending', date: 'Nov 04, 2026' },
  { id: '#ORD-7839', customer: 'Noah Bergström', initials: 'NB', plan: 'Starter', amount: 98, status: 'Paid', date: 'Nov 03, 2026' },
  { id: '#ORD-7838', customer: 'Priya Raman', initials: 'PR', plan: 'Growth', amount: 1240, status: 'Refunded', date: 'Nov 03, 2026' },
  { id: '#ORD-7837', customer: 'Diego Salazar', initials: 'DS', plan: 'Enterprise', amount: 7400, status: 'Paid', date: 'Nov 02, 2026' },
  { id: '#ORD-7836', customer: 'Hana Sato', initials: 'HS', plan: 'Starter', amount: 98, status: 'Pending', date: 'Nov 02, 2026' },
];

export interface Activity {
  who: string;
  initials: string;
  action: string;
  when: string;
}

export const ACTIVITY: Activity[] = [
  { who: 'Amara Okafor', initials: 'AO', action: 'upgraded to Enterprise plan', when: '12m ago' },
  { who: 'System', initials: 'SY', action: 'nightly backup completed successfully', when: '1h ago' },
  { who: 'Noah Bergström', initials: 'NB', action: 'invited 3 teammates to the workspace', when: '2h ago' },
  { who: 'Priya Raman', initials: 'PR', action: 'requested a refund for #ORD-7838', when: '5h ago' },
  { who: 'Diego Salazar', initials: 'DS', action: 'connected the Stripe integration', when: 'Yesterday' },
];

export interface Channel {
  label: string;
  share: number;
}

export const CHANNELS: Channel[] = [
  { label: 'Organic Search', share: 38 },
  { label: 'Direct', share: 26 },
  { label: 'Referral', share: 18 },
  { label: 'Social', share: 12 },
  { label: 'Email', share: 6 },
];

export const TRAFFIC_SERIES = [
  { label: 'Mon', a: 46, b: 28 },
  { label: 'Tue', a: 58, b: 34 },
  { label: 'Wed', a: 51, b: 30 },
  { label: 'Thu', a: 72, b: 41 },
  { label: 'Fri', a: 84, b: 47 },
  { label: 'Sat', a: 66, b: 38 },
  { label: 'Sun', a: 58, b: 33 },
];
