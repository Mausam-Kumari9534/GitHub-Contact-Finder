import { SearchInput } from "@/components/SearchInput";
import { SearchHistory } from "@/components/SearchHistory";
import { ProfileCard } from "@/components/ProfileCard";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { useGitHubUser } from "@/hooks/useGitHubUser";
import { useSearchHistory } from "@/hooks/useSearchHistory";

const Index = () => {
  const { user, isLoading, error, searchUser } = useGitHubUser();
  const { history, addToHistory, removeFromHistory } = useSearchHistory();

  const handleSearch = (username: string) => {
    addToHistory(username);
    searchUser(username);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
            GitHub Contact Finder
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
            Find public email from commit history and contact information
          </p>
        </header>

        {/* Search */}
        <section className="mb-10 sm:mb-14">
          <SearchInput onSearch={handleSearch} isLoading={isLoading} />
          <SearchHistory 
            history={history} 
            onSelect={handleSearch} 
            onRemove={removeFromHistory} 
          />
        </section>

        {/* Results */}
        <section>
          {isLoading && <LoadingState />}
          
          {error && <ErrorState type={error.type} message={error.message} />}
          
          {user && !isLoading && !error && <ProfileCard user={user} />}
          
          {!user && !isLoading && !error && <EmptyState />}
        </section>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
