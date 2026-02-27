import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Shield } from 'lucide-react';

const Admin = () => {
  const { isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground font-mono">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/30 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold font-mono text-foreground">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-muted-foreground font-mono mb-8">
            Welcome, Admin. Manage your portfolio content below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['About', 'Skills', 'Projects', 'Certifications', 'Resume', 'Contact'].map((section) => (
              <div
                key={section}
                className="rounded-xl bg-card/50 border border-border/30 p-6 hover:border-primary/30 transition-colors cursor-pointer"
              >
                <h3 className="font-mono font-semibold text-foreground mb-2">{section}</h3>
                <p className="text-sm text-muted-foreground">Edit {section.toLowerCase()} section content</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-card/30 border border-border/20 p-6">
            <p className="text-sm text-muted-foreground font-mono">
              🚧 Content editing forms will be built next. First, you need to set up the database tables in your Supabase project.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Admin;
