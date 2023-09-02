function checkPermissions(userInformation, permissions, branchPermissions, branch) {
  let permissionStatus = false;

  permissions.map((permission) => {
    permissionStatus = permissionStatus || userInformation.permission.includes(permission);
  });
  branchPermissions.map((permission) => {
    permissionStatus = permissionStatus || (userInformation.permission.includes(permission) && userInformation.branch == branch);
  });
  return permissionStatus;
}

export default checkPermissions;
