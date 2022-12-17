
# Atomics

Atomics are the smallest form of a variable or data point used by OSU Research projects. This repository defines common atomics and a suite of definitions and tooling in different languages to ensure compatibility across multiple projects and developers.

Atomics are *composable* but not *inheritable*. Atomics can be thought of as the leaves to all structured data.


# Our Atomics 

## Scalars

Scalars by definition are atomics, in that they only hold a single value. 

The classic scalars are atomics:
- `string`
- `integer`
- `float`
- `boolean`

We also define additional scalars with a more narrow focus:

- `DateTime` - An ISO8601 value that represents a date and time, typically in UTC
- `Email` - Email address that may or may not be valid over time
- `Website` - Web address that may or may not be valid over time
- `Money` - Monetary value, in USD
- `Permission` - The right to perform an action in the context of Role-Based Access Controls (RBAC)

## Objects

Atomic objects are a collection of named scalar fields. 

As a whole they cannot be separated, thus if one field is accessible in an atomic object, then all other fields are equally accessible. This has technical implications on the storage, searchability, and presentation of atomic data across different platforms.

### Person

Representation of a digital identity or account on our platform(s).

```json
{
  "id": "012345678",
  "name": "Chase McManning",
  "username": "mcmanning.1",
}
```

### Contact

An external individual or organization that serves as a point of contact. 

```json
{
  "name": "Chase McManning",
  "title": "Foo bar",
  "email": "foo@bar.com",
  "phone": "123-FOO-BARR",
  "url": "https://github.com/McManning"
}
```

### Address

A physical location.

```json
{
  "line1": "123 Fake St",
  "line2": "Suite 103",
  "city": "Columbus",
  "state": "OH",
  "postal": "43210"
}
```

### Job

Employment information, typically composed with individual but may also be composed into the representation of a job posting or career path. 

```json
{
  "title": "Senior Enterprise Applications Developer",
  "code": "01234",
  "group": "4321",
  "fte": 100,
}
```

### Organization

A department, cost center, college, or third party company.

```json
{
  "id": "CC01234",
  "name": "Office of Research Information Systems"
}
```

>TODO: I split this into colleges and cost centers in PI Portal and other places. But there's really not much difference since colleges are also CCs. But College *does* have a particular meaning in our world so maybe it's worth keeping separate?

### Sponsor

Individual, company, institution or organization that takes on legal responsibility for the initiation, management and/or financing of research.

```json
{
  "id": "SP-012345",
  "name": "Department of Energy",
  "type": "Federal"
}
```

### Document

An external file (pdf, mp4, png) stored within some service.

```json
{
  "id": "MyFileID",
  "name": "Protocol_rev2 copy (2) (3) final.pdf",
  "size": "20 MB",
}
```

### Reference

A lightweight representation of a group of atomics. Groups may also be composed of references to represent relationships between one-another (see **Grouping** for details).

```json
{
  "id": "2023X0014",
  "name": "A Study of Scarlet and Gray",
  "category1": "Category Level 1",
  "category2": "Category Level 2",
  "category3": "Category Level 3"
}
```

A reference supports up to 3 levels of hierarchical categorization for a target resource.


>TODO: I just use `kind` rather than full categories in Catalog (where kind is defined as the deepest non-empty category). For reference UI components, that's all we use. Any reason not to keep that strategy?

### Ontology

```json
{
  // ...
}
```

>TODO: I want standarization on ontology data sources across systems. Future support for Ontobee integration + our own ontologies for research data / organizational data. Needs discussion on what this looks like. A lot of class properties are relational. Take a look at https://github.com/INCATools/ontology-development-kit and https://obofoundry.org/


# Using Atomics

Atomics may be aggregated, enumerated, sorted, grouped, and so forth within a resource. 

## Aggregation 

Aggregation may occur on one or all fields of atomic objects.

For an example, we may aggregate unique addresses by country or state. Or we aggregate resources by the associated people.

## Enumeration

Some data structures may specify an enumeration of atomics. For example, a research study may have an enumeration of people who are associated with that study.

Enumerations *should* maintain the same type of atomic for all values, but edge cases allow for multiple types to be used. Support information for a product may point to a Person within our own company or to an external Contact. 

## Sorting

Atomics may be sorted on. The definition of what is "sorted" depends on the type of atomic. Strings may be A-Z sorted, integers 0-9, but more complicated types like Person or Address may require a unique definition of "sorted".

## Grouping

Multiple atomics may be composed into a single group to form a more complex data structure. 

For example, an `OSU Profile` may be composed of a `Person`, multiple `Addresses`, primary and secondary `Email`, and multiple `Job` profiles.

A common pattern is to define a `Resource` group that is composed of atomics and can be referenced by other resources via a `Reference` atomic:

```json
{
  // We start what a Reference atomic would need
  "id": "0123456789",
  "name": "Profile of Chase McManning",
  "category1": "Profile",
  "category2": "Staff",
  "category3": "Development",
  
  // And then everything else are atomics

  "email": "mcmanning.1@osu.edu",
  "role": {
    // Job atomic
  },
  "addresses": [
    {
      // Address atomic
    },
    {
      // Address atomic
    }
  ],
  "manager": {
    // Person atomic
  }
}
```

Note that complex data structures are typical and fine for integrations, as long as every leaf of that data structure is an atomic. For example:

```json
{
  "id": "2023X0014",
  "name": "A Study in Scarlet and Gray",
  
  "summary": {
    "objectives": {
      "summary": "string atomic",
      "proposalDocuments": [
        // Document atomics
      ]
    }
  },
  "personnel": {
    "investigators": [
      // Person atomics
    ],
    "keyPersonnel": [
      {
        "user": {
          // Person atomic
        },
        "activities": [
          "string atomics"
        ]
      }
    ]
  }
}
```

For role-based access controls, a role may be composed of multiple child roles, people assigned to that role, and permissions. The leaves of the directed acyclic graph of roles will, again, *always* be atomics:

```json
{
  "name": "Admin",
  "roles": [
    {
      "name": "Publisher",
      "permissions": [
        // Permission atomics
      ],
      "users": [
        // Person atomics
      ]
    }
  ],
  "permissions": [
    // Permission atomics
  ],
  "users": [
    // Person atomics
  ]
}
```
