"use client"
import usePrivyLogin from "@/hook/usePrivyLogin";
import { useCreateWallet, useLinkAccount, useLogin, usePrivy, useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";
import { use, useEffect, useMemo } from "react";

export default function Home() {
  const { logout, user, linkWallet, linkPhone, unlinkEmail, unlinkGoogle } = usePrivy();
  const { wallets } = useWallets()
  const {loginPrivy,isLoading}  =usePrivyLogin();
  const wallet = useMemo(() => {
    return wallets[0]
  }, [wallets])
  const getProvider = async () => {
    const provider = await wallet.getEthereumProvider();
    console.log("provider", provider);
    return provider
  }
  const getSigneture = async () => {
    try {
      const provider = await getProvider();
      const etherProvider = new ethers.providers.Web3Provider(provider);
      console.log("etherProvider", etherProvider);
      const signer = etherProvider.getSigner();
      console.log("signer", signer);
      const res = await signer.signMessage("Hello YaSol")
      console.log("res", res);
    } catch (err: any) {
      console.log(err.message);
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={loginPrivy}>{isLoading ? 'loading..' : 'Login'}</button>
      <button onClick={logout}>logout</button>
      <div>---------------Bind----------------</div>
      {/* <button onClick={linkGoogle}>Link Google</button> */}
      <button onClick={linkWallet}>Link Wallet</button>
      {/* <button onClick={linkEmail}>Link Email</button> */}
      <button onClick={linkPhone}>Link Phone</button>
      <div>---------------Remote Bind----------------</div>
      <button onClick={() => unlinkGoogle("xjh15779880368@gmail.com")}>Un Link Google</button>
      {/* <button onClick={linkWallet}>Link Wallet</button> */}
      <button onClick={() => unlinkEmail("xjh15779880368@gmail.com")}>Un Link Email</button>
      {/* <button onClick={linkPhone}>Link Phone</button> */}
      <button onClick={getSigneture}>getSigneture</button>
    </main>
  );
}
