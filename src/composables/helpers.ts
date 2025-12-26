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
    if (!(error instanceof AxiosError)) {
      notifyError('Ocurrió un error desconocido');
      return;
    }

    const data = error.response?.data as ErrorResponse | undefined;

    if (!data) {
      notifyError('Error inesperado');
      return;
    }

    if (data.fieldErrors && Object.keys(data.fieldErrors).length > 0) {
      const messages = Object.values(data.fieldErrors)
        .map((msg) => `- ${msg}`)
        .join('<br>');

      notifyError(messages, true);
      return;
    }

    notifyError(data.msg ?? 'Error inesperado');
  };

  const truncate = (value: string, limit: number): string => {
    return value.length < limit ? value : value.slice(0, limit) + '...';
  };

  const toCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-PE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return {
    onSpinner,
    openUrl,
    formatAmount,
    handleApiError,
    truncate,
    toCurrency,
  };
}
