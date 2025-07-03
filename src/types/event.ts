export type Faq = {
  id: number;
  question: string;
  answer: string;
};

export type Ticket = {
  id: number;
  ticket: 'vip' | 'general';
  ticketType: 'free' | 'paid';
  quantity: number;
  price: number;
};

export type GeneralTicket = {
  id: number;
  ticket: 'general';
  ticketType: 'free' | 'paid';
  quantity: number;
  price: number;
};

export type VipTicket = {
  id: number;
  ticket: 'vip';
  ticketType: 'free' | 'paid';
  quantity: number;
  price: number;
};

export type LocationDetailsOffline = {
  pincode: number;
  address: string;
  country: string;
  state: string;
};

export type LocationDetailsOnline = {
  link: string;
};

export type OneDayEvent = {
  type: 'one_day_event';
  startDate: string;
  startTime: string;
  endTime: string;
};

export type RecurringEvent = {
  type: 'recurring_event';
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};

export type BaseCommonFields = {
  image: string;
  name: string;
  description?: string;
  category: string[];
  tickets:
    | []
    | [VipTicket]
    | [GeneralTicket]
    | [VipTicket, GeneralTicket]
    | [GeneralTicket, VipTicket];
  faqs: Faq[];
  coverImage?: File | null;
};

// Enforce correct `type` ↔ `events` match
export type OneDayEventBase = BaseCommonFields & {
  type: 'one_day_event' | '';
  events: [OneDayEvent];
};

export type RecurringEventBase = BaseCommonFields & {
  type: 'recurring_event' | '';
  events: RecurringEvent[];
};

// Add location on top
export type OfflineCreateEvent =
  | (OneDayEventBase & {
      location: 'offline' | '';
      locationDetails: LocationDetailsOffline;
    })
  | (RecurringEventBase & {
      location: 'offline' | '';
      locationDetails: LocationDetailsOffline;
    });

export type OnlineCreateEvent =
  | (OneDayEventBase & {
      location: 'online' | '';
      locationDetails: LocationDetailsOnline;
    })
  | (RecurringEventBase & {
      location: 'online' | '';
      locationDetails: LocationDetailsOnline;
    });

export type Event = OfflineCreateEvent | OnlineCreateEvent;
