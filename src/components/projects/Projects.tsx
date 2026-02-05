'use client';

import { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import { portfolioDocuments } from '@/data/portfolio';
import { projectsConfig } from '@/data/projects-config';
import type { ProjectInfo } from '@/types/projects';

/**
 * Extract projects for UI display. Uses projects-config.ts as the single source of truth
 * for all display data (title, bullets, techStack, date, role, award).
 * Only uses portfolio.ts to determine which projects exist (by checking for matching IDs).
 */
function extractProjects(): ProjectInfo[] {
  // Get all project base IDs from portfolio.ts (to know which projects exist)
  const projectDocs = portfolioDocuments.filter((doc) => doc.id.startsWith('proj-'));
  const existingProjectIds = new Set<string>();

  projectDocs.forEach((doc) => {
    const baseMatch = doc.id.match(/^proj-([^-]+)/);
    if (baseMatch) {
      existingProjectIds.add(baseMatch[1]);
    }
  });

  // Build projects array directly from projects-config.ts
  const projects: ProjectInfo[] = projectsConfig
    .filter((config) => existingProjectIds.has(config.id)) // Only include projects that exist in portfolio.ts
    .map((config) => ({
      id: `proj-${config.id}`,
      baseId: config.id,
      title: config.title || `Project ${config.id}`,
      summary: config.bullets[0] || '', // Use first bullet as summary
      role: config.role,
      award: config.award,
      techStack: config.techStack,
      date: config.date,
      bullets: config.bullets,
    }));

  return projects;
}

const projects = extractProjects();

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-rotate carousel
  useEffect(() => {
    if (projects.length === 0) return;
    if (isPaused) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => window.clearInterval(id);
  }, [isPaused]);

  // Scroll active card fully into view (with padding so it's not in the fade zone)
  useEffect(() => {
    const cardEl = cardRefs.current[activeIndex];
    const carouselEl = carouselRef.current;
    if (!cardEl || !carouselEl) return;

    const cardRect = cardEl.getBoundingClientRect();
    const carouselRect = carouselEl.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const carouselWidth = carouselRect.width;
    const cardLeftInScroll = cardEl.offsetLeft;
    const cardCenter = cardLeftInScroll + cardWidth / 2;
    const visibleCenter = carouselWidth / 2;
    const targetScroll = cardCenter - visibleCenter;

    carouselEl.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: 'smooth',
    });
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  if (projects.length === 0) return null;

  return (
    <section id='projects' className='projects-section'>
      <div className='projects-section__inner'>
        <header className='projects-section__header'>
          <h2 className='projects-section__title'>Projects</h2>
          <p className='projects-section__subtitle'>
            A few of the worlds I&apos;ve been building lately — from RAG interfaces to game UIs and
            class projects gone too far.
          </p>
        </header>

        {/* Desktop: carousel with arrows */}
        <div className='projects-carousel-wrapper hidden lg:block'>
          <button
            type='button'
            className='projects-carousel__arrow projects-carousel__arrow--left'
            onClick={handlePrev}
            aria-label='Previous project'
          >
            ‹
          </button>
          <div className='projects-carousel' ref={carouselRef}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
              >
                <ProjectCard
                  title={project.title}
                  summary={project.summary}
                  role={project.role}
                  award={project.award}
                  techStack={project.techStack}
                  date={project.date}
                  bullets={project.bullets}
                  mode='carousel'
                  isActive={index === activeIndex}
                  onSelect={() => {
                    setIsPaused(true);
                    setActiveIndex(index);
                  }}
                />
              </div>
            ))}
          </div>
          <button
            type='button'
            className='projects-carousel__arrow projects-carousel__arrow--right'
            onClick={handleNext}
            aria-label='Next project'
          >
            ›
          </button>
        </div>

        {/* Mobile / tablet: interactive cards grid - no scrolling, lay flat */}
        <div className='projects-grid lg:hidden'>
        {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              summary={project.summary}
              role={project.role}
              award={project.award}
              techStack={project.techStack}
              date={project.date}
              bullets={project.bullets}
              mode='flip'
              isActive={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
