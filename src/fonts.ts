import { IBM_Plex_Mono } from 'next/font/google'
import localFont from 'next/font/local'

export const satoshi = localFont({
  src: '../public/fonts/satoshi/Satoshi-Variable.woff2',
});

export const clash_display = localFont({
      src: '../public/fonts/clash_display/ClashDisplay-Variable.woff2',
});

export const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],

});




