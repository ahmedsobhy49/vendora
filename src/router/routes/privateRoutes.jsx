import adminRoutes from "./adminRoutes";
import sellerRoutes from "./sellerRoutes";
import userRoutes from "./userRoutes";

const privateRoutes = [...adminRoutes, ...sellerRoutes, ...userRoutes];

export default privateRoutes;
