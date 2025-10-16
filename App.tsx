
import React, { useState, useCallback, useEffect } from 'react';
import { Entry, Insight, Goal, Pathway, Sentiment } from './types';
import Header from './components/Header';
import InputForm from './components/InputForm';
import TapestryView from './components/TapestryView';
import InsightCard from './components/InsightCard';
import PathwaysPlanner from './components/PathwaysPlanner';
import EntryModal from './components/EntryModal';
import { analyzeEntry, generateInsights, generatePathway } from './services/geminiService';

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [insights, setInsights] = useState<Insight | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const addEntry = useCallback(async (content: string) => {
    setIsLoading(true);
    try {
      const { sentiment, themes } = await analyzeEntry(content);
      const newEntry: Entry = {
        id: Date.now(),
        date: new Date(),
        content,
        sentiment,
        themes,
        position: {
          x: Math.random() * 85 + 5, // % from left
          y: Math.random() * 85 + 5, // % from top
        },
      };
      setEntries(prevEntries => [...prevEntries, newEntry]);
    } catch (error) {
      console.error("Failed to add entry:", error);
      // Add a fallback entry if AI fails
      const fallbackEntry: Entry = {
        id: Date.now(),
        date: new Date(),
        content,
        sentiment: Sentiment.NEUTRAL,
        themes: ['General'],
         position: {
          x: Math.random() * 85 + 5,
          y: Math.random() * 85 + 5,
        },
      };
      setEntries(prevEntries => [...prevEntries, fallbackEntry]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSetGoal = useCallback(async (goalTitle: string) => {
    setIsLoading(true);
    try {
      const pathway = await generatePathway(goalTitle, entries);
      setGoal({ title: goalTitle, pathway });
    } catch (error) {
      console.error("Failed to generate pathway:", error);
    } finally {
      setIsLoading(false);
    }
  }, [entries]);

  useEffect(() => {
    const fetchInsights = async () => {
      if (entries.length > 2) {
        setIsLoading(true);
        try {
          const newInsights = await generateInsights(entries);
          setInsights(newInsights);
        } catch (error) {
          console.error("Failed to generate insights:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchInsights();
  }, [entries]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <InputForm onAddEntry={addEntry} isLoading={isLoading} />
          <div className="relative h-[600px] bg-gray-800/50 border border-purple-500/20 rounded-lg p-4 shadow-2xl shadow-purple-900/20">
            <TapestryView entries={entries} onSelectEntry={setSelectedEntry} />
             {isLoading && <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
                <span className="ml-4 font-serif text-lg">The Weaver is at work...</span>
            </div>}
          </div>
        </div>
        <div className="lg:col-span-1 space-y-8">
          {insights && <InsightCard insight={insights} />}
          <PathwaysPlanner onSetGoal={handleSetGoal} goal={goal} isLoading={isLoading} />
        </div>
      </main>
      {selectedEntry && (
        <EntryModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      )}
    </div>
  );
};

export default App;
