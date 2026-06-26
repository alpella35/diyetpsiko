import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';

export default defineConfig({
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: resolve(__dirname, 'src', 'prerender.jsx'),
      additionalPrerenderRoutes: [
        '/', '/hizmetler', '/psiko-beslenme', '/duygusal-yeme',
        '/online-terapi', '/uzmanlik-alanlari', '/hakkimizda',
        '/iletisim', '/blog', '/admin',
        '/blog/psiko-beslenme-nedir',
        '/blog/duygusal-yeme-dongusu',
        '/blog/online-terapi-verimli-mi',
        '/blog/izmir-psikolog-rehberi',
        '/blog/stres-ve-beslenme',
        '/blog/izmir-diyetisyen-rehberi',
        '/blog/pcos-ve-beslenme',
        '/blog/bilincli-yeme-mindful-eating',
        '/blog/sosyal-kaygi-ve-terapi',
        '/blog/depresyon-ve-beslenme',
        '/blog/cocuklarda-saglikli-beslenme'
      ],
      previewMiddlewareFallback: '/404'
    })
  ]
});
