
export const atomicClass = [
  // Textuals
  'Text',
  'Website',
  'Email',

  // Numerics
  'Flag',
  'Numeric',
  'NumericRange',
  'MonetaryAmount',

  // Temporals
  'DateTime',
  'DateTimeRange',
  
  // Organizationals
  'Person',
  'Organization',
  'Software',

  'Reference',

  'PostalAddress',
  'EducationalOccupationalCredential',
  'DigitalDocument',
  'Action',
] as const

export type AtomicClass = typeof atomicClass[number]

export type AnyAtom = Text | Website | Email | Flag
  | Numeric | NumericRange | MonetaryAmount
  | DateTime | DateTimeRange 
  | Person | Organization | Software
  | Reference | PostalAddress | EducationalOccupationalCredential
  | DigitalDocument | Action

export type Atom = {
  /** 
   * Type class of this atomic value.
   * 
   * This allows us to enforce type information across 
   * untyped service boundaries. 
   */
  type: AtomicClass
}

export type Text = Atom & {
  type: 'Text'
  text: string
}

export type Website = Atom & {
  type: 'Website'
  url: string
}

export type Email = Atom & {
  type: 'Email'
  email: string
}

export type Flag = Atom & {
  type: 'Flag'
  flag: boolean
}

export type Numeric = Atom & {
  type: 'Number'
  value: number
}

export type NumericRange = Atom & {
  type: 'NumericRange'
  fromValue: number 
  toValue: number 
}

/**
 * Description of an amount of money such as $50 USD
 */
export type MonetaryAmount = Atom & {
  type: 'MonetaryAmount'

  /**
   * The currency in which the monetary amount is expressed.
   * Use standard formats: [ISO 4217 currency format](http://en.wikipedia.org/wiki/ISO_4217), 
   * e.g. "USD" 
   */
  currency: string

  /** The value of the quantitative value. */
  value: number
}

/**
 * A combination of date and time of day in the form 
 * [-]CCYY-MM-DDThh:mm:ss[Z|(+|-)hh:mm] (see Chapter 5.4 of ISO 8601).
 */
export type DateTime = Atom & {
  type: 'DateTime'
  dateTime: string
}

/**
 * A range of combined of date and time of day in the form 
 * [-]CCYY-MM-DDThh:mm:ss[Z|(+|-)hh:mm] (see Chapter 5.4 of ISO 8601).
 */
export type DateTimeRange = Atom & {
  type: 'DateTimeRange'
  fromDateTime: string
  toDateTime: string
}

/**
 * The direct performer or driver of the action (animate or inanimate)
 * 
 * Use a concrete agent type such as `Person`, `Organization`, or 
 * `Software` instead of this type.
 * 
 * @see https://schema.org/agent
 */
export type Agent = Atom & {
  type: 'Person' | 'Organization' | 'Software'

  /** 
   * The IRI that identifies the agent.
   * For OSU staff and faculty, this is an employee ID
   */
  id: string

  /** The name of the agent */
  name: string

  /** 
   * The nickname of the agent. 
   * 
   * For OSU staff and faculty, this should be a Name.#
   * for avatar resolution through OPIC.
   */
  nickname?: string

  /**
   * The email address associated with the agent
   */
  email?: string
}

/**
 * A person (alive, dead, undead, or fictional).
 * 
 * This is an agent with extended fields from https://schema.org/Person
 */
export type Person = Agent & {
  type: 'Person'

  /** The job title of the person (for example, Financial Manager). */
  jobTitle?: string

  /** The telephone number. */
  telephone?: string

  /** Given name. In the U.S., the first name of a Person.  */
  givenName?: string
}

/**
 * An organization such as a school, NGO, corporation, club, etc.
 * 
 * @see https://schema.org/Organization
 */
export type Organization = Agent & {
  type: 'Organization'

  /**
   * A relationship between an organization and a department 
   * of that organization, also described as an organization 
   * (allowing different urls, logos, opening hours). For 
   * example: a store with a pharmacy, or a bakery with a cafe. 
   */
  department?: Organization[]
}

/**
 * A software application.
 * 
 * @see https://schema.org/SoftwareApplication
 */
export type Software = Agent & {
  type: 'Software'
}

/**
 * A reference to another data source.
 */
export type Reference = Atom & {
  type: 'Reference'
  id: string
  name: string 

  category1: string 
  category2?: string 
  category3?: string
  category4?: string

  /**
   * TBD what this looks like. Some sort of 
   * identifier for where referenced things live.
   */
  source?: string
}

