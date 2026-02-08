import type { ExperienceConfig as ExpConfig } from '@/types/experience';

// If holywatr, orange title, if acm, red title

export default function ExperienceBlock({ exp }: { exp: ExpConfig }) {
  return (
    <article className='experience-block game-block'>
      <div className='experience-block__inner'>
        <header className='experience-block__header'>
          <div className='experience-block__title-wrap'>
            <h3
              className={`experience-block__title ${exp.title === 'Holywatr' ? 'text-[#62e0ff]' : 'text-[#FF7962]'}`}
            >
              {exp.title}
            </h3>
            {exp.role && <p className='experience-block__role'>{exp.role}</p>}
          </div>
          {exp.date && <span className='experience-block__date'>{exp.date}</span>}
        </header>
        {exp.summary && <p className='experience-block__summary'>{exp.summary}</p>}
        {exp.bullets && exp.bullets.length > 0 && (
          <ul className='experience-block__bullets'>
            {exp.bullets.map((bullet, idx) => (
              <li key={idx} className='experience-block__bullet'>
                {bullet}
              </li>
            ))}
          </ul>
        )}
        {exp.techStack && exp.techStack.length > 0 && (
          <div className='experience-block__tags'>
            {exp.techStack.map((tech) => (
              <span key={tech} className='experience-block__tag'>
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
