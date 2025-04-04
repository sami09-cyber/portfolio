declare module "next/dynamic" {
    import {T} from "framer-motion/dist/types.d-6pKw1mTI";
    import {JSX} from "react";

    function dynamic<T = {}>(
        loader: ({minimal}: HologramHumanEnhancedProps) => Promise<{
            readonly default: ({minimal}: { minimal?: any }) => JSX.Element
        }>,
        options?: { ssr: boolean; loading: () => JSX.Element }
    ): React.ComponentType<T>;

    export default dynamic;
}

