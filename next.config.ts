import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // The HTML transcription of the first-edition whitepaper was removed;
      // the canonical whitepaper is the PDF (second edition).
      {
        source: '/introduction/whitepaper',
        destination: '/parallax.pdf',
        permanent: true,
      },
      {
        source: '/:locale(en|de|es|fil|fr|ja|ko|pt-BR|zh-CN)/introduction/whitepaper',
        destination: '/parallax.pdf',
        permanent: true,
      },
      // The bitcoin.org-style audience pages were replaced by pages targeting
      // the protocol's actual audiences.
      {
        source: '/introduction/parallax-for-individuals',
        destination: '/introduction/parallax-for-bitcoiners',
        permanent: true,
      },
      {
        source: '/:locale(en|de|es|fil|fr|ja|ko|pt-BR|zh-CN)/introduction/parallax-for-individuals',
        destination: '/:locale/introduction/parallax-for-bitcoiners',
        permanent: true,
      },
      {
        source: '/introduction/parallax-for-businesses',
        destination: '/introduction/parallax-for-developers',
        permanent: true,
      },
      {
        source: '/:locale(en|de|es|fil|fr|ja|ko|pt-BR|zh-CN)/introduction/parallax-for-businesses',
        destination: '/:locale/introduction/parallax-for-developers',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/.well-known/nostr.json',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
