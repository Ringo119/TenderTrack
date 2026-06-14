import { useMemo } from 'react';
import { useJobs } from './useJobs';
import { useInvoices } from './useInvoices';
import { useClients } from './useClients';
import { buildReminders, type Reminder } from '../lib/reminders';

/** Combines jobs, invoices and clients into the active reminder list. */
export function useReminders(): { reminders: Reminder[]; isLoading: boolean } {
  const { data: jobs, isLoading: jobsLoading } = useJobs();
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();
  const { data: clients } = useClients();

  const reminders = useMemo(
    () => buildReminders(jobs ?? [], invoices ?? [], clients ?? []),
    [jobs, invoices, clients],
  );

  return { reminders, isLoading: jobsLoading || invoicesLoading };
}
