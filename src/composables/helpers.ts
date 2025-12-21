import { AxiosError } from 'axios';
import { useQuasar, openURL } from 'quasar';
import { useNotify } from 'src/composables/notify';
import type { ErrorResponse } from 'src/types/error-response';

export function useHelpers() {
  const $q = useQuasar();
  const { notifyError } = useNotify();

  const onSpinner = (status: boolean) => {
    if (status) {
      $q.loading.show({
        backgroundColor: 'white',
        spinnerColor: 'primary',
        spinnerSize: 40,
      });
      //   $q.loading.show();
    } else {
      $q.loading.hide();
    }
  };

  const openUrl = (url: string) => {
    openURL(url, undefined, {
      noopener: true,
      noreferrer: true,
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleApiError = (error: unknown) => {
    if (error instanceof AxiosError) {
      const data = error.response?.data as ErrorResponse;
      notifyError(data?.msg ?? 'Error inesperado');
    } else {
      notifyError('Ocurrió un error desconocido');
    }
  };

  const truncate = (value: string, limit: number): string => {
    return value.length < limit ? value : value.slice(0, limit) + '...';
  };

  return {
    onSpinner,
    openUrl,
    formatAmount,
    handleApiError,
    truncate,
  };
}
