'use client';

import { experienceConfig } from '@/data/experience-config';
import ExperienceBlock from './ExperienceBlock';

export default function Experience() {
  if (experienceConfig.length === 0) return null;

  return (
    <section id='experience' className='experience-section'>
      <div className='experience-section__inner'>
        <header className='experience-section__header'>
          <div className='section-badge-wrap'>
            <h2 className='section-badge section-badge--experience'>Experience</h2>
          </div>
          <p className='experience-section__subtitle'>
            Roles, leadership, and contract work — where I&apos;ve been building and leading.
          </p>
        </header>
        <div className='experience-section__list mb-9'>
          {experienceConfig.map((exp) => (
            <ExperienceBlock key={exp.id} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
