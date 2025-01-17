# Expo Linking API Android Deep Link Issue

This repository demonstrates a bug in the Expo `Linking` API on Android. When the app is already open and a deep link is tapped, the `Linking.addEventListener` callback is not always triggered, preventing proper deep link handling.

## Bug Description
The `Linking.addEventListener` for deep links on Android exhibits inconsistent behavior when the app is already running.  Sometimes the listener works as expected, but other times, it fails to fire the callback function when a deep link is activated, making it difficult to properly handle user navigation from external sources.

## Reproduction Steps
1. Install and run the app.
2. Open a web browser and navigate to a URL that triggers a deep link (e.g., `myapp://some-path`).
3. Observe that the app may or may not respond to the deep link, even if it's already open.

## Solution
The provided solution uses a combination of techniques to ensure deep link handling is reliable.  It utilizes the `Linking.getInitialURL` in addition to `Linking.addEventListener` to handle the initial launch case, and ensures that listeners are properly removed after use to avoid unexpected behavior.