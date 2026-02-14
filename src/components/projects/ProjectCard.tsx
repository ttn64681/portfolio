'use client';

import { useState } from 'react';
import Link from './Link';
import Octocat from './Octocat';
import ExploreButton from './ExploreButton';

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
  link?: string;
  github?: string;
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
  link,
  github,
}: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (mode === 'carousel') {
    return (
      <article
        className={`project-card project-card--carousel game-block ${isActive ? 'project-card--active' : ''}`}
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
          {!isActive && award && <div className='project-card__award'>{award}</div>}
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
                {bullets.slice(0, 2).map((bullet, idx) => (
                  <li key={idx} className='project-card__bullet'>
                    <span className='project-card__bullet-box'>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isActive && (
            <div className='project-card__actions' onClick={(e) => e.stopPropagation()}>
              <div className='project-card__actions-sprites'>
                {link && <Link href={link} />}
                {github && <Octocat href={github} />}
              </div>
              <ExploreButton />
            </div>
          )}
        </div>
      </article>
    );
  }

  // Flip mode (mobile / tablet): actions (Link, Octocat, Explore) only on back
  return (
    <article
      className={`project-card project-card--flip game-block ${isFlipped ? 'project-card--flipped' : ''}`}
    >
      <div
        role='button'
        tabIndex={0}
        className={`project-card__flip-inner ${isFlipped ? 'project-card__flip-inner--flipped' : ''}`}
        onClick={() => setIsFlipped((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped((prev) => !prev);
          }
        }}
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
            <div className='project-card__expand-hint'></div>
          </div>
        </div>
        <div className='project-card__face project-card__face--back'>
          <div className='project-card__inner'>
            <h3 className='project-card__title'>{title}</h3>
            {bullets.length > 0 && (
              <div className='project-card__expanded'>
                <ul className='project-card__bullets'>
                  {bullets.slice(0, 2).map((bullet, idx) => (
                    <li key={idx} className='project-card__bullet'>
                      <span className='project-card__bullet-box'>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className='project-card__actions' onClick={(e) => e.stopPropagation()}>
              <div className='project-card__actions-sprites'>
                {link && <Link href={link} />}
                {github && <Octocat href={github} />}
              </div>
              <ExploreButton />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
