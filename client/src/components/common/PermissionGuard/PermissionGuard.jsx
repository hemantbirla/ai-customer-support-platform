import PropTypes from "prop-types";
import usePermissions from "../../../hooks/usePermissions";

const PermissionGuard = ({ permission, fallback = null, children }) => {
  const permissions = usePermissions();

  if (!permissions[permission]) {
    return fallback;
  }

  return children;
};

PermissionGuard.propTypes = {
  permission: PropTypes.string.isRequired,
  fallback: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default PermissionGuard;
