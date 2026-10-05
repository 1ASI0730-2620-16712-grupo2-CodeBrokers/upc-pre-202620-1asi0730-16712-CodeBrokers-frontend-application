# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.11] - 2026-10-03

### Changed

- Standardized local startup instructions on `npm run dev` for Vue and `cd server` followed by `sh start.sh` for JSON Server.
- Removed the alternative npm server command to keep one documented workflow.

## [0.2.10] - 2026-10-03

### Changed

- Restored the older-adult overview as the default route with a title-only page.
- Kept preferences as a separate sidebar destination.

## [0.2.9] - 2026-10-03

### Changed

- Redirected the older-adult entry route to preferences and removed its redundant overview link.
- Distinguished patients without measurements from patients with outdated records.
- Made the family-care safety notice match whether open alerts are present.

## [0.2.8] - 2026-10-03

### Changed

- Removed development-status wording from the interface and project documentation.
- Renamed the workspace API and removed development-only data controls from the interface.

## [0.2.7] - 2026-10-03

### Changed

- Formatted the root HTML document and verified all supported source files.
- Updated the JSON Server shell script to run through `npx`.

## [0.2.6] - 2026-10-03

### Removed

- Removed the header status label instead of replacing it with another text.

## [0.2.5] - 2026-10-03

### Changed

- Replaced the sprint-specific header label with a neutral status label.

## [0.2.4] - 2026-10-03

### Changed

- Formatted JavaScript, Vue, CSS, JSON and documentation files.
- Added concise JSDoc comments to domain, infrastructure, application and presentation operations.

## [0.2.3] - 2026-10-03

### Changed

- Removed roadmap-oriented text from the interface.
- Disabled unavailable SMS controls without release messaging.
- Simplified source comments to match the concise project style.

## [0.2.2] - 2026-10-03

### Added

- Local REST API with JSON Server, database resources and API route rewriting.
- Development and production API base URL configuration.
- This changelog.

### Changed

- The frontend now retrieves patients, alerts, records and interventions through Axios.
- Locale identifiers and catalog filenames were aligned to `en` and `es`.
- Setup documentation now explains how to run the mock server and frontend separately.

### Removed

- Automated test sources and test-only dependencies to match the Learning Center reference structure.

## [0.2.1] - 2026-10-03

### Added

- Sprint 2 professional and family dashboards.
- Alert priority ordering, patient search, filters and history.
- Care intervention timeline and notification preferences.
- English and Spanish localization, responsive design and accessibility improvements.
- Initial older-adult route required by the Sprint 2 technical foundation.

### Security

- Role selection is not an authentication or authorization boundary.
