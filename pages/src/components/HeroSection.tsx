import React from 'react';
import { useTranslation } from '../i18n';
import { useResponsive } from '../hooks/useResponsive';
import ColorBends from './ColorBends';
import lineIcon from '../assets/icons/icon-terminal-prompt.svg';

const terminalLines = [
  {
    num: 1,
    hasIcon: true,
    content: (
      <span>
        <span style={{ color: '#756BFF' }}>$ ocr re</span>
        <span style={{ color: '#e4e4e7' }}>v</span>
        <span style={{ color: '#E2BA64' }}>iew --from</span>
        <span style={{ color: '#e4e4e7' }}> </span>
        <span style={{ color: '#67BAFA' }}>mai</span>
        <span style={{ color: '#e4e4e7' }}>n --to feature-auth</span>
      </span>
    ),
  },
  {
    num: 2,
    hasIcon: true,
    content: (
      <span>
        <span style={{ color: '#e4e4e7' }}>[o</span>
        <span style={{ color: '#756BFF' }}>cr] R</span>
        <span style={{ color: '#e4e4e7' }}>e</span>
        <span style={{ color: '#67BAFA' }}>v</span>
        <span style={{ color: '#e4e4e7' }}>iew</span>
        <span style={{ color: '#67BAFA' }}>ing</span>
        <span style={{ color: '#e4e4e7' }}> </span>
        <span style={{ color: '#67BAFA' }}>5 file</span>
        <span style={{ color: '#e4e4e7' }}>(s) in /home/user/project</span>
      </span>
    ),
  },
  {
    num: 3,
    hasIcon: true,
    content: (
      <span>
        <span style={{ color: '#e4e4e7' }}>[o</span>
        <span style={{ color: '#D553F6' }}>cr]</span>
        <span style={{ color: '#e4e4e7' }}> ▶ </span>
        <span style={{ color: '#756BFF' }}>fi</span>
        <span style={{ color: '#e4e4e7' }}>l</span>
        <span style={{ color: '#67BAFA' }}>e</span>
        <span style={{ color: '#e4e4e7' }}>_re</span>
        <span style={{ color: '#48AA84' }}>a</span>
        <span style={{ color: '#e4e4e7' }}>d </span>
        <span style={{ color: '#67BAFA' }}>"</span>
        <span style={{ color: '#e4e4e7' }}>int</span>
        <span style={{ color: '#67BAFA' }}>e</span>
        <span style={{ color: '#e4e4e7' }}>rna</span>
        <span style={{ color: '#48AA84' }}>l</span>
        <span style={{ color: '#e4e4e7' }}>/a</span>
        <span style={{ color: '#67BAFA' }}>u</span>
        <span style={{ color: '#e4e4e7' }}>th/login.go"</span>
      </span>
    ),
  },
  {
    num: 4,
    hasIcon: true,
    content: (
      <span>
        <span style={{ color: '#e4e4e7' }}>[ocr</span>
        <span style={{ color: '#D553F6' }}> ] ✔</span>
        <span style={{ color: '#e4e4e7' }}> f</span>
        <span style={{ color: '#756BFF' }}>ile</span>
        <span style={{ color: '#e4e4e7' }}>_</span>
        <span style={{ color: '#67BAFA' }}>r</span>
        <span style={{ color: '#e4e4e7' }}>ead</span>
        <span style={{ color: '#e4e4e7' }}> (1</span>
        <span style={{ color: '#67BAFA' }}>5</span>
        <span style={{ color: '#e4e4e7' }}>ms)</span>
      </span>
    ),
  },
  {
    num: 5,
    hasIcon: true,
    content: (
      <span>
        <span style={{ color: '#e4e4e7' }}>[ocr]</span>
        <span style={{ color: '#D553F6' }}> ▶</span>
        <span style={{ color: '#e4e4e7' }}> co</span>
        <span style={{ color: '#67BAFA' }}>de_</span>
        <span style={{ color: '#e4e4e7' }}>s</span>
        <span style={{ color: '#67BAFA' }}>e</span>
        <span style={{ color: '#e4e4e7' }}>arch</span>
        <span style={{ color: '#67BAFA' }}> "p</span>
        <span style={{ color: '#e4e4e7' }}>a</span>
        <span style={{ color: '#67BAFA' }}>s</span>
        <span style={{ color: '#e4e4e7' }}>swo</span>
        <span style={{ color: '#48AA84' }}>r</span>
        <span style={{ color: '#e4e4e7' }}>d.*hash"</span>
      </span>
    ),
  },
  {
    num: 6,
    hasIcon: true,
    content: (
      <span>
        <span style={{ color: '#e4e4e7' }}>[ocr] ✔ c</span>
        <span style={{ color: '#67BAFA' }}>ode</span>
        <span style={{ color: '#e4e4e7' }}>_</span>
        <span style={{ color: '#67BAFA' }}>s</span>
        <span style={{ color: '#e4e4e7' }}>ear</span>
        <span style={{ color: '#67BAFA' }}>ch</span>
        <span style={{ color: '#e4e4e7' }}> (</span>
        <span style={{ color: '#67BAFA' }}>8</span>
        <span style={{ color: '#e4e4e7' }}>ms)</span>
      </span>
    ),
  },
  { num: 7, hasIcon: false, content: <span style={{ color: '#e4e4e7' }}>[ocr] Plan completed for internal/auth/login.go</span> },
  { num: 8, hasIcon: false, content: <span style={{ color: '#e4e4e7' }}>─── internal/auth/login.go:42-55 ───</span> },
  { num: 9, hasIcon: false, content: <span style={{ color: '#e4e4e7' }}>Consider using bcrypt cost factor ≥ 12 for password hashing.</span> },
  {
    num: 10,
    hasIcon: false,
    content: (
      <span>
        <span style={{ color: '#e4e4e7' }}>[o</span>
        <span style={{ color: '#D553F6' }}>cr] Su</span>
        <span style={{ color: '#e4e4e7' }}>m</span>
        <span style={{ color: '#67BAFA' }}>mar</span>
        <span style={{ color: '#e4e4e7' }}>y: 5 file(s), 3 comment(s), ~8421 tokens, 12.5s</span>
      </span>
    ),
  },
  { num: 11, hasIcon: false, content: <span style={{ color: '#e4e4e7' }}>｜</span> },
];

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { isMobile, isTablet } = useResponsive();

  return (
    <section
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        height: isMobile ? 820 : isTablet ? 800 : 960,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Shader Background */}
      <ColorBends
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
        colors={['#0d750d', '#042e04', '#066020']}
        rotation={90}
        speed={0.23}
        scale={1.2}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        noise={0.33}
        parallax={0.45}
        iterations={1}
        intensity={0.8}
        bandWidth={6}
        transparent
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: 276,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: isMobile ? 100 : 180,
          paddingLeft: isMobile ? 20 : 0,
          paddingRight: isMobile ? 20 : 0,
          gap: isMobile ? 24 : 32,
          maxWidth: isMobile ? '100%' : 742,
        }}
      >
        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: isMobile ? 28 : isTablet ? 36 : 48,
              fontWeight: 500,
              textAlign: 'center',
              lineHeight: isMobile ? '34px' : isTablet ? '42px' : '52px',
              letterSpacing: '0.96px',
              margin: 0,
            }}
          >
            {t('hero.title').split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: isMobile ? 14 : 16,
              textAlign: 'center',
              lineHeight: '24px',
              marginTop: 16,
              maxWidth: isMobile ? '100%' : 742,
            }}
          >
            {t('hero.description')}
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <a
            href="#quickstart"
            style={{
              height: 32,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              background: '#ffffff',
              border: '1px solid #EBEBEB',
              borderRadius: 6,
              color: 'rgba(0,0,0,0.77)',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            {t('hero.quickStart')}
          </a>
          <a
            href="#/docs"
            style={{
              height: 32,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '4px 12px',
              background: 'rgba(0,0,0,0.9)',
              borderRadius: 6,
              color: '#fff',
              fontSize: 14,
              border: '1px solid rgba(255,255,255,0.16)',
              textDecoration: 'none',
            }}
          >
            {t('hero.learnMore')}
          </a>
        </div>

        {/* Terminal */}
        <div
          style={{
            width: '100%',
            maxWidth: isMobile ? '100%' : isTablet ? 560 : 692,
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Terminal header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(17,17,17,0.5)',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              padding: '8px 15px',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontFamily: 'Menlo, monospace' }}>
              {t('hero.terminal')}
            </span>
          </div>
          {/* Terminal body */}
          <div
            style={{
              padding: '10px 0',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              overflowX: 'hidden',
            }}
          >
            {terminalLines.map((line) => (
              <div
                key={line.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '5px 0',
                }}
              >
                <div
                  style={{
                    width: 58,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    paddingLeft: 15,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ width: 19, color: 'rgba(255,255,255,0.3)', fontSize: 'clamp(10px, 1.8vw, 13px)', fontFamily: 'Menlo, monospace' }}>
                    {line.num}
                  </span>
                  {line.hasIcon && <img src={lineIcon} alt="" style={{ width: 15, height: 15 }} />}
                </div>
                <span style={{ fontSize: 'clamp(10px, 1.8vw, 15px)', fontFamily: 'Menlo, monospace', lineHeight: '20px', whiteSpace: 'nowrap' }}>
                  {line.content}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
