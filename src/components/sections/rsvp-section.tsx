
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
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
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
    }
  }, [state, toast]);
  
  return (
    <section id="rsvp" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="font-headline text-4xl md:text-5xl text-primary-foreground text-center mb-12"
        >
          Will You Be Joining Us?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-2xl mx-auto shadow-xl bg-card">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-primary-foreground">Share Your Response</CardTitle>
              <CardDescription className="font-body text-muted-foreground">
                Please let us know if you can make it by November 20, 2025.
              </CardDescription>
            </CardHeader>
            <form action={formAction}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="font-body text-foreground">Full Name</Label>
                  <Input id="fullName" name="fullName" placeholder="Your full name" required className="font-body"/>
                  {state.errors?.fullName && <p className="text-sm text-destructive">{state.errors.fullName.join(", ")}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="font-body text-foreground">Are you attending?</Label>
                  <RadioGroup name="attending" defaultValue="yes" className="flex space-x-4 font-body">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="attending-yes" />
                      <Label htmlFor="attending-yes">Yes, with pleasure!</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="attending-no" />
                      <Label htmlFor="attending-no">No, with regrets</Label>
                    </div>
                  </RadioGroup>
                  {state.errors?.attending && <p className="text-sm text-destructive">{state.errors.attending.join(", ")}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-body text-foreground">Message / Wishes (Optional)</Label>
                  <Textarea id="message" name="message" placeholder="Leave a message for the couple..." rows={4} className="font-body"/>
                  {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message.join(", ")}</p>}
                </div>
                {state.errors?._form && <p className="text-sm text-destructive">{state.errors._form.join(", ")}</p>}
              </CardContent>
              <CardFooter>
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