/**
 * A mailing address.
 * 
 * Examples:
 * 
 * ```json
 * {
 *  "type": "PostalAddress",
 *  "addressLocality": "Seattle",
 *  "addressRegion": "WA",
 *  "postalCode": "98052",
 *  "streetAddress": "20341 Whitworth\nInstitute 405 N. Whitworth"
 * }
 * ```
 * 
 * ```json
 * {
 *  "type": "PostalAddress",
 *  "addressLocality": "Paris, France",
 *  "postalCode": "F-75002",
 *  "streetAddress": "38 avenue de l'Opera"
 * },
 * ```
 * 
 * @see https://schema.org/PostalAddress
 */
export type PostalAddress = Atom & {
  type: 'PostalAddress',

  /**
   * The country. For example, USA. You can also provide the two-letter 
   * [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1).
   */
  addressCountry: string

  /**
   * The locality in which the street address is, and which is in the 
   * region. For example, Mountain View. 
   */
  addressLocality: string

  /**
   * The region in which the locality is, and which is in the country. 
   * For example, California or another appropriate first-level 
   * [Administrative division](https://en.wikipedia.org/wiki/List_of_administrative_divisions_by_country).
   */
  addressRegion?: string

  /**
   * The post office box number for PO box addresses. 
   */
  postOfficeBoxNumber?: string

  /**
   * The postal code. For example, 94043. 
   */
  postalCode?: string 

  /**
   * The street address. For example, 1600 Amphitheatre Pkwy.
   * Newlines may be used to denote multi-line addresses, such as:
   *  208 Bricker Hall
   *  190 North Oval Mall
   */
  streetAddress: string
}

/**
 * An educational or occupational credential. A diploma, academic 
 * degree, certification, qualification, badge, etc., that may 
 * be awarded to a person or other entity that meets the requirements 
 * defined by the credentialer.
 * 
 * @see https://schema.org/EducationalOccupationalCredential
 */
export type EducationalOccupationalCredential = Atom & {
  type: 'EducationalOccupationalCredential'
  name: string
  alternateName?: string
  description?: string

  /** The date on which the credential was created. */
  dateCreated: DateTime

  /** Date the content expires and is no longer useful or available. */
  expires: DateTime

  /**
   * An organization that acknowledges the validity, value or 
   * utility of a credential. Note: recognition may include a 
   * process of quality assurance or accreditation. 
   */
  recognizedBy?: Organization

  /**
   * The category or type of credential being described, 
   * for example "degree”, “certificate”, “badge”, or more 
   * specific term. 
   */
  credentialCategory?: string
}

/**
 * An electronic file or document.
 * 
 * @see https://schema.org/DigitalDocument
 */
export type DigitalDocument = {
  type: 'DigitalDocument'

  creator?: Agent

  name: string
  description?: string 

  dateCreated?: DateTime
  dateModified?: DateTime

  /** The textual content of this work. */
  text?: string

  keywords?: string[]

  // TODO: Source document linkage, tags, and all that jazz. 
  // See what can be standardized between schema.org and ORIS/DMS

  /**
   * Indicates a potential Action, which describes an idealized 
   * action in which this thing would play an 'object' role.
   */
  potentialAction?: Action[]
}

/**
 * The status of an Action.
 * 
 * @see https://schema.org/ActionStatusType
 */
export enum ActionStatusType {
  /** 
   * An in-progress action (e..g, while watching the 
   * movie, or driving to a location). 
   */
  ActiveActionStatus,

  /** An action that has already taken place. */
  CompletedActionStatus,
  
  /** An action that failed to complete. */
  FailedActionStatus,
  
  /** A description of an action that is supported. */
  PotentialActionStatus,
}

/**
 * An action performed by a direct agent and indirect participants upon a 
 * direct object. Optionally happens at a location with the help of an 
 * inanimate instrument. The execution of the action may produce a 
 * result.
 * 
 * @see https://schema.org/docs/actions.html
 */
export type Action = Atom & {
  type: 'Action'

  actionStatus: ActionStatusType

  actor: Agent

  name: string
  description?: string

  /**
   * For failed actions, more information on the cause of the failure. 
   */
  error?: string // NOTE: schema.org uses 'Thing' here. We may not
                 // need it at all if the description includes the error
                 // and the status type is FailedActionStatus

  /**
   * For actions that span a period of time, when the action was performed.
   */
  startTime?: DateTime

  /**
   * For actions that span a period of time, when the action was performed.
   */
  endTime?: DateTime

  /** 
   * Other co-agents that participated in the action indirectly. 
   * E.g. John wrote a book with Steve. 
   */
  participant?: Agent[]

  // Omitted: object: Thing.
  // Bit complicated to define when it can be anything
}
