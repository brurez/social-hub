import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

// Component that renders a link to using MUI and react-router-dom
export function AppLink({ to, children, props }) {
  return (
    <RouterLink to={to}>
      <Link {...props}>{children}</Link>
    </RouterLink>
  );
}
