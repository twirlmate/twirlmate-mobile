const events = {
  closingSoon: {
    id: 101,
    start: '2026-08-12T14:00:00Z',
    end: '2026-08-12T20:00:00Z',
    registration_open: '2026-06-01T13:00:00Z',
    registration_close: '2026-08-01T23:59:00Z',
    registration_upcoming: false,
    registration_available: true,
    registration_closed: false,
    video_entry_deadline: null,
    awards_announcement: null,
    organizations: [],
    tiers: [],
    mobile_detail_url: '/api/v1/mobile/events/dates/101/',
    registration_url: 'https://example.test/register/101',
    offer_refunds: true,
    refund_request_deadline: null,
    music_submission_url: '',
    music_submission_email: '',
    event: {
      id: 501,
      name: 'Twirl Classic Open',
      image: '/media/events/twirl-classic-open.jpg',
      types: [{ id: 1, name: 'Competition' }],
      format: 'In person',
      location: 'Austin, Texas',
    },
  },
  happeningSoon: {
    id: 102,
    start: '2026-09-05T15:00:00Z',
    end: '2026-09-05T20:00:00Z',
    registration_open: '2026-07-01T13:00:00Z',
    registration_close: '2026-08-20T23:59:00Z',
    registration_upcoming: false,
    registration_available: true,
    registration_closed: false,
    video_entry_deadline: null,
    awards_announcement: null,
    organizations: [],
    tiers: [],
    mobile_detail_url: '/api/v1/mobile/events/dates/102/',
    registration_url: 'https://example.test/register/102',
    offer_refunds: true,
    refund_request_deadline: null,
    music_submission_url: '',
    music_submission_email: '',
    event: {
      id: 502,
      name: 'River City Baton Day',
      image: '/media/events/river-city-baton-day.jpg',
      types: [{ id: 1, name: 'Competition' }],
      format: 'In person',
      location: 'Louisville, Kentucky',
    },
  },
  recentlyAdded: {
    id: 103,
    start: '2026-10-02T14:00:00Z',
    end: '2026-10-02T22:00:00Z',
    registration_open: '2026-07-10T13:00:00Z',
    registration_close: '2026-09-18T23:59:00Z',
    registration_upcoming: false,
    registration_available: true,
    registration_closed: false,
    video_entry_deadline: null,
    awards_announcement: null,
    organizations: [],
    tiers: [],
    mobile_detail_url: '/api/v1/mobile/events/dates/103/',
    registration_url: 'https://example.test/register/103',
    offer_refunds: true,
    refund_request_deadline: null,
    music_submission_url: '',
    music_submission_email: '',
    event: {
      id: 503,
      name: 'Midwest Twirl Invitational',
      image: '/media/events/midwest-twirl-invitational.jpg',
      types: [{ id: 1, name: 'Competition' }],
      format: 'In person',
      location: 'Columbus, Ohio',
    },
  },
};

const eventDetails = {
  101: {
    ...events.closingSoon,
    event: {
      ...events.closingSoon.event,
      overview_description: 'A deterministic fixture event used for the recorded discovery harness flow.',
      order_of_events: 'Solo, duet, team, and halftime showcase.',
      awards_description: 'Final placements announced at the close of the session.',
      cancellation_policy: 'Contact the host for cancellation requests.',
      rules: 'Standard baton twirling competition rules apply.',
      additional_information: 'Doors open one hour before warmups begin.',
      contact_name: 'Harness Host',
      contact_email: 'host@example.test',
      contact_phone_number: '555-0101',
      contact_fax_number: '',
      website: 'https://example.test/events/101',
      facebook_url: '',
      instagram_url: '',
      x_url: '',
      youtube_url: '',
      primary_address: {
        id: 1,
        name: 'Austin Civic Center',
        address_1: '123 Main Street',
        address_2: '',
        city: 'Austin',
        state: 'TX',
        territory: '',
        country: 'US',
        country_display: 'United States',
        zip_code: '78701',
        type: 'venue',
      },
      secondary_address: null,
      contact_address: null,
    },
  },
  102: {
    ...events.happeningSoon,
    event: {
      ...events.happeningSoon.event,
      overview_description: 'Another stable event fixture for tab exploration.',
      order_of_events: '',
      awards_description: '',
      cancellation_policy: '',
      rules: '',
      additional_information: '',
      contact_name: '',
      contact_email: '',
      contact_phone_number: '',
      contact_fax_number: '',
      website: '',
      facebook_url: '',
      instagram_url: '',
      x_url: '',
      youtube_url: '',
      primary_address: null,
      secondary_address: null,
      contact_address: null,
    },
  },
  103: {
    ...events.recentlyAdded,
    event: {
      ...events.recentlyAdded.event,
      overview_description: 'Recently added deterministic event fixture.',
      order_of_events: '',
      awards_description: '',
      cancellation_policy: '',
      rules: '',
      additional_information: '',
      contact_name: '',
      contact_email: '',
      contact_phone_number: '',
      contact_fax_number: '',
      website: '',
      facebook_url: '',
      instagram_url: '',
      x_url: '',
      youtube_url: '',
      primary_address: null,
      secondary_address: null,
      contact_address: null,
    },
  },
};

