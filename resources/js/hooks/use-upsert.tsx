import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type SafeFormData = Record<string, string | number | boolean | null>;

interface UseUpsertFormProps<T extends SafeFormData> {
  initialData: T;
  existingId?: number | string;
  storeRoute: string;
  updateRoute: (id: number | string) => string;
  onSuccess?: () => void;
}

export function useUpsertForm<T extends SafeFormData>({ initialData, existingId, storeRoute, updateRoute, onSuccess }: UseUpsertFormProps<T>) {
  const form = useForm<T>(initialData);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (existingId) {
      form.put(updateRoute(existingId), {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
        onError: (errors) => console.error(errors),
      });
    } else {
      form.post(storeRoute, {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
        onError: (errors) => console.error(errors),
      });
    }
  };

  return { ...form, onSubmit };
}
