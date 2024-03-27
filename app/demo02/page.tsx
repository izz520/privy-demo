"use client"
import { useLinkAccount, useLogin, useLogout, usePrivy } from '@privy-io/react-auth'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { login, logout, user, ready, unlinkEmail, createWallet } = usePrivy()
  useEffect(() => {
    const getUserInfo = async () => {
      if (!user) return;
      console.log("user", user);
      const isBinded = !!user.google || !!user.email;
      if (!isBinded) return linkEmail();
      await loginEmmai();
    }
    if (ready && user) {
      getUserInfo()
    }
  }, [ready, user])
  const { linkEmail } = useLinkAccount({
    onSuccess: async () => {
      // login success
      console.log("bind success");
      //create wallet
      await loginEmmai()
    },
    onError: () => {
      // user cancel bind or bind error need logout
      console.log("cancel bind or bind error exec logout");
      logout()
    },
  });
  const loginEmmai = async () => {
    try {
      if (isLoading || !user) return;
      setIsLoading(true)
      const embeddedWallet = user.linkedAccounts.find((account) => account.type === "wallet" && account.walletClientType === 'privy');
      if (!embeddedWallet) {
        console.log("start create wallet");
        const wallet = await createWallet();
        console.log("wallet",wallet);
      }
      console.log("start login emmai");
    } catch (err) {
      console.log("loginEmmai=>err",err);
    }finally{
      setIsLoading(false)
    }

  }
  return (
    <div className='flex justify-center items-center flex-col gap-3'>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      <button onClick={() => unlinkEmail("xjh15779880368@gmail.com")}>Un Link Email</button>

    </div>
  )
}

export default page