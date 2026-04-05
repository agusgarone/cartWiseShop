'use strict';

/**
 * WHATWG URL before any react-native import. react-native-url-polyfill/auto imports
 * react-native first, so RN's stub URL (throws on .protocol) can win briefly — Supabase
 * hits .protocol on init.
 */
const {URL, URLSearchParams} = require('whatwg-url-without-unicode');

globalThis.URL = URL;
globalThis.URLSearchParams = URLSearchParams;
