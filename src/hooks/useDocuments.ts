import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { documentRepository } from '../data/repositories';
import type { JobDocument } from '../data/models/document';

const KEY = ['documents'];

export function useDocumentsByJob(jobId: string | undefined) {
  return useQuery({
    queryKey: [...KEY, jobId],
    queryFn: () => documentRepository.listByJob(jobId!),
    enabled: !!jobId,
  });
}

export function useAddDocument(jobId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<JobDocument, 'id' | 'createdAt'>) =>
      documentRepository.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [...KEY, jobId] }),
  });
}

export function useRemoveDocument(jobId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => documentRepository.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [...KEY, jobId] }),
  });
}
