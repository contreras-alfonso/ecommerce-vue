import { boot } from 'quasar/wrappers';
import { useAuth } from 'src/stores/auth-store';

export default boot(({ router }) => {
  const authStore = useAuth();

  router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.meta?.requiresAuth || false;
    const allowedRoles = (to.meta?.rol as string[]) ?? [];

    await authStore.verify();

    if (requiresAuth) {
      try {
        if (
          !authStore.isAuthenticated ||
          !allowedRoles.some((role) => authStore.user?.roles.includes(role))
        ) {
          return next('/');
        } else {
          next();
        }
      } catch (error) {
        console.error(error);
        return next('/');
      }
    } else {
      next();
    }
  });
});
