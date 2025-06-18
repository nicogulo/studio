"use client";

import { useEffect } from "react";
import { useActionState } from "react"; // Corrected import
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { fetchAttireSuggestions, AttireSuggestionsState, AttireSuggestion } from "@/app/actions";
import { motion } from "framer-motion";
import { Sparkles, Search, Loader2 } from "lucide-react";

const initialState: AttireSuggestionsState = {
  success: false,
  suggestions: [],
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground rounded-full border border-accent-foreground/20 shadow-sm hover:shadow-md transition-all">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
      Get Ideas
    </Button>
  );
}

const AttireSuggestionsSection: React.FC = () => {
  const [state, formAction] = useActionState(fetchAttireSuggestions, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        title: "Attire Suggestion Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <section id="attire" className="py-20 md:py-32 bg-background"> {/* Increased padding */}
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-headline text-4xl md:text-5xl text-primary-foreground text-center mb-4"
        >
          Attire Inspiration
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="font-body text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          Our dress code is formal. Feel free to explore styles that make you feel elegant and celebratory!
          Need some ideas? Enter a style or keyword below.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <Card className="max-w-xl mx-auto shadow-xl bg-card rounded-lg mb-16"> {/* Increased margin-bottom */}
            <CardHeader className="pt-8"> {/* Adjusted padding */}
              <CardTitle className="font-headline text-2xl text-accent-foreground flex items-center">
                <Sparkles className="mr-2 h-6 w-6 text-accent" /> Find Your Look
              </CardTitle>
              <CardDescription className="font-body text-muted-foreground pt-1">
                E.g., "elegant cocktail dress", "summer formal suit", "pastel colors"
              </CardDescription>
            </CardHeader>
            <form action={formAction}>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="attire-query" className="font-body text-foreground">Style or Keyword</Label>
                  <Input id="attire-query" name="query" placeholder="Enter your preference..." className="font-body" />
                </div>
              </CardContent>
              <CardFooter className="pb-8"> {/* Adjusted padding */}
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>
        </motion.div>

        {state.query && state.success && state.suggestions && state.suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-12"
          >
            <h3 className="font-headline text-2xl text-primary-foreground text-center mb-8">
              Suggestions for "{state.query}"
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"> {/* Increased gap */}
              {state.suggestions.map((suggestion: AttireSuggestion) => (
                <Card key={suggestion.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card rounded-lg">
                  {suggestion.imageUrl && (
                    <div className="aspect-w-3 aspect-h-4">
                       <Image src={suggestion.imageUrl} alt={suggestion.name} width={300} height={400} className="object-cover w-full h-full rounded-t-lg" data-ai-hint={suggestion.dataAiHint || "fashion attire"} />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <h4 className="font-headline text-lg text-accent-foreground mb-1">{suggestion.name}</h4>
                    <p className="font-body text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                    {suggestion.storeUrl && (
                      <Button variant="link" asChild className="p-0 h-auto text-primary hover:text-primary/80 font-body">
                        <a href={suggestion.storeUrl} target="_blank" rel="noopener noreferrer">
                          View Example
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
        {state.query && state.success && (!state.suggestions || state.suggestions.length === 0) && (
           <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-body text-center text-muted-foreground mt-8"
           >
            {state.message || `No specific suggestions found for "${state.query}". Think elegant and celebratory!`}
           </motion.p>
        )}

      </div>
    </section>
  );
};

export default AttireSuggestionsSection;
