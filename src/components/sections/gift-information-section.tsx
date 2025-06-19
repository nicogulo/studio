
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Landmark } from "lucide-react";

const GiftInformationSection: React.FC = () => {
  return (
    <section id="gifts" className="py-16 bg-secondary/10">
      <div className="px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-headline text-3xl text-primary-foreground text-center mb-6"
        >
          Wedding Gifts
        </motion.h2>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="font-body text-base text-foreground text-center mb-10 max-w-xl mx-auto leading-relaxed"
        >
            Your presence at our wedding is the greatest gift of all. However, should you wish to honour us with a gift, we have gathered some information below. We are incredibly grateful for your love and support.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
                <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card rounded-lg flex flex-col">
                    <CardHeader className="items-center pt-6 pb-3">
                        <div className="p-3 bg-primary/10 rounded-full mb-3">
                            <Home className="w-7 h-7 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-xl text-primary-foreground">Gift Address</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6 text-center flex-grow flex flex-col justify-center">
                        <p className="font-body text-base text-foreground mb-2">
                            For those who wish to send a physical gift, please use the following address:
                        </p>
                        <p className="font-body text-sm text-muted-foreground mt-1">
                            Nico & Trio<br />
                            Jl. Kebahagiaan Abadi No. 1<br />
                            Kota Kasih, Provinsi Cinta 12345<br />
                            Indonesia
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
                <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card rounded-lg flex flex-col">
                    <CardHeader className="items-center pt-6 pb-3">
                        <div className="p-3 bg-primary/10 rounded-full mb-3">
                            <Landmark className="w-7 h-7 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-xl text-primary-foreground">Monetary Gifts</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6 text-center flex-grow flex flex-col justify-center">
                        <p className="font-body text-base text-foreground mb-3">
                            For monetary gifts, you may use the following bank accounts:
                        </p>
                        <div className="space-y-4">
                            <div>
                                <p className="font-body text-md font-semibold text-accent-foreground">Bank BCA</p>
                                <p className="font-body text-sm text-muted-foreground">Account No: 123-456-7890</p>
                                <p className="font-body text-sm text-muted-foreground">On behalf of: Nico / Trio</p>
                            </div>
                            <div>
                                <p className="font-body text-md font-semibold text-accent-foreground">Bank BNI</p>
                                <p className="font-body text-sm text-muted-foreground">Account No: 098-765-4321</p>
                                <p className="font-body text-sm text-muted-foreground">On behalf of: Nico / Trio</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiftInformationSection;
