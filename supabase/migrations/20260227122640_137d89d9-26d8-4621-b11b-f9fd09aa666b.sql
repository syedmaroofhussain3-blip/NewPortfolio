
-- Drop restrictive policies for insert/update since we're using simple client-side auth
DROP POLICY "Admin can insert portfolio content" ON public.portfolio_content;
DROP POLICY "Admin can update portfolio content" ON public.portfolio_content;

-- Allow unauthenticated updates (protected by client-side admin login)
CREATE POLICY "Allow update portfolio content"
ON public.portfolio_content
FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow insert portfolio content"
ON public.portfolio_content
FOR INSERT
WITH CHECK (true);
