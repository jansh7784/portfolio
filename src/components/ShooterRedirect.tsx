import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ShooterGame from './shooter';

const ShooterRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (location.pathname === "/shooter") {
      setIsOpen(true);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    navigate("/", { replace: true }); 
  };

  return (
      <ShooterGame
        isOpen={isOpen}
        onClose={handleClose}
        highScore={highScore}
        onHighScoreUpdate={(score) => setHighScore(score)}
      />
  );
};

export default ShooterRedirect;
