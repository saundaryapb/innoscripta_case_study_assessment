import LayoutComponent from "../components";
import { publicRoutes } from "../routes";

const Layout = () => {
   return <LayoutComponent routes={publicRoutes} />;
};

export default Layout;
