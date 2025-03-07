import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("","./routes/layout.tsx",[
        index("./routes/home.tsx"),
        route("products/:subCateId","./routes/products.tsx")
    ]),
] satisfies RouteConfig;
