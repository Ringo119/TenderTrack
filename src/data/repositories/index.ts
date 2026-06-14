import { DexieClientRepository } from './dexie/clientRepo';
import { DexieJobRepository } from './dexie/jobRepo';
import { DexieInvoiceRepository } from './dexie/invoiceRepo';
import { DexieSettingsRepository } from './dexie/settingsRepo';
import { DexieDocumentRepository } from './dexie/documentRepo';

/**
 * The active repository set. This is the ONLY file to change when moving from
 * the local Dexie store to a hosted backend (e.g. Supabase): swap these
 * constructions for the new implementations.
 */
export const clientRepository = new DexieClientRepository();
export const jobRepository = new DexieJobRepository();
export const invoiceRepository = new DexieInvoiceRepository();
export const settingsRepository = new DexieSettingsRepository();
export const documentRepository = new DexieDocumentRepository();
