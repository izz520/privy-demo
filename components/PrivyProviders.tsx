'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import {sepolia} from "viem/chains"
const PrivyProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProvider
      appId="cltz920x5019nsatwrwjuup16"
      config={{
        defaultChain:sepolia,
        supportedChains:[sepolia],
        // Customize Privy's appearance in your app
        // appearance: {
        //   theme: 'light',
        //   accentColor: '#676FFF',
        //   logo: 'https://your-logo-url',
        // },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          // createOnLogin: "off",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}

export default PrivyProviders