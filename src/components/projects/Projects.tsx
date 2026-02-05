'use client';

import { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import { portfolioDocuments } from '@/data/portfolio';
import { getProjectConfig } from '@/data/projects-config';
import type { ProjectInfo } from '@/types/projects';

function extractProjects(): ProjectInfo[] {
  const projectDocs = portfolioDocuments.filter((doc) => doc.id.startsWith('proj-'));

  const projectGroups = new Map<string, typeof projectDocs>();

  projectDocs.forEach((doc) => {
    const baseMatch = doc.id.match(/^proj-([^-]+)/);
    if (baseMatch) {
      const baseName = baseMatch[1];
      if (!projectGroups.has(baseName)) {
        projectGroups.set(baseName, []);
      }
      projectGroups.get(baseName)!.push(doc);
    }
  });

  const mergedProjects: ProjectInfo[] = [];

  projectGroups.forEach((docs, baseName) => {
    const allTechStacks = new Set<string>();
    const allContent: string[] = [];
    let mainTitle = '';

    docs.forEach((doc) => {
      const [maybeTitle, ...rest] = doc.content.split('. ');
      const title = maybeTitle || doc.id;
      const content = rest.join('. ');

      const baseTitle = title.replace(
        / - (Backend Architecture|UI\/UX Design|Technical Implementation|Art & Design)$/i,
        '',
      );
      if (!mainTitle) mainTitle = baseTitle;

      allContent.push(content);

      const techMatch = doc.content.match(/Tech:\s([^\.]+)/i);
      if (techMatch && techMatch[1]) {
        techMatch[1].split(',').forEach((t) => allTechStacks.add(t.trim()));
      }
    });

    const summary = allContent[0]?.split('. ')[0] || allContent.join('. ');

    // Get config for this project
    const config = getProjectConfig(baseName);

    mergedProjects.push({
      id: `proj-${baseName}`,
      baseId: baseName,
      title: config?.title || mainTitle,
      summary,
      techStack: config?.techStack || Array.from(allTechStacks),
      date: config?.date,
      bullets: config?.bullets || [],
    });
  });

  return mergedProjects;
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
    const scrollPadding = 80;
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
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              summary={project.summary}
              techStack={project.techStack}
              date={project.date}
              bullets={project.bullets}
              mode='flip'
              isActive={false}
              onHover={() => {}}
              onHoverEnd={() => {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
