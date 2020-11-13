import React, { useEffect, useMemo, useState } from "react";

import { ethers } from "ethers";
import useAsyncEffect from "use-async-effect";
import useEthereum from "../hooks/useEthereum";

export const EthersContext = React.createContext({
    provider: undefined as ethers.providers.JsonRpcProvider | undefined,
    signer: undefined as ethers.providers.JsonRpcSigner | undefined,
    chainId: 0,
    address: null as string | null,
    ensName: null as string | null
});

// tslint:disable-next-line:max-func-body-length
export const EthersContextProvider = ({ children }) => {
    const ethereum = useEthereum();
    const [chainId, setChainId] = useState<number>(1);
    const provider = useMemo(() => {
        return new ethers.providers.AlchemyProvider("kovan", "eRvHBkwNnm65K0KiQbNihiTyjktIGtbo");
    }, []);
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
    const [address, setAddress] = useState<string | null>(null);
    const [ensName, setENSName] = useState<string | null>(null);

    useAsyncEffect(async () => {
        if (ethereum) {
            const web3 = new ethers.providers.Web3Provider(ethereum);
            setSigner(await web3.getSigner());
        }
    }, [ethereum]);

    useEffect(() => {
        if (ethereum) {
            const onAccountsChanged = async () => {
                if (ethereum) {
                    const accounts = await ethereum.request({ method: "eth_accounts" });
                    if (accounts?.[0]) {
                        setAddress(accounts[0]);
                    }
                }
            };
            const onChainChanged = () => {
                if (ethereum) {
                    setChainId(Number(ethereum.chainId));
                }
            };
            onAccountsChanged();
            onChainChanged();
            ethereum.on("accountsChanged", onAccountsChanged);
            ethereum.on("chainChanged", onChainChanged);
            return () => {
                ethereum?.off("accountsChanged", onAccountsChanged);
                ethereum?.off("chainChanged", onAccountsChanged);
            };
        }
    }, [ethereum]);

    useAsyncEffect(async () => {
        if (signer && address) {
            const ens = await signer.provider.lookupAddress(address);
            setENSName(ens);
        }
    }, [signer, address]);

    return (
        <EthersContext.Provider
            value={{
                provider,
                signer,
                chainId,
                address,
                ensName
            }}>
            {children}
        </EthersContext.Provider>
    );
};

export const EthersContextConsumer = EthersContext.Consumer;
