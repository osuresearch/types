import { parse } from 'graphql'

export const typeDefs = parse(/* GraphQL */`
  enum AtomicClass = {
    Text
    Website
    Email
    Flag
    Numeric
    NumericRange
    MonetaryAmount
    DateTime
    DateTimeRange
    Person
    Organization
    Software
    Reference 
    PostalAddress
    EducationalOccupationalCredential
  }

  union Atomic = Text | Website | Email | Flag 
    | Numeric | NumericRange | MonetaryAmount 
    | DateTime | DateTimeRange 
    | Person | Organization | Software
    | Reference | PostalAddress | EducationalOccupationalCredential

  interface IAtomic {
    type: AtomicClass!
  }

  type Text implements IAtomic {
    type: AtomicClass = Text
    text: String!
  }

  type Website implements IAtomic {
    type: AtomicClass = Website
    url: String!
  }

  type Email implements IAtomic {
    type: AtomicClass = Email
    email: String!
  }

  type Flag implements IAtomic {
    type: AtomicClass = Flag
    flag: Boolean!
  }

  type Numeric implements IAtomic {
    type: AtomicClass = Numeric
    value: Float!
  }
  
  type NumericRange implements IAtomic {
    type: AtomicClass = NumericRange
    fromValue: Float!
    toValue: Float!
  }

  type MonetaryAmount implements IAtomic {
    type: AtomicClass = MonetaryAmount
    currency: String!
    value: Float!
  }

  type DateTime implements IAtomic {
    type: AtomicClass = DateTime
    dateTime: String!
  }

  type DateTimeRange implements IAtomic {
    type: AtomicClass = DateTimeRange
    fromDateTime: String!
    toDateTime: String!
  }

  type Person implements IAtomic { 
    type: AtomicClass = Person
    id: ID!
    name: String!
    nickname: String
    email: String
    jobTitle: String
    telephone: String 
    givenName: String
  }

  type Organization implements IAtomic {
    type: AtomicClass = Organization
    id: ID!
    name: String!
    nickname: String
    email: String
    department: [Organization]
  }

  type Software implements IAtomic {
    type: AtomicClass = Software
    id: ID!
    name: String!
    nickname: String
    email: String
  }

  type Reference implements IAtomic {
    type: AtomicClass = Reference
    id: ID!
    name: String!
    category1: String!
    category2: String
    category3: String
    category4: String
    source: String
  }

  type PostalAddress implements IAtomic {
    type: AtomicClass = PostalAddress
    addressCountry: String
    addressLocality: String
    addressRegion: String!
    postOfficeBoxNumber: String
    postalCode: String
    streetAddress: String!
  }

  type EducationalOccupationalCredential implements IAtomic {
    type: AtomicClass = EducationalOccupationalCredential
    name: String!
    alternateName: String
    description: String
    dateCreated: DateTime
    expires: DateTime
    recognizedBy: Organization
    credentialCategory: String
  }
`);

export const inputTypeDefs = parse(/* GraphQL */`
  input TextInput {
    type: AtomicClass = Text
    text: String!
  }

  input WebsiteInput {
    type: AtomicClass = Website
    url: String!
  }

  input EmailInput {
    type: AtomicClass = Email
    email: String!
  }

  input FlagInput {
    type: AtomicClass = Flag
    flag: Boolean!
  }

  input NumericInput {
    type: AtomicClass = Numeric
    value: Float!
  }

  input NumericRangeInput {
    type: AtomicClass = NumericRange
    fromValue: Float!
    toValue: Float!
  }

  input MonetaryAmountInput {
    type: AtomicClass = MonetaryAmount
    currency: String!
    value: Float!
  }

  input DateTimeInput {
    type: AtomicClass = DateTime
    dateTime: String!
  }

  input DateTimeRangeInput {
    type: AtomicClass = DateTimeRange
    fromDateTime: String!
    toDateTime: String!
  }

  input PersonInput { 
    type: AtomicClass = Person
    id: ID!
    name: String!
    nickname: String
    email: String
    jobTitle: String
    telephone: String 
    givenName: String
  }

  input OrganizationInput {
    type: AtomicClass = Organization
    department: [OrganizationInput]
  }

  input SoftwareInput {
    type: AtomicClass = Software
  }

  input ReferenceInput {
    type: AtomicClass = Reference
    id: ID!
    name: String!
    category1: String!
    category2: String
    category3: String
    category4: String
    source: String
  }

  input PostalAddressInput {
    type: AtomicClass = PostalAddress
    addressCountry: String
    addressLocality: String
    addressRegion: String!
    postOfficeBoxNumber: String
    postalCode: String
    streetAddress: String!
  }

  input EducationalOccupationalCredentialInput {
    type: AtomicClass = EducationalOccupationalCredential
    name: String!
    alternateName: String
    description: String
    dateCreated: DateTime
    expires: DateTime
    recognizedBy: Organization
    credentialCategory: String
  }

  input AnyAgentInput { 
    type: AtomicClass
    id: ID!
    name: String!
    nickname: String
    email: String

    # From PersonInput
    jobTitle: String
    telephone: String 
    givenName: String

    # From OrganizationInput
    department: [Organization]
  }

  """
  Input that can represent any atomic. 
  """
  input AnyAtomicInput {
    type: AtomicClass
    id: ID
    name: String
    text: String
    url: String
    email: String
    flag: Boolean
    value: Float
    fromValue: Float
    toValue: Float
    currency: String
    dateTime: String
    fromDateTime: String
    toDateTime: String
    nickname: String
    email: String
    jobTitle: String
    category1: String
    category2: String
    category3: String
    category4: String
    source: String
    addressCountry: String
    addressLocality: String
    addressRegion: String
    postOfficeBoxNumber: String
    postalCode: String
    streetAddress: String
    alternateName: String
    description: String
    dateCreated: DateTime
    dateModified: DateTime
    expires: DateTime
    recognizedBy: OrganizationInput
    credentialCategory: String
    creator: AnyAgentInput
  }
`); 
