
-- Tighten INSERT/UPDATE policies to admin role only
DROP POLICY "Authenticated users can insert portfolio content" ON public.portfolio_content;
DROP POLICY "Authenticated users can update portfolio content" ON public.portfolio_content;

CREATE POLICY "Admin can insert portfolio content"
ON public.portfolio_content
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can update portfolio content"
ON public.portfolio_content
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
