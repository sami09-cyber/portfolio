declare module "next/dynamic" {
    import {T} from "framer-motion/dist/types.d-6pKw1mTI";

    function dynamic<T = {}>(
        loader: () => Promise<{ default: React.ComponentType<T> }>,
        options?: { loading: () => JSX.Element }
    ): React.ComponentType<T>;

    export default dynamic;
}
