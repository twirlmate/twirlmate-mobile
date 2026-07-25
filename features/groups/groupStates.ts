export type GroupStateOption = {
  value: string;
  label: string;
};

export type GroupRegion = {
  title: string;
  states: GroupStateOption[];
};

export const GROUP_STATES: GroupStateOption[] = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' },
];

export const GROUP_STATES_WITH_ALL: GroupStateOption[] = [
  { value: '', label: 'All States' },
  ...GROUP_STATES,
];

const stateTitles = Object.fromEntries(GROUP_STATES.map(({ value, label }) => [value, label]));

export const GROUP_REGIONS: GroupRegion[] = [
  {
    title: 'Northeast',
    states: GROUP_STATES.filter(({ value }) => ['CT', 'ME', 'MA', 'NH', 'NJ', 'NY', 'PA', 'RI', 'VT', 'DC'].includes(value)),
  },
  {
    title: 'Southeast',
    states: GROUP_STATES.filter(({ value }) => ['AL', 'AR', 'DE', 'FL', 'GA', 'KY', 'LA', 'MD', 'MS', 'NC', 'SC', 'TN', 'VA', 'WV'].includes(value)),
  },
  {
    title: 'Midwest',
    states: GROUP_STATES.filter(({ value }) => ['IL', 'IN', 'MI', 'MN', 'OH', 'WI'].includes(value)),
  },
  {
    title: 'Central',
    states: GROUP_STATES.filter(({ value }) => ['IA', 'KS', 'MO', 'NE', 'ND', 'SD'].includes(value)),
  },
  {
    title: 'Southwest',
    states: GROUP_STATES.filter(({ value }) => ['AZ', 'CO', 'NV', 'NM', 'TX', 'UT'].includes(value)),
  },
  {
    title: 'West',
    states: GROUP_STATES.filter(({ value }) => ['AK', 'CA', 'HI', 'ID', 'MT', 'OK', 'OR', 'WA', 'WY'].includes(value)),
  },
];

export function getGroupStateTitle(stateValue: string) {
  return stateTitles[stateValue] ?? stateValue;
}
