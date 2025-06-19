
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Gift as GiftIcon, Banknote, Building } from "lucide-react"; // Added Banknote, Building
import FloralDivider from "@/components/floral-divider";

const GiftInformationSection: React.FC = () => {
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
            Your presence at our wedding is the greatest gift of all. We are so excited to celebrate with you!
            Should you wish to honour us with a gift as we start our new life together, we've gathered some information below. We are incredibly grateful for your love and support.
          </p>
        </motion.div>

        <FloralDivider className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card for Physical Gifts */}
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
                <p className="font-body text-sm text-muted-foreground mt-1">
                  For those who prefer physical tokens of love.
                </p>
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

          {/* Card for Monetary Gifts */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="flex"
          >
            <Card className="w-full shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card rounded-xl overflow-hidden flex flex-col border border-accent/20">
              <CardHeader className="bg-accent/5 p-6 text-center">
                <div className="mx-auto p-4 bg-accent/10 rounded-full w-fit mb-3 ring-2 ring-accent/20">
                  <GiftIcon className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="font-headline text-2xl text-accent-foreground">
                  Our Wishing Well
                </CardTitle>
                 <p className="font-body text-sm text-muted-foreground mt-1">
                  To help us build our future together.
                </p>
              </CardHeader>
              <CardContent className="p-6 text-center flex-grow flex flex-col justify-center">
                <p className="font-body text-base text-foreground mb-6">
                  For monetary contributions to our new life, you may use the following:
                </p>
                <div className="space-y-5 w-full">
                  {/* BCA */}
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 transition-all hover:shadow-md">
                    <div className="flex items-center justify-center mb-2">
                      <Building className="w-6 h-6 text-primary mr-2" />
                      <h4 className="font-headline text-lg text-primary-foreground">Bank BCA</h4>
                    </div>
                    <p className="font-body text-sm text-muted-foreground">
                      Account Holder: <span className="font-semibold text-foreground">Nico / Trio</span>
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      Account No: <span className="font-semibold text-foreground tracking-wider">123-456-7890</span>
                    </p>
                  </div>
                  {/* BNI */}
                  <div className="bg-accent/5 p-4 rounded-lg border border-accent/20 transition-all hover:shadow-md">
                     <div className="flex items-center justify-center mb-2">
                      <Banknote className="w-6 h-6 text-accent mr-2" />
                      <h4 className="font-headline text-lg text-accent-foreground">Bank BNI</h4>
                    </div>
                    <p className="font-body text-sm text-muted-foreground">
                      Account Holder: <span className="font-semibold text-foreground">Nico / Trio</span>
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      Account No: <span className="font-semibold text-foreground tracking-wider">098-765-4321</span>
                    </p>
                  </div>
                </div>
                <p className="font-body text-xs text-muted-foreground mt-6 italic">
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
