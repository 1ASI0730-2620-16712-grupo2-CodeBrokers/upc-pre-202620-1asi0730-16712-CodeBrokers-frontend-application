# Accessibility and internationalization review

## Scope

This review covers the Sprint 2 Web Application views available to healthcare professionals, family caregivers, and older adults.

## Internationalization

- English (`en_US`) is the default and fallback locale.
- Latin American Spanish uses the `es_419` locale.
- Legacy values stored as `en` or `es` are migrated automatically.
- Browser language tags use the BCP 47 equivalents `en-US` and `es-419`.
- Dates are formatted with the active locale and the documented Lima time zone.

## Keyboard and assistive technology

- A skip link moves focus to the main content.
- Route changes move focus to the main landmark and announce the translated page title.
- Interactive controls expose visible focus styles.
- Navigation icons that do not add meaning are hidden from assistive technology.
- Loading, empty, error, and saved states use status semantics.
- Form errors are associated with their corresponding controls.
- Reduced-motion preferences disable animations and transitions.

## Automated review

The automated review was run with Lighthouse 13.5.0 against the following routes with the local API available:

1. `/#/professional`
2. `/#/professional/patients/P-101`
3. `/#/family`
4. `/#/older-adult`
5. `/#/older-adult/preferences`

Only the **Accessibility** category was selected. Automated results complement rather than replace keyboard and screen-reader review.

| Route | Date | Score | Critical findings | Exceptions |
| --- | --- | ---: | ---: | --- |
| Professional overview | 2026-10-05 | 100 | 0 | None |
| Patient detail | 2026-10-05 | 100 | 0 | None |
| Family overview | 2026-10-05 | 100 | 0 | None |
| Older-adult overview | 2026-10-05 | 100 | 0 | None |
| Preferences | 2026-10-05 | 100 | 0 | None |

## Manual checklist

- Navigate all controls using `Tab` and `Shift+Tab`.
- Activate links and buttons using the keyboard.
- Confirm that focus remains visible and follows route changes.
- Change between English and Spanish and confirm the page title and `lang` attribute.
- Trigger loading, empty, validation, and error states and confirm their announcements.
- Review desktop and mobile layouts at 200% browser zoom.