const people = {
  coach: {
    id: 201,
    name: 'Coach Avery Lane',
    image: '/media/people/coach-avery-lane.jpg',
    location: 'Dallas, Texas',
    mobile_detail_url: '/api/v1/mobile/accounts/201/',
  },
  judge: {
    id: 202,
    name: 'Judge Briar Chen',
    image: '/media/people/judge-briar-chen.jpg',
    location: 'Chicago, Illinois',
    mobile_detail_url: '/api/v1/mobile/accounts/202/',
  },
  organizer: {
    id: 203,
    name: 'Organizer Morgan Price',
    image: '/media/people/organizer-morgan-price.jpg',
    location: 'Orlando, Florida',
    mobile_detail_url: '/api/v1/mobile/accounts/203/',
  },
};

const peopleByRole = {
  coach: [people.coach],
  judge: [people.judge],
  event_organizer: [people.organizer],
};

const peopleDetails = {
  201: {
    id: 201,
    name: 'Coach Avery Lane',
    bio: 'A deterministic fixture profile used for the discovery harness.',
    image: '/media/people/coach-avery-lane.jpg',
    location: 'Dallas, Texas',
    coach_specialties: ['Baton Twirling', 'Team Training'],
    profile_visibility: 'public',
    web_detail_url: '/people/avery-lane/',
    web_coach_request_url: '/people/avery-lane/request/',
  },
  202: {
    id: 202,
    name: 'Judge Briar Chen',
    bio: 'Fixture judge profile.',
    image: '/media/people/judge-briar-chen.jpg',
    location: 'Chicago, Illinois',
    coach_specialties: ['Judging'],
    profile_visibility: 'public',
    web_detail_url: '/people/briar-chen/',
    web_coach_request_url: '/people/briar-chen/request/',
  },
  203: {
    id: 203,
    name: 'Organizer Morgan Price',
    bio: 'Fixture organizer profile.',
    image: '/media/people/organizer-morgan-price.jpg',
    location: 'Orlando, Florida',
    coach_specialties: ['Event Production'],
    profile_visibility: 'public',
    web_detail_url: '/people/morgan-price/',
    web_coach_request_url: '/people/morgan-price/request/',
  },
};

const groups = {
  texas: {
    id: 301,
    name: 'Texas Twirlers Guild',
    image: '/media/groups/texas-twirlers-guild.jpg',
    location: 'Austin, Texas',
    mobile_detail_url: '/api/v1/mobile/groups/301/',
  },
  ohio: {
    id: 302,
    name: 'Ohio Baton Circle',
    image: '/media/groups/ohio-baton-circle.jpg',
    location: 'Columbus, Ohio',
    mobile_detail_url: '/api/v1/mobile/groups/302/',
  },
};

const groupDetails = {
  301: {
    id: 301,
    name: 'Texas Twirlers Guild',
    image: '/media/groups/texas-twirlers-guild.jpg',
    description: 'A fixture community group for recorded discovery tests.',
    website: 'https://example.test/groups/301',
    facebook_page: null,
    creator: null,
    location: 'Austin, Texas',
    web_detail_url: '/groups/texas-twirlers-guild/',
    web_group_join_url: '/groups/texas-twirlers-guild/join/',
  },
  302: {
    id: 302,
    name: 'Ohio Baton Circle',
    image: '/media/groups/ohio-baton-circle.jpg',
    description: 'Another fixture group.',
    website: null,
    facebook_page: null,
    creator: null,
    location: 'Columbus, Ohio',
    web_detail_url: '/groups/ohio-baton-circle/',
    web_group_join_url: null,
  },
};

function paginate(results) {
  return {
    next: null,
    previous: null,
    count: results.length,
    page_size: results.length,
    start_index: results.length > 0 ? 1 : 0,
    end_index: results.length,
    results,
    number: 1,
  };
}

export const scenarios = {
  'happy-path': {
    routes: {
      '/api/v1/mobile/events/closing-soon/': [events.closingSoon],
      '/api/v1/mobile/events/happening-soon/': [events.happeningSoon],
      '/api/v1/mobile/events/recently-added/': [events.recentlyAdded],
      '/api/v1/mobile/events/': [events.closingSoon, events.happeningSoon, events.recentlyAdded],
      '/api/v1/mobile/events/by-state/': [events.closingSoon],
      '/api/v1/mobile/accounts/': paginate([people.coach]),
      '/api/v1/mobile/accounts/by-role/': {
        default: paginate([people.coach]),
        coach: paginate(peopleByRole.coach),
        judge: paginate(peopleByRole.judge),
        event_organizer: paginate(peopleByRole.event_organizer),
      },
      '/api/v1/mobile/accounts/by-state/': paginate([people.coach]),
      '/api/v1/mobile/groups/': paginate([groups.texas, groups.ohio]),
      '/api/v1/mobile/groups/by-state/': {
        TX: paginate([groups.texas]),
        OH: paginate([groups.ohio]),
      },
    },
  },
  'groups-error': {
    routes: {
      '/api/v1/mobile/groups/': { status: 500, body: { detail: 'Fixture groups failure' } },
    },
  },
};

export function getEventDetail(id) {
  return eventDetails[id] ?? null;
}

export function getPersonDetail(id) {
  return peopleDetails[id] ?? null;
}

export function getGroupDetail(id) {
  return groupDetails[id] ?? null;
}
