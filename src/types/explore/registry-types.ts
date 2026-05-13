import type { ExploreKind } from './kind';
import type { ExperienceConfig } from '@/types/experience';
import type { ProjectConfig } from '@/types/projects';

export type ExploreOrderEntry = {
  slug: string;
  kind: ExploreKind;
};

export type ExploreMergedEntry =
  | ({ kind: 'project'; slug: string } & ProjectConfig)
  | ({ kind: 'experience'; slug: string } & ExperienceConfig);
