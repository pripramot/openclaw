/**
 * i18n type definitions for OpenClaw
 */

export type Locale = "en" | "th";

export interface TranslationMeta {
  locale: string;
  language: string;
  direction: "ltr" | "rtl";
}

export interface TranslationCommon {
  welcome: string;
  loading: string;
  error: string;
  success: string;
  cancel: string;
  confirm: string;
  save: string;
  delete: string;
  edit: string;
}

export interface TranslationCommands {
  status: string;
  reset: string;
  new: string;
  compact: string;
  help: string;
  restart: string;
  activation: string;
  think: string;
  verbose: string;
  usage: string;
}

export interface TranslationMessages {
  session_started: string;
  session_reset: string;
  session_compacted: string;
  gateway_restarted: string;
  error_occurred: string;
  connection_lost: string;
  reconnecting: string;
  connected: string;
}

export interface TranslationChannels {
  whatsapp: string;
  telegram: string;
  slack: string;
  discord: string;
  line: string;
  signal: string;
  imessage: string;
}

export interface TranslationErrors {
  not_found: string;
  unauthorized: string;
  forbidden: string;
  internal_error: string;
  invalid_config: string;
  connection_failed: string;
}

export interface TranslationCli {
  gateway_starting: string;
  gateway_started: string;
  onboarding_start: string;
  onboarding_complete: string;
}

export interface Translations {
  meta: TranslationMeta;
  common: TranslationCommon;
  commands: TranslationCommands;
  messages: TranslationMessages;
  channels: TranslationChannels;
  errors: TranslationErrors;
  cli: TranslationCli;
}

export type TranslationKey = string;
