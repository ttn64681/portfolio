'use client';

import { useState } from 'react';

type ProjectCardMode = 'carousel' | 'flip';

type ProjectCardProps = {
  title: string;
  summary: string;
  role?: string;
  award?: string;
  techStack?: string[];
  date?: string;
  bullets: string[]; // max 3 from config
  mode: ProjectCardMode;
  isActive?: boolean; // only used in carousel mode (click-to-focus)
  onSelect?: () => void; // carousel: click to focus
};

export default function ProjectCard({
  title,
  summary,
  role,
  award,
  techStack,
  date,
  bullets,
  mode,
  isActive = false,
  onSelect,
}: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (mode === 'carousel') {
    return (
      <article
        className={`project-card project-card--carousel ${isActive ? 'project-card--active' : ''}`}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect?.();
          }
        }}
        role='button'
        tabIndex={0}
      >
        <div className='project-card__inner'>
          {!isActive && date && <div className='project-card__date'>{date}</div>}
          <h3 className='project-card__title'>{title}</h3>
          {!isActive && role && <div className='project-card__role'>{role}</div>}
          {!isActive && award && (
            <div className='project-card__award'>{award}</div>
          )}
          {/* Tech stack badges at top */}
          {!isActive && techStack && techStack.length > 0 && (
            <div className='project-card__tags'>
              {techStack.map((tech) => (
                <span key={tech} className='project-card__tag'>
                  {tech}
                </span>
              ))}
            </div>
          )}
          {!isActive && <p className='project-card__summary'>{summary}</p>}
          {isActive && bullets.length > 0 && (
            <div className='project-card__expanded'>
              <ul className='project-card__bullets'>
                {bullets.slice(0, 3).map((bullet, idx) => (
                  <li key={idx} className='project-card__bullet'>
                    <span className='project-card__bullet-box'>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    );
  }

  // Flip mode (mobile / tablet)
  return (
    <article className='project-card project-card--flip'>
      <button
        type='button'
        className={`project-card__flip-inner ${isFlipped ? 'project-card__flip-inner--flipped' : ''}`}
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <div className='project-card__face project-card__face--front'>
          <div className='project-card__inner'>
            {date && <div className='project-card__date'>{date}</div>}
            <h3 className='project-card__title'>{title}</h3>
            {role && <div className='project-card__role'>{role}</div>}
            {award && <div className='project-card__award'>{award}</div>}
            {/* Tech stack badges at top */}
            {techStack && techStack.length > 0 && (
              <div className='project-card__tags'>
                {techStack.map((tech) => (
                  <span key={tech} className='project-card__tag'>
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <p className='project-card__summary'>{summary}</p>
            <div className='project-card__expand-hint'>
              {/* Big pointer-finger icon to indicate tap/flip */}
              <svg
                width='40'
                height='40'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='inline-block'
              >
                {/* Simple hand-pointer icon */}
                <path d='M11 2v10' />
                <path d='M8 7.5V12' />
                <path d='M14 8v6' />
                <path d='M17 9v5' />
                <path d='M5 12.5V14a5 5 0 0 0 5 5h3a5 5 0 0 0 5-5v-2.5a2.5 2.5 0 0 0-5 0' />
              </svg>
            </div>
          </div>
        </div>
        <div className='project-card__face project-card__face--back'>
          <div className='project-card__inner'>
            <h3 className='project-card__title'>{title}</h3>
            {bullets.length > 0 && (
              <div className='project-card__expanded'>
                <ul className='project-card__bullets'>
                  {bullets.slice(0, 3).map((bullet, idx) => (
                    <li key={idx} className='project-card__bullet'>
                      <span className='project-card__bullet-box'>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </button>
    </article>
  );
}
