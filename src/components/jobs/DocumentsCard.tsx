import { useRef } from 'react';
import type { JobDocument } from '../../data/models/document';
import {
  useDocumentsByJob,
  useAddDocument,
  useRemoveDocument,
} from '../../hooks/useDocuments';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatUK } from '../../lib/dates';

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function humaniseBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentsCard({ jobId }: { jobId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: documents, isLoading } = useDocumentsByJob(jobId);
  const addDocument = useAddDocument(jobId);
  const removeDocument = useRemoveDocument(jobId);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    const files = Array.from(fileList);
    for (const file of files) {
      const dataUrl = await readAsDataUrl(file);
      await addDocument.mutateAsync({
        jobId,
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        size: file.size,
        dataUrl,
      });
    }
    if (inputRef.current) inputRef.current.value = '';
  }

  async function handleRemove(doc: JobDocument) {
    if (!window.confirm(`Remove "${doc.name}"?`)) return;
    await removeDocument.mutateAsync(doc.id);
  }

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Documents</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Tenders, drawings, BoQs, quotes — kept with the job.
          </p>
        </div>
        <Button
          onClick={() => inputRef.current?.click()}
          disabled={addDocument.isPending}
        >
          {addDocument.isPending ? 'Adding…' : 'Add document'}
        </Button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => void handleFiles(e.target.files)}
        />
      </div>

      <div className="mt-4">
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading…</p>
        ) : !documents || documents.length === 0 ? (
          <p className="text-sm text-slate-500">No documents yet.</p>
        ) : (
          <ul className="divide-y divide-slate-200">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-slate-900">
                    {doc.name}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {humaniseBytes(doc.size)} · added {formatUK(doc.createdAt)}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <a
                    href={doc.dataUrl}
                    download={doc.name}
                    className="text-sm font-medium text-brand-600 hover:text-brand-700"
                  >
                    Download
                  </a>
                  <Button
                    variant="danger"
                    onClick={() => void handleRemove(doc)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
