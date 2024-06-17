# Overview

A custom theme that powers the Choctaw Veterans Archive

# Changelog

## v1.1.3

-   Update the cache expiry to 10 minutes
-   Update how the veteran data is enqueued locally to always use the rest route `GET` method instead of trying to handle the cached data (which was redundant and caused the bug in the first place).

## v1.1.2

-   Swap pagination for infinite scroll

## v1.1.1

-   Handled page title on searches with react
-   Handled PHP errors
-   Added container gutter back
-   Updated fuzzy searching weighting and included additional decorations properly
-   Updated typography to clamp base font size to 1.6rem
-   Updated pagination bar styles in responsive
-   Updated pagination buttons to always show and be disabled
-   Bug fix: Reset the current page after a user did a search

## v1.1.0

-   Add reCaptcha notices where needed.
-   Add new "Contact" page template.
-   Added Pagination on the Veterans archive page.
-   Added cache expiry for 24 hours.
-   Bug fix: Decorations are handled correctly so they should always display if set.
-   Bug fix: Additional Information columns resize more naturally.

## v1.0.1

-   Trim whitespace and handle errors better on ACF fields
-   Added a better error message to Google reCaptcha failure
-   Fixed search error
-   Fixed deprecated PHP pattern

## v1.0.0

-   Init!
