
"use client";

import { useEffect, useState, useActionState, startTransition, useRef, useCallback } from "react";
// import { useFormStatus } from "react-dom"; // No longer needed directly in RsvpSection for submit button
import { Timestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { handleRsvpSubmit, RsvpFormState, fetchRsvps, FormattedSubmittedRsvpData, FetchRsvpsResult } from "@/app/actions";
import { motion } from "framer-motion";
import { Send, Loader2, ListChecks, Info, CheckCircle, XCircle, RefreshCw } from "lucide-react";

const initialRsvpFormState: RsvpFormState = {
  success: false,
  message: "",
};

const PAGE_SIZE = 5;

interface SubmitButtonProps {
  isPending: boolean;
}

function SubmitButton({ isPending }: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={isPending} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground rounded-full border border-primary-foreground/20 shadow-sm hover:shadow-md transition-all text-sm">
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Send RSVP
    </Button>
  );
}

const RsvpSection: React.FC = () => {
  const [formState, formAction, isFormPending] = useActionState(handleRsvpSubmit, initialRsvpFormState);
  const { toast } = useToast();

  const [rsvps, setRsvps] = useState<FormattedSubmittedRsvpData[]>([]);
  const [lastFetchedDocTimestamp, setLastFetchedDocTimestamp] = useState<Timestamp | null>(null);
  const [hasMoreRsvps, setHasMoreRsvps] = useState(true);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadRsvps = useCallback(async (isLoadMore = false) => {
    if (isLoadMore) {
      if (!hasMoreRsvps || isLoadingMore) return;
      setIsLoadingMore(true);
    } else {
      setIsLoadingInitial(true);
      setRsvps([]);
      setLastFetchedDocTimestamp(null);
      setHasMoreRsvps(true);
    }
    setFetchError(null);

    try {
      const result: FetchRsvpsResult = await fetchRsvps(isLoadMore ? lastFetchedDocTimestamp : null, PAGE_SIZE);
      if (result.success && result.rsvps) {
        setRsvps(prevRsvps => isLoadMore ? [...prevRsvps, ...result.rsvps!] : result.rsvps!);
        if (result.lastDocTimestampForPagination) {
            const { seconds, nanoseconds } = result.lastDocTimestampForPagination;
            setLastFetchedDocTimestamp(new Timestamp(seconds, nanoseconds));
        } else {
            setLastFetchedDocTimestamp(null);
        }
        setHasMoreRsvps(result.hasMore);
      } else {
        setFetchError(result.error || "Failed to load RSVPs.");
        toast({
          title: "Error Loading Responses",
          description: result.error || "Could not fetch submitted RSVPs.",
          variant: "destructive",
        });
      }
    } catch (e) {
        const error = e as Error;
        setFetchError(error.message || "An unexpected error occurred while fetching RSVPs.");
        toast({
          title: "Error Loading Responses",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
    } finally {
        if (isLoadMore) {
          setIsLoadingMore(false);
        } else {
          setIsLoadingInitial(false);
        }
    }
  }, [lastFetchedDocTimestamp, hasMoreRsvps, isLoadingMore, toast]);


  useEffect(() => {
    startTransition(() => {
      loadRsvps(false); // Initial load
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // loadRsvps is memoized, but initial load should only run once.

  // Effect for handling form submission feedback (toasts and data refresh)
  useEffect(() => {
    if (formState.success) {
      toast({
        title: "RSVP Submitted!",
        description: formState.message,
        variant: "default",
      });
      startTransition(() => {
        loadRsvps(false); // Refresh the list from the beginning
      });
    } else if (formState.message && (formState.errors || formState.message.startsWith("An error occurred"))) {
       toast({
        title: "Oops!",
        description: formState.message,
        variant: "destructive",
      });
    }
    // This effect should run when `formState` (the object from useActionState) changes,
    // or when `toast` changes (which is unlikely but good practice to include).
    // `loadRsvps` is called as a side effect but should not be a dependency causing this effect to re-run
    // if only `loadRsvps` reference changes due to its own internal state updates.
    // The primary trigger here is the change in `formState` indicating a new submission result.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, toast]); // Removed loadRsvps from dependency array to break loop

  useEffect(() => {
    const currentSentinel = sentinelRef.current;
    if (!currentSentinel) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMoreRsvps && !isLoadingMore && !isLoadingInitial) {
          startTransition(() => {
            loadRsvps(true);
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentSentinel);
    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMoreRsvps, isLoadingMore, isLoadingInitial, loadRsvps]);

  return (
    <section id="rsvp" className="py-16 bg-secondary/20">
      <div className="px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-headline text-3xl text-primary-foreground text-center mb-10"
        >
          Will You Be Joining Us?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <Card className="max-w-lg mx-auto shadow-xl bg-card rounded-lg">
            <CardHeader className="pt-6">
              <CardTitle className="font-headline text-2xl text-primary-foreground">Share Your Response</CardTitle>
              <CardDescription className="font-body text-sm text-muted-foreground pt-1">
                Please let us know if you can make it by November 20, 2025.
              </CardDescription>
            </CardHeader>
            <form action={formAction} key={formState.success ? Date.now().toString() : 'form-initial'}>
              <CardContent className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="font-body text-sm text-foreground">Full Name</Label>
                  <Input id="fullName" name="fullName" placeholder="Your full name" required className="font-body"/>
                  {formState.errors?.fullName && <p className="text-xs text-destructive font-body pt-1">{formState.errors.fullName.join(", ")}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="font-body text-sm text-foreground">Are you attending?</Label>
                  <RadioGroup name="attending" defaultValue="yes" className="flex flex-col space-y-2 font-body text-sm pt-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="attending-yes" />
                      <Label htmlFor="attending-yes" className="font-normal">Yes, with pleasure!</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="attending-no" />
                      <Label htmlFor="attending-no" className="font-normal">No, with regrets</Label>
                    </div>
                  </RadioGroup>
                  {formState.errors?.attending && <p className="text-xs text-destructive font-body pt-1">{formState.errors.attending.join(", ")}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="font-body text-sm text-foreground">Message / Wishes (Optional)</Label>
                  <Textarea id="message" name="message" placeholder="Leave a message for the couple..." rows={3} className="font-body"/>
                  {formState.errors?.message && <p className="text-xs text-destructive font-body pt-1">{formState.errors.message.join(", ")}</p>}
                </div>
                {formState.errors?._form && <p className="text-xs text-destructive font-body pt-1">{formState.errors._form.join(", ")}</p>}
              </CardContent>
              <CardFooter className="pb-6">
                <SubmitButton isPending={isFormPending} />
              </CardFooter>
            </form>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="max-w-lg mx-auto mt-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-2xl text-primary-foreground flex items-center">
              <ListChecks className="mr-3 h-6 w-6 text-primary" />
              Submitted Responses
            </h3>
            <Button variant="outline" size="sm" onClick={() => loadRsvps(false)} disabled={isLoadingInitial || isLoadingMore} className="rounded-full">
              <RefreshCw className={`h-4 w-4 ${(isLoadingInitial && !isLoadingMore) ? 'animate-spin' : ''}`} />
              <span className="ml-2 sr-only sm:not-sr-only">Refresh</span>
            </Button>
          </div>

          {isLoadingInitial && rsvps.length === 0 && (
            <div className="space-y-3">
              {[1, 2].map(i => (
                <Card key={i} className="p-4 bg-card rounded-lg shadow animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                </Card>
              ))}
            </div>
          )}
          {!isLoadingInitial && fetchError && (
             <Alert variant="destructive" className="bg-destructive/10 border-destructive/50">
              <Info className="h-4 w-4 text-destructive" />
              <AlertTitle>Error Loading Responses</AlertTitle>
              <AlertDescription>
                {fetchError}
              </AlertDescription>
            </Alert>
          )}
          {!isLoadingInitial && !fetchError && rsvps.length === 0 && (
            <Card className="p-6 bg-card rounded-lg shadow">
              <p className="text-center text-muted-foreground font-body">No RSVPs submitted yet. Be the first!</p>
            </Card>
          )}

          {rsvps.length > 0 && (
            <div className="space-y-4">
              {rsvps.map((rsvp) => (
                <Card key={rsvp.id} className="p-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0 mb-2 flex flex-row justify-between items-start">
                    <CardTitle className="font-headline text-lg text-accent-foreground">{rsvp.fullName}</CardTitle>
                    {rsvp.attending === "yes" ? (
                       <span className="text-xs font-medium inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-300">
                         <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-green-600" /> Attending
                       </span>
                    ) : (
                      <span className="text-xs font-medium inline-flex items-center px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-300">
                        <XCircle className="w-3.5 h-3.5 mr-1.5 text-red-600" /> Not Attending
                      </span>
                    )}
                  </CardHeader>
                  <CardContent className="p-0">
                    {rsvp.message && (
                      <p className="font-body text-sm text-foreground italic mb-1">"{rsvp.message}"</p>
                    )}
                    <p className="font-body text-xs text-muted-foreground">Submitted: {rsvp.submittedAtFormatted}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div ref={sentinelRef} className="h-10" />

          {isLoadingMore && (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
              <p className="ml-2 font-body text-muted-foreground">Loading more...</p>
            </div>
          )}

          {!isLoadingInitial && !isLoadingMore && !hasMoreRsvps && rsvps.length > 0 && (
            <p className="text-center font-body text-sm text-muted-foreground py-4">No more responses to show.</p>
          )}

        </motion.div>

      </div>
    </section>
  );
};

export default RsvpSection;
