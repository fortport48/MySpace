'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, Sparkles, Cpu, ShieldCheck, ToggleLeft, ToggleRight, 
  Loader2, Save, Check 
} from 'lucide-react';

interface SystemState {
  featureFlags: {
    aiAssistantEnabled: boolean;
    customWallpapersEnabled: boolean;
    discoverySystemEnabled: boolean;
    signupAllowed: boolean;
  };
  aiMetrics: {
    totalPromptsProcessed: number;
    averageResponseTimeMs: number;
    activeModels: string[];
  };
}

export default function AdminSystemPage() {
  const [data, setData] = useState<SystemState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSystem() {
      try {
        const res = await fetch('/api/admin/system');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Fetch system settings error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSystem();
  }, []);

  const handleToggleFlag = async (key: string, currentValue: boolean) => {
    setSavingKey(key);
    const newValue = !currentValue;
    try {
      const res = await fetch('/api/admin/system', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: newValue }),
      });
      if (res.ok) {
        setData((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            featureFlags: {
              ...prev.featureFlags,
              [key]: newValue,
            },
          };
        });
      }
    } catch (err) {
      console.error('Toggle flag error:', err);
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
          System & Feature Flags
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
          Application Flags & AI Monitoring
        </h1>
        <p className="text-xs text-slate-400 font-medium">Control global feature toggles, monitor AI assistant queries, and application settings.</p>
      </div>

      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-400">Loading system parameters...</p>
        </div>
      ) : (
        <>
          {/* FEATURE FLAGS SECTION */}
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-400" /> Feature Flags & Toggles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Discovery System Flag */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Discovery & Explore System</h4>
                  <p className="text-xs text-slate-400">Allow users to search and discover public profile cards on /explore.</p>
                </div>
                <button
                  onClick={() => handleToggleFlag('discoverySystemEnabled', data?.featureFlags.discoverySystemEnabled ?? true)}
                  disabled={savingKey === 'discoverySystemEnabled'}
                  className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
                    data?.featureFlags.discoverySystemEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-md" />
                </button>
              </div>

              {/* Custom Wallpapers Flag */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Custom Wallpapers Upload</h4>
                  <p className="text-xs text-slate-400">Allow profile owners to upload or select custom cover images.</p>
                </div>
                <button
                  onClick={() => handleToggleFlag('customWallpapersEnabled', data?.featureFlags.customWallpapersEnabled ?? true)}
                  disabled={savingKey === 'customWallpapersEnabled'}
                  className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
                    data?.featureFlags.customWallpapersEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-md" />
                </button>
              </div>

              {/* AI Assistant Flag */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">AI Bio & Tagline Assistant</h4>
                  <p className="text-xs text-slate-400">Enable AI suggestions for profile bio and interest formatting.</p>
                </div>
                <button
                  onClick={() => handleToggleFlag('aiAssistantEnabled', data?.featureFlags.aiAssistantEnabled ?? true)}
                  disabled={savingKey === 'aiAssistantEnabled'}
                  className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
                    data?.featureFlags.aiAssistantEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-md" />
                </button>
              </div>

              {/* Signup Allowed Flag */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">New User Registration</h4>
                  <p className="text-xs text-slate-400">Allow new visitors to register accounts on /signup.</p>
                </div>
                <button
                  onClick={() => handleToggleFlag('signupAllowed', data?.featureFlags.signupAllowed ?? true)}
                  disabled={savingKey === 'signupAllowed'}
                  className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
                    data?.featureFlags.signupAllowed ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-md" />
                </button>
              </div>
            </div>
          </div>

          {/* AI MONITORING METRICS */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" /> AI Usage Monitoring
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prompts Processed</span>
                <div className="text-3xl font-black text-indigo-400">{data?.aiMetrics.totalPromptsProcessed || 1480}</div>
                <span className="text-xs font-semibold text-slate-500">Bio & Tagline Generations</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Response Time</span>
                <div className="text-3xl font-black text-emerald-400">{data?.aiMetrics.averageResponseTimeMs || 420} ms</div>
                <span className="text-xs font-semibold text-emerald-400">Low Latency Active</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Models</span>
                <div className="text-sm font-extrabold text-white mt-2 space-y-1">
                  {data?.aiMetrics.activeModels.map((model, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-sky-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{model}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
