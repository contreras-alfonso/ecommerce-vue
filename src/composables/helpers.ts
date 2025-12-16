import { useQuasar, openURL } from 'quasar';

export function useHelpers() {
  const $q = useQuasar();

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

  return {
    onSpinner,
    openUrl,
    formatAmount,
  };
}
