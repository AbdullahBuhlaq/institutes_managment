function checkPermissions(userInformation, permissions, branchPermissions, branch) {
  let permissionStatus = true;

  permissions.map((permission) => {
    permissionStatus = permissionStatus || userInformation.permission.includes(permission);
  });
  branchPermissions.map((permission) => {
    permissionStatus = permissionStatus || (userInformation.permission.includes(permission) && userInformation.branch == branch);
  });
  console.log(permissionStatus);
  return permissionStatus;
}

export default checkPermissions;
