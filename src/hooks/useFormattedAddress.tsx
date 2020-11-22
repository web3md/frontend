import { useState } from "react";

import useAsyncEffect from "use-async-effect";
import { mainnetProvider } from "../context/EthersContext";

const useFormattedAddress = (address: string) => {
    const [ensName, setENSName] = useState<string | null>(null);
    useAsyncEffect(async () => {
        setENSName(await mainnetProvider.lookupAddress(address));
    }, [address]);
    return ensName || address!.substring(0, 6) + "..." + address!.substring(address!.length - 4, address!.length);
};

export default useFormattedAddress;
