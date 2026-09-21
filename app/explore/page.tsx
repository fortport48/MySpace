'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Compass, Search, Sparkles, Loader2, RefreshCw, UserX } from 'lucide-react';
import { ProfileCard, ExploreProfileData } from '@/components/explore/profile-card';
import { ExploreFilters } from '@/components/explore/explore-filters';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeHobby, setActiveHobby] = useState('');
  
  const [profiles, setProfiles] = useState<ExploreProfileData[]>([]);
  const [suggestedProfiles, setSuggestedProfiles] = useState<ExploreProfileData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch profiles from API
  const fetchProfiles = useCallback(async (
    query: string,
    cat: string,
    hobby: string,
    pageNum: number,
    append: boolean = false
  ) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (cat && cat !== 'all') params.set('category', cat);
      if (hobby) params.set('hobby', hobby);
      params.set('page', pageNum.toString());
      params.set('limit', '9');

      const res = await fetch(`/api/explore?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        
        if (append) {
          setProfiles((prev) => [...prev, ...(data.profiles || [])]);
        } else {
          setProfiles(data.profiles || []);
          setSuggestedProfiles(data.suggestedProfiles || []);
        }

        setHasMore(Boolean(data.pagination?.hasMore));
      }
    } catch (err) {
      console.error('Fetch explore profiles error:', err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  // Effect for initial fetch & search query / filter changes
  useEffect(() => {
    setPage(1);
    const timer = setTimeout(() => {
      fetchProfiles(searchQuery, selectedCategory, activeHobby, 1, false);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, activeHobby, fetchProfiles]);

  // Load More Next Page Handler
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProfiles(searchQuery, selectedCategory, activeHobby, nextPage, true);
  };

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setActiveHobby('');
  };

  const isFiltered = searchQuery.length > 0 || selectedCategory !== 'all' || activeHobby.length > 0;

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
        
        {/* HEADER & SEARCH BAR */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-xs font-bold shadow-2xs">
            <Compass className="w-4 h-4 text-blue-600" />
            <span>Avero Community Discovery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Discover Curious Minds
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto">
            Browse people sharing their travel adventures, music playlists, favorite movies, hobbies, and personal digital space.
          </p>

          {/* Interactive Search Bar */}
          <div className="relative pt-2 max-w-2xl mx-auto">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, handle, hobby, music, movies, travel..."
              className="w-full pl-12 pr-10 py-4 bg-white/95 backdrop-blur-xl rounded-full border border-slate-200/90 shadow-lg shadow-blue-950/5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold bg-slate-100 rounded-full p-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* EXPLORE FILTERS */}
        <ExploreFilters
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          activeHobby={activeHobby}
          onSelectHobby={(hobby) => setActiveHobby(hobby)}
          onResetFilters={handleResetFilters}
          isFiltered={isFiltered}
        />

        {/* SUGGESTED PROFILES SECTION (Visible on initial unfiltered state) */}
        {!isFiltered && suggestedProfiles.length > 0 && !isLoading && (
          <div className="space-y-4 pt-2 border-t border-slate-200/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Suggested Minds to Explore
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-400">Featured Public Profiles</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedProfiles.map((profile) => (
                <ProfileCard key={`suggested_${profile.id}`} profile={profile} />
              ))}
            </div>
          </div>
        )}

        {/* MAIN PROFILES GRID SECTION */}
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {isFiltered ? 'Search Results' : 'Explore All Profiles'}
            </h2>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {profiles.length} {profiles.length === 1 ? 'profile' : 'profiles'} found
            </span>
          </div>

          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-slate-500">Searching public profiles...</p>
            </div>
          ) : profiles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>

              {/* Load More Pagination */}
              {hasMore && (
                <div className="pt-8 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="px-8 py-3 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-md text-slate-800 font-bold text-sm rounded-full active:scale-95 transition-all inline-flex items-center gap-2"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <span>Loading More Profiles...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 text-blue-600" />
                        <span>Load More Profiles</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* EMPTY STATE WHEN NO PROFILES MATCH SEARCH */
            <div className="py-16 px-4 text-center max-w-md mx-auto bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-xl space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto shadow-inner">
                <UserX className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">No profiles found</h3>
                <p className="text-xs text-slate-500 font-medium">
                  We couldn't find any public profiles matching your current search criteria.
                </p>
              </div>

              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-md shadow-blue-500/20 transition-all"
                >
                  Clear All Filters & Reset
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
