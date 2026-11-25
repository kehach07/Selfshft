DROP POLICY IF EXISTS "Reviews readable by all" ON public.reviews;
CREATE POLICY "Signed-in users can read reviews"
  ON public.reviews
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Modules readable by all" ON public.course_modules;
CREATE POLICY "Signed-in users can read course modules"
  ON public.course_modules
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Posts readable by all" ON public.community_posts;
CREATE POLICY "Signed-in users can read community posts"
  ON public.community_posts
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Reactions readable by all" ON public.post_reactions;
CREATE POLICY "Signed-in users can read post reactions"
  ON public.post_reactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);