// Route component for the scalar-lazy plugin. Mirrors upstream's
// ScalarDocusaurus component (window.Scalar.createApiReference on a ref), but
// loads the vendored standalone bundle on first mount instead of relying on a
// site-wide <script> tag. SSR-safe: everything browser-only lives in useEffect.
import Layout from '@theme/Layout';
import React, {useEffect, useRef, useState} from 'react';
import './theme.css';

// Module-level so SPA back-and-forward navigation reuses one in-flight load.
let scalarLoad = null;

function loadScalar(src) {
  if (typeof window !== 'undefined' && window.Scalar) return Promise.resolve();
  if (!scalarLoad) {
    scalarLoad = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => {
        scalarLoad = null; // allow a retry on next mount
        reject(new Error(`failed to load ${src}`));
      };
      document.body.appendChild(script);
    });
  }
  return scalarLoad;
}

export default function ScalarLazy({route}) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadScalar(route.bundle)
      .then(() => {
        if (!cancelled && ref.current && window.Scalar) {
          window.Scalar.createApiReference(ref.current, {
            ...route.configuration,
            hideDarkModeToggle: true,
          });
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [route.bundle, route.configuration]);

  return (
    <Layout>
      <div ref={ref}>
        {failed && (
          <p style={{padding: '2rem'}}>
            The API reference failed to load. Please refresh the page to retry.
          </p>
        )}
      </div>
    </Layout>
  );
}
