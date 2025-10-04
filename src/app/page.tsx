import { Hero } from '@/components/hero';
import { ExoplanetKnowledgeSection } from '@/components/exoplanet-knowledge-section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExoplanetForm } from '@/components/forms/user-form';
import { ScientistForm } from '@/components/forms/scientist-form';

export default function Home() {
  return (
    <div>
      <Hero />
      <ExoplanetKnowledgeSection />
      <div className="w-full py-12 sm:py-16 md:py-20 text-foreground bg-black px-4 sm:px-6 md:px-8 lg:px-20">
        <Tabs defaultValue="form" className="w-full">
          <div className="flex justify-center sm:justify-start  px-6">
            <TabsList>
              <TabsTrigger value="form">User</TabsTrigger>
              <TabsTrigger value="video">Scientist</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="form" className="w-full">
            <ExoplanetForm />
          </TabsContent>
          <TabsContent value="video" className="w-full">
            <ScientistForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
