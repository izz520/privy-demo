import { useLogin, useWallets, usePrivy, useLinkAccount, useCreateWallet } from '@privy-io/react-auth';
import React, { useState } from 'react'

const usePrivyLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { logout } = usePrivy();
  const { wallets } = useWallets()
  const { login } = useLogin({
    onComplete: async (user, isNewUser, wasAlreadyAuthenticated) => {
      console.log(user, isNewUser, wasAlreadyAuthenticated);
      const embeddedWallet = user.linkedAccounts.find((account) => account.type === "wallet" && account.walletClientType === 'privy');
      const isCreatedWallet = !!embeddedWallet
      const isBinded = !!user.google || !!user.email;
      // exec bind email
      if (!isBinded) return linkEmail();
      // exec create wallet
      if(!isCreatedWallet)return checkAndCreateWallet()
      // get emmmai token
      await loginEmmai();
    },
    onError: (error) => {
      setIsLoading(false)
      console.log("privy login error", error);
    },
  });

  const { linkEmail } = useLinkAccount({
    onSuccess: async () => {
      // login success
      console.log("bind success");
      //create wallet
      await checkAndCreateWallet()
    },
    onError: () => {
      setIsLoading(false)
      // user cancel bind or bind error need logout
      console.log("cancel bind or bind error exec logout");
      logout()
    },
  });
  const { createWallet } = useCreateWallet({
    onSuccess: async (wallet) => {
      console.log(wallet);
      console.log("create wallet success");
      await loginEmmai();
    },
    onError: (error) => {
      setIsLoading(false)
      console.log("privy create wallet error", error);
    },
  });
  const checkAndCreateWallet = async () => {
    // check current user is created wallet
    const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
    console.log("embeddedWallet", embeddedWallet);
    if (embeddedWallet) return loginEmmai()
    await createWallet();
  }
  const loginEmmai = async () => {
    console.log("start login emmai");
    setIsLoading(false)
  }

  const loginPrivy = () => {
    setIsLoading(true)
    login()
  }

  return {
    isLoading,
    loginPrivy
  }
}

export default usePrivyLogin