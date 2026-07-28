/*
  AdvertisePage — விளம்பரம் (Advertise with us)
  ─────────────────────────────────────────────
  A sales/landing page for advertisers PLUS a grid of ad boxes (AdSlots)
  that the admin can add, remove, and show/hide "based on need" from the
  Admin → Pages Editor → "Advertise · விளம்பரம்" tab.

  Admin-editable via the standard usePageContent() pattern (key: 'advertise').
  Every section can be toggled on/off; every ad box can be toggled or deleted.
*/

import { AdSlot } from '../components/Ads.jsx';
import { usePageContent } from '../utils/pageContent.js';

export default function AdvertisePage() {
  const pc = usePageContent('advertise', {
    eyebrow: 'ADVERTISE WITH US · விளம்பரம்',
    title: 'விளம்பரம்',
    subtitle: 'உங்கள் பிராண்டை 14 லட்சம் வாசகர்களுக்கு கொண்டு செல்லுங்கள் — print, digital மற்றும் newsletter ஆகிய மூன்று தளங்களிலும் ஒரே campaign-ல்.',

    // Section visibility toggles — admin can hide any section
    sections: { hero: true, intro: true, packages: true, adBoxes: true, contactCta: true },

    stats: [
      { num: '14 லட்சம்', label: 'தினசரி வாசகர்கள்' },
      { num: '6', label: 'பதிப்புகள்' },
      { num: '32', label: 'பகுதிகள்' },
      { num: '3', label: 'தளங்கள் (print · digital · newsletter)' }
    ],

    introHead: 'ஏன் மறைமலை முரசில் விளம்பரம்?',
    intro: 'Google Ads, Meta Audience Network வழியாக programmatic விளம்பரங்கள் — அல்லது நேரடி ஆதரவாளர் ஒப்பந்தங்கள். தமிழகம் முழுவதும் நம்பகமான வாசகர் வட்டத்தை சென்றடையுங்கள். உங்கள் தேவைக்கேற்ப கீழே உள்ள விளம்பர இடங்களைத் தேர்வு செய்யுங்கள்.',
    networks: ['Google AdSense', 'Google Ad Manager', 'Meta Audience Network', 'Direct Sponsorship', 'Newsletter'],

    packagesHead: 'விளம்பர திட்டங்கள் · Packages',
    packagesMore: 'ஒவ்வொரு விலையும் ஒரு வார campaign-க்கு. நீண்டகால ஒப்பந்தங்களுக்கு சிறப்பு தள்ளுபடி.',
    packages: [
      { name: 'Top Billboard', size: '970 × 350', price: 'ரூ. 15,000 / வாரம்', desc: 'ஒவ்வொரு பக்கத்தின் மேற்பகுதியில் — அதிக பார்வை.' },
      { name: 'Sidebar Half Page', size: '300 × 600', price: 'ரூ. 8,000 / வாரம்', desc: 'செய்தி பக்கங்களின் பக்கப்பட்டியில் நிலையான இடம்.' },
      { name: 'In-feed Rectangle', size: '300 × 250', price: 'ரூ. 5,000 / வாரம்', desc: 'செய்திகளுக்கு இடையே இயல்பாக பொருந்தும் அலகு.' },
      { name: 'Newsletter Strip', size: '600 × 150', price: 'ரூ. 6,000 / மாதம்', desc: 'வார செய்தி மடலில் நேரடியாக இன்பாக்ஸ் வரை.' }
    ],

    adBoxesHead: 'விளம்பர இடங்கள் · Ad Boxes',
    adBoxesMore: 'கிடைக்கும் விளம்பர இடங்கள் — நிர்வாகி தேவைக்கேற்ப சேர்க்கலாம் / நீக்கலாம்.',
    adBoxes: [
      { id: 'advertise-box-1', size: '970x350', network: 'sponsor', label: 'Top Billboard · 970 × 350', enabled: true },
      { id: 'advertise-box-2', size: '300x250', network: 'google',  label: 'Rectangle · 300 × 250', enabled: true },
      { id: 'advertise-box-3', size: '300x250', network: 'meta',    label: 'Rectangle · 300 × 250', enabled: true },
      { id: 'advertise-box-4', size: '728x120', network: 'google',  label: 'In-feed Strip · 728 × 120', enabled: true },
      { id: 'advertise-box-5', size: '300x600', network: 'sponsor', label: 'Half Page · 300 × 600', enabled: true },
      { id: 'advertise-box-6', size: '300x250', network: 'sponsor', label: 'Rectangle · 300 × 250', enabled: true }
    ],

    contactCta: {
      sponsored: 'SPONSORED',
      title: 'உங்கள் வணிகம் — மறைமலை முரசு வாசகர்களை சென்றடையுங்கள்',
      subtitle: 'தினசரி 14 லட்சம் வாசகர்கள் · 6 பதிப்புகள் · அனைத்து பகுதிகளிலும்',
      cta: 'விளம்பர திட்டங்கள் →',
      ctaHref: 'mailto:ads@maraimalaimurasu.com',
      ctaSub: 'ads@maraimalaimurasu.com'
    }
  });

  const sec = pc.sections || {};
  const isOn = (key) => sec[key] !== false;
  const stats = pc.stats || [];
  const networks = pc.networks || [];
  const packages = pc.packages || [];
  // Only render ad boxes that are enabled — admin toggles / removes "based on need"
  const adBoxes = (pc.adBoxes || []).filter(b => b && b.enabled !== false);
  const cta = pc.contactCta || {};

  return (
    <div className="advertise-page" style={{ background: '#fafaf7' }}>
      {/* ============ HERO TITLEBAR (dark) ============ */}
      {isOn('hero') && (
        <div style={{ background: '#1A1614', color: '#F2ECE0', padding: '44px 0', borderBottom: '3px solid var(--accent)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '640px' }}>
              {pc.eyebrow && (
                <div style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px' }}>{pc.eyebrow}</div>
              )}
              <h1 style={{ margin: '0 0 12px 0', fontFamily: 'var(--serif)', fontSize: '44px', fontWeight: 800, lineHeight: 1.1 }}>{pc.title}</h1>
              {pc.subtitle && <p style={{ margin: 0, fontSize: '15px', color: '#C9C3B6', lineHeight: 1.6 }}>{pc.subtitle}</p>}
            </div>
            {stats.length > 0 && (
              <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
                {stats.map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 800, color: '#fff' }}>{s.num}</div>
                    <div style={{ fontSize: '11px', color: '#8a8478', letterSpacing: '0.04em', maxWidth: '120px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="container" style={{ padding: '40px 0' }}>
        {/* ============ INTRO / WHY ADVERTISE ============ */}
        {isOn('intro') && (
          <section style={{ marginBottom: '44px' }}>
            {pc.introHead && (
              <h2 style={{ margin: '0 0 12px 0', fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 800, color: 'var(--ink)' }}>{pc.introHead}</h2>
            )}
            {pc.intro && <p style={{ margin: '0 0 18px 0', fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '820px' }}>{pc.intro}</p>}
            {networks.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {networks.map((net, i) => (
                  <span key={i} style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)', background: '#fff', border: '1px solid var(--rule)', borderRadius: '999px', padding: '7px 14px' }}>{net}</span>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ============ PACKAGES ============ */}
        {isOn('packages') && packages.length > 0 && (
          <section style={{ marginBottom: '48px' }}>
            <div style={{ borderBottom: '2px solid var(--accent)', paddingBottom: '8px', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 800, color: 'var(--ink)' }}>{pc.packagesHead}</h2>
              {pc.packagesMore && <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: 'var(--ink-3)' }}>{pc.packagesMore}</p>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {packages.map((p, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid var(--rule)', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase' }}>{p.size}</div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>{p.name}</h3>
                  {p.desc && <p style={{ margin: 0, fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.5, flex: 1 }}>{p.desc}</p>}
                  {p.price && <div style={{ marginTop: '6px', fontFamily: 'var(--mono)', fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>{p.price}</div>}
                  <a href={cta.ctaHref || 'mailto:ads@maraimalaimurasu.com'} style={{ marginTop: '4px', display: 'inline-block', color: 'var(--accent)', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>இந்த திட்டம் தேர்வு →</a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============ AD BOXES (removable based on need) ============ */}
        {isOn('adBoxes') && adBoxes.length > 0 && (
          <section style={{ marginBottom: '48px' }}>
            <div style={{ borderBottom: '2px solid var(--accent)', paddingBottom: '8px', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 800, color: 'var(--ink)' }}>{pc.adBoxesHead}</h2>
              {pc.adBoxesMore && <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: 'var(--ink-3)' }}>{pc.adBoxesMore}</p>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', alignItems: 'start' }}>
              {adBoxes.map((b, i) => (
                <div key={b.id || i}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'var(--ink-3)', fontFamily: 'var(--sans)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    விளம்பரம் · SPONSORED
                  </div>
                  <AdSlot
                    network={b.network || 'sponsor'}
                    size={b.size || '300x250'}
                    slotId={b.id || `advertise-box-${i + 1}`}
                    note={b.label || b.size}
                    style={{ maxWidth: '100%' }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============ CONTACT CTA ============ */}
        {isOn('contactCta') && cta && cta.title && (
          <section style={{ background: '#1A1614', color: '#F2ECE0', borderRadius: '12px', padding: '28px 32px' }}>
            {cta.sponsored && (
              <div style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '4px 12px', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '14px' }}>{cta.sponsored}</div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 800 }}>{cta.title}</h3>
                {cta.subtitle && <p style={{ margin: 0, fontSize: '14px', color: '#C9C3B6' }}>{cta.subtitle}</p>}
              </div>
              <a href={cta.ctaHref || 'mailto:ads@maraimalaimurasu.com'} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: 'var(--accent)', color: '#fff', padding: '14px 26px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap' }}>
                <span>{cta.cta || 'விளம்பர திட்டங்கள் →'}</span>
                {cta.ctaSub && <small style={{ fontWeight: 400, opacity: 0.85, fontSize: '11px', marginTop: '2px' }}>{cta.ctaSub}</small>}
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
