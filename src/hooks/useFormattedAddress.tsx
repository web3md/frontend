import { useContext, useState } from "react";

import useAsyncEffect from "use-async-effect";
import { EthersContext } from "../context/EthersContext";

const useFormattedAddress = (address: string) => {
    const [ensName, setENSName] = useState<string | null>(null);
    const { signer } = useContext(EthersContext);
    useAsyncEffect(async () => {
        if (signer) {
            setENSName(await signer.provider.lookupAddress(address));
        }
    }, [address]);
    return ensName || address!.substring(0, 6) + "..." + address!.substring(address!.length - 4, address!.length);
};

export default useFormattedAddress;
