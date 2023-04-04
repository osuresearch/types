## Adding Atomics

Few rules in no particular order:

- Dig around types on schema.org to see if there's a close enough match to what you're looking to add. Ideally, we want to keep our types as much a subset of theirs as possible.
- If you believe your type does not have general use and is for one or two systems, it probably doesn't fit here.
- Fields of atomics need to be consistent in their name to type mapping across all atomics.
  - For example `Numeric` atomic has a `value: number` field. This means you **cannot** create a `value: string` on another atomic type. This is both for ensuring mappable GraphQL input types as well as matching how schema.org defines properties.
  - If you want to use a property on schema.org that does support multiple value types, you will most likely need to pick one of them as our implementation. But this is open for discussion as we do have some fields that support multiple types, e.g. `Agent` fields. 

Update the following places when adding a new type or modifying a type:

- [ ] TypeScript definition
- [ ] GraphQL type definition 
- [ ] GraphQL input definition
- [ ] GraphQL `AnyAtomicInput` definition - merge in new fields that were introduced by your changes
