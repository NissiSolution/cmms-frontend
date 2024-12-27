export const hasPermission = (userRole, module, action) => {
    if (!userRole || !userRole.permissions) return false;
    return userRole.permissions[module]?.includes(action);
  };
  