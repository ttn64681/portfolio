'use client';

type GameOverScreenProps = {
  onTryAgain: () => void;
  onDismiss: () => void;
};

export default function GameOverScreen({ onTryAgain, onDismiss }: GameOverScreenProps) {
  return (
    <div className='game-over-overlay' role='dialog' aria-label='Game Over'>
      <div className='game-over-content'>
        <h2 className='game-over-title'>GAME OVER</h2>
        <p className='game-over-thanks'>Thanks for visiting.</p>
        <p className='game-over-try-label'>Try Again?</p>
        <div className='game-over-actions'>
          <button
            type='button'
            className='game-over-btn game-over-btn--y'
            onClick={onTryAgain}
            aria-label='Yes, try again'
          >
            Y
          </button>
          <button
            type='button'
            className='game-over-btn game-over-btn--n'
            onClick={onDismiss}
            aria-label='No'
          >
            N
          </button>
        </div>
      </div>
    </div>
  );
}
