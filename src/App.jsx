import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';

const DESIGN_WIDTH = 470;
const DESIGN_HEIGHT = 812;
const FRAME_VERTICAL_GAP = 40;
const MAX_FRAME_SCALE = 1.08;

function App() {
  const shellRef = useRef(null);
  const [frameScale, setFrameScale] = useState(1);

  useEffect(() => {
    const updateFrameScale = () => {
      const shell = shellRef.current;

      if (!shell) {
        return;
      }

      const shellStyles = window.getComputedStyle(shell);
      const horizontalPadding =
        Number.parseFloat(shellStyles.paddingLeft) +
        Number.parseFloat(shellStyles.paddingRight);
      const verticalPadding =
        Number.parseFloat(shellStyles.paddingTop) +
        Number.parseFloat(shellStyles.paddingBottom);
      const availableWidth = Math.max(shell.clientWidth - horizontalPadding, 280);
      const availableHeight = Math.max(
        shell.clientHeight - verticalPadding - FRAME_VERTICAL_GAP,
        560,
      );
      const nextScale = Math.min(
        availableWidth / DESIGN_WIDTH,
        availableHeight / DESIGN_HEIGHT,
        MAX_FRAME_SCALE,
      );

      setFrameScale(nextScale);
    };

    updateFrameScale();
    window.addEventListener('resize', updateFrameScale);

    return () => {
      window.removeEventListener('resize', updateFrameScale);
    };
  }, []);

  return (
    <main className="site-shell" ref={shellRef}>
      <div className="site-shell__backdrop" aria-hidden="true" />
      <div
        className="phone-stage"
        style={{
          width: `${DESIGN_WIDTH * frameScale}px`,
          height: `${DESIGN_HEIGHT * frameScale}px`,
        }}
      >
        <div
          className="phone-frame"
          style={{
            transform: `scale(${frameScale})`,
          }}
        >
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
