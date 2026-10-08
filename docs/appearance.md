# Appearance

The desktop right navigation has a circular light/dark switch. With no saved preference, it follows the system appearance; a manual choice is saved in the `debuginn-theme` browser storage key. Removing that key restores system following. The head applies the resolved `html[data-theme]` before loading stylesheets, and other tabs synchronize through browser storage events. On phones and compact touch screens, only section dots stay visible; the navigation rail and appearance switch are hidden.

The theme owns the navigation and each section owns its colors. Photo sections keep their original images and use a dark veil for readable foreground content. Closing uses its own surfaces, text colors, hover contacts, QR dialog, and iridescent wordmark. The Hugo closing configuration remains compatible with the original button-based layout when contact mode is omitted.

The Hugo development server emits a no-referrer policy so the image host accepts local previews, and omits production analytics. Static production builds retain the normal image policy and configured analytics.

FlyBay's Hugo adapter, React mount, official logo variants, announcement styles, and poster controls remain in the FlyBay submodule. They use the host's resolved appearance and the native FlyBay palette; there is no second theme controller in the embed. Its hero actions retain absolute FlyBay destinations. Plural's existing adapter follows the same host attribute, with an outer-screen fallback before its component hydrates.
