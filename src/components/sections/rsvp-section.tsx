
"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { handleRsvpSubmit, RsvpFormState } from "@/app/actions";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

const initialState: RsvpFormState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground rounded-full border border-primary-foreground/20 shadow-sm hover:shadow-md transition-all text-sm">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Send RSVP
    </Button>
  );
}

const RsvpSection: React.FC = () => {
  const [state, formAction] = useActionState(handleRsvpSubmit, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "RSVP Submitted!" : "Oops!",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      // Consider resetting form here if state.success is true and form is part of this component's state
    }
  }, [state, toast]);
  
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
          <Card className="max-w-lg mx-auto shadow-xl bg-card rounded-lg"> {/* max-w-lg is fine for mobile frame */}
            <CardHeader className="pt-6">
              <CardTitle className="font-headline text-2xl text-primary-foreground">Share Your Response</CardTitle>
              <CardDescription className="font-body text-sm text-muted-foreground pt-1">
                Please let us know if you can make it by November 20, 2025.
              </CardDescription>
            </CardHeader>
            <form action={formAction} key={state.success ? 'form-reset' : 'form-initial'}> {/* Add key to reset form on success */}
              <CardContent className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="font-body text-sm text-foreground">Full Name</Label>
                  <Input id="fullName" name="fullName" placeholder="Your full name" required className="font-body"/>
                  {state.errors?.fullName && <p className="text-xs text-destructive font-body">{state.errors.fullName.join(", ")}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="font-body text-sm text-foreground">Are you attending?</Label>
                  <RadioGroup name="attending" defaultValue="yes" className="flex flex-col space-y-2 font-body text-sm">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="attending-yes" />
                      <Label htmlFor="attending-yes" className="font-normal">Yes, with pleasure!</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="attending-no" />
                      <Label htmlFor="attending-no" className="font-normal">No, with regrets</Label>
                    </div>
                  </RadioGroup>
                  {state.errors?.attending && <p className="text-xs text-destructive font-body">{state.errors.attending.join(", ")}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="font-body text-sm text-foreground">Message / Wishes (Optional)</Label>
                  <Textarea id="message" name="message" placeholder="Leave a message for the couple..." rows={3} className="font-body"/>
                  {state.errors?.message && <p className="text-xs text-destructive font-body">{state.errors.message.join(", ")}</p>}
                </div>
                {state.errors?._form && <p className="text-xs text-destructive font-body">{state.errors._form.join(", ")}</p>}
              </CardContent>
              <CardFooter className="pb-6">
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default RsvpSection;
