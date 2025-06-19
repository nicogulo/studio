
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Home, Gift as GiftIcon, ChevronDown, ChevronUp, Copy, Landmark } from "lucide-react";
import FloralDivider from "@/components/floral-divider";

interface BankDetail {
  key: string;
  name: string;
  accountHolder: string;
  accountNumber: string;
  icon?: React.ElementType;
}

const bankDetailsData: BankDetail[] = [
  {
    key: "bca",
    name: "BCA",
    accountHolder: "Nico Alfian Renaldy Gulo / Trio Mei Kristin Zendrato",
    accountNumber: "123-456-7890",
    icon: Landmark,
  },
  {
    key: "bni",
    name: "BNI",
    accountHolder: "Nico Alfian Renaldy Gulo / Trio Mei Kristin Zendrato",
    accountNumber: "098-765-4321",
    icon: Landmark,
  },
];


const GiftInformationSection: React.FC = () => {
  const { toast } = useToast();
  const [showBankDetails, setShowBankDetails] = useState(true);
  const [activeBankTab, setActiveBankTab] = useState<string>(bankDetailsData[0]?.key || "");

  const handleCopyToClipboard = async (text: string, bankName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard!",
        description: `${bankName} account number ${text} copied.`,
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Could not copy the account number. Please try again or copy manually.",
        variant: "destructive",
      });
      console.error("Failed to copy text: ", err);
    }
  };

  const currentBank = bankDetailsData.find(bank => bank.key === activeBankTab);

  return (
    <section id="gifts" className="py-16 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-4xl text-primary-foreground mb-4">
            A Note on Gifts
          </h2>
          <p className="font-body text-base text-foreground max-w-xl mx-auto leading-relaxed">
            Your presence at our wedding is the greatest gift of all.
            Should you wish to honour us with a gift as we start our new life together, we've gathered some information below. We are incredibly grateful for your love and support.
          </p>
        </motion.div>

        <FloralDivider className="mb-12" />

        <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex"
          >
            <Card className="w-full shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card rounded-xl overflow-hidden flex flex-col border border-primary/20">
              <CardHeader className="bg-primary/5 p-6 text-center">
                <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit mb-3 ring-2 ring-primary/20">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-primary-foreground">
                  Sending a Gift
                </CardTitle>
                <CardDescription className="font-body text-sm text-muted-foreground mt-1">
                  For those who prefer physical tokens of love.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 text-center flex-grow flex flex-col justify-center items-center">
                <p className="font-body text-base text-foreground mb-4">
                  If you'd like to send a physical gift, please use our home address:
                </p>
                <div className="font-body text-md text-accent-foreground bg-secondary/10 p-4 rounded-lg border border-secondary/30 w-full max-w-xs">
                  Nico & Trio<br />
                  Jl. Kebahagiaan Abadi No. 1<br />
                  Kota Kasih, Provinsi Cinta 12345<br />
                  Indonesia
                </div>
                <p className="font-body text-xs text-muted-foreground mt-4 italic">
                  Your thoughtfulness is deeply appreciated!
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="flex"
          >
            <Card className="w-full shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card rounded-xl overflow-hidden flex flex-col border border-accent/20">
              <CardHeader className="bg-primary/5 p-6 text-center">
                <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit mb-3 ring-2 ring-primary/20">
                  <GiftIcon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-primary-foreground">
                  Wedding Gift
                </CardTitle>
                <CardDescription className="font-body text-sm text-muted-foreground mt-1">
                  For monetary contributions to our new life together.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 text-center flex-grow flex flex-col">
                <p className="font-body text-base text-foreground mb-6 leading-relaxed">
                  Without diminishing our respect, for guests who wish to give a gift, we are very grateful.
                  We also accept gifts in the form of cash. Gifts can be sent through the following accounts:
                </p>

                <Button
                  variant="outline"
                  onClick={() => setShowBankDetails(!showBankDetails)}
                  className="w-full max-w-xs mx-auto mb-6 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
                  aria-expanded={showBankDetails}
                >
                  {showBankDetails ? <ChevronUp className="mr-2 h-4 w-4" /> : <GiftIcon className="mr-2 h-4 w-4" />}
                  {showBankDetails ? "Hide Bank Details" : "Show Bank Details"}
                </Button>

                <AnimatePresence initial={false}>
                  {showBankDetails && currentBank && (
                    <motion.div
                      key="bank-details-content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex justify-center gap-2 mb-6">
                        {bankDetailsData.map((bank) => (
                          <Button
                            key={bank.key}
                            variant={activeBankTab === bank.key ? "default" : "outline"}
                            onClick={() => setActiveBankTab(bank.key)}
                            className={`
                              rounded-md px-4 py-2 text-sm font-medium transition-colors
                              ${activeBankTab === bank.key 
                                ? 'bg-primary text-primary-foreground border-primary' 
                                : 'bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground'}
                            `}
                          >
                            {bank.icon && <bank.icon className="mr-2 h-4 w-4" />}
                            {bank.name}
                          </Button>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeBankTab}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="bg-secondary/10 p-6 rounded-lg border border-secondary/30 text-left space-y-3 mb-6"
                        >
                          <p className="font-headline text-xl text-primary-foreground text-center mb-3">{currentBank.name}</p>
                          <div>
                            <p className="font-body text-sm text-muted-foreground">Account Holder:</p>
                            <p className="font-body text-md text-foreground font-semibold">{currentBank.accountHolder}</p>
                          </div>
                          <div>
                            <p className="font-body text-sm text-muted-foreground">Account Number:</p>
                            <p className="font-body text-md text-foreground font-semibold tracking-wider">{currentBank.accountNumber}</p>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      <Button
                        onClick={() => handleCopyToClipboard(currentBank.accountNumber, currentBank.name)}
                        className="w-full max-w-xs mx-auto bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Account Number
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                 <p className="font-body text-xs text-muted-foreground mt-8 italic">
                  Thank you for your incredible generosity and support!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiftInformationSection;

