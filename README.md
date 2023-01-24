# Remix Hard Redirect

This repo is an example of how one might enable hard redirects in remix. It contains an example app, along with patches to enable the functionality in the remix packages.

## Problem

We have a form that may respond with a redirect, conditional upon the submitted data. Think of a login page that navigates to an external app upon success, but only appends an error message to the form upon failure.

In order to support the noscript case, the POST must respond with a redirect.

However, in the hydrated case, remix captures the POST and converts it into a fetch. A redirect to a fetch request suggests that the requested data lives elsewhere, not that the page should be navigated elsewhere. In order to deal with this, remix converts the redirect to a 204 with a custom header, then performing a secondary redirect in the browser.

The problem with this approach is that if the redirect origin is identical to the initial page origin, remix assumes the redirect should be handled internally by the app router; this is often a false assumption.

In order to support the noscript case, we must still return a redirect response. But since remix does not support any data payload in a redirect, the only way to pass data to the hydrated fetch case is via header.

The proposed solution is to set an `X-Remix-Hard-Redirect` header, alerting the client routing to perform an external redirect.

## Setup

This repo uses yarn. To install dependencies, you can simply run:

```sh
yarn
```

## Development

After install dependencies, to run the development server:

```sh
yarn dev
```
