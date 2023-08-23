# [1.1.0](https://github.com/osuresearch/types/compare/v1.0.3...v1.1.0) (2023-08-23)


### Bug Fixes

* change Reference to Resource to clarify purpose ([2f4cfeb](https://github.com/osuresearch/types/commit/2f4cfebcc35eaa5ebb1fbcf165b7d448ae906a42))
* do not use `DateTime` for nested fields to improve schema.org compliance ([f81a5b4](https://github.com/osuresearch/types/commit/f81a5b43b589150f358a38d4e07282f3b94b4a32))
* use strings rather than `DateTime` for fields that need to be date formatted but not as objects ([a2992d0](https://github.com/osuresearch/types/commit/a2992d092ea5b13481a24b2029042b4bb09f1888))


### Features

* **Action:** add `object`, `result`, `retractedTime` fields ([d9cc402](https://github.com/osuresearch/types/commit/d9cc4028182e85395b49a062788ba632a798ce4d))
* add `RetractedActionStatus` ([db8965c](https://github.com/osuresearch/types/commit/db8965ce859d26b06c027c05c9925e81b9a24872))

## [1.0.3](https://github.com/osuresearch/types/compare/v1.0.2...v1.0.3) (2023-04-26)


### Bug Fixes

* `EmailMessage.messageAttachment` to use `MediaObject` to support a wider range of content types ([8678809](https://github.com/osuresearch/types/commit/86788092c70d8fbe767912c91d223be6c3fc08b1))

## [1.0.2](https://github.com/osuresearch/types/compare/v1.0.1...v1.0.2) (2023-04-24)


### Bug Fixes

* change `Reference` categories to `categoryLvl1-4` to be consistent resource types ([f147017](https://github.com/osuresearch/types/commit/f147017e471908e5b60c7bc538234574ff476465))

## [1.0.1](https://github.com/osuresearch/types/compare/v1.0.0...v1.0.1) (2023-04-21)


### Bug Fixes

* `Action` actor and status should be nullable to support future potential actions ([3272f58](https://github.com/osuresearch/types/commit/3272f580002be1f2deef6db26cb0ac9520a1284d))

# 1.0.0 (2023-04-18)


### Features

* semantic release time 🚀 ([4b57acf](https://github.com/osuresearch/types/commit/4b57acfc36a7e27cd0e63e58d9ff71a2869006b1))
