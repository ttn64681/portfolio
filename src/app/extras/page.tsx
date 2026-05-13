import { redirect } from 'next/navigation';

/** Canonical hub lives at `/explore`; `/extras` redirects for bookmarks. */
export default function ExtrasRootRedirect() {
  redirect('/explore');
}
