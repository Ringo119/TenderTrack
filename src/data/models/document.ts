import { z } from 'zod';

/**
 * A file attached to a job (tender documents, drawings, BoQs, quotes, etc.).
 * For the local prototype the file contents are stored inline as a base64 data
 * URL in IndexedDB. A future backend would store these in object storage and
 * keep only a URL here — the repository seam keeps that swap isolated.
 */
export const jobDocumentSchema = z.object({
  id: z.string(),
  jobId: z.string(),
  name: z.string(),
  mimeType: z.string(),
  size: z.number().int().nonnegative(),
  dataUrl: z.string(),
  createdAt: z.string(),
});

export type JobDocument = z.infer<typeof jobDocumentSchema>;
