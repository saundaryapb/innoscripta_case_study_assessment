import LayoutComponent from "../components";
import { privateRoutes } from "../routes";

const Layout = () => {
   return <LayoutComponent routes={privateRoutes} />;
};

export default Layout;
