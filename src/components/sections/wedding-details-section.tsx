"use client";

import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FloralDivider from "@/components/floral-divider";

const WeddingDetailsSection: React.FC = () => {
  const details = [
    {
      icon: <CalendarDays className="w-8 h-8 text-primary" />,
      title: "Date & Time",
      text: "Saturday, December 20, 2025",
      subtext: "Ceremony at 2:00 PM, Reception to follow",
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Venue",
      text: "The Grand Ballroom",
      subtext: "123 Celebration Lane, Joyville, CA 90210",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Dress Code",
      text: "Formal Attire / Black-Tie Optional",
      subtext: "Embrace the elegance of the evening!",
    },
  ];

  return (
    <section id="details" className="py-20 md:py-32 bg-background"> {/* Increased padding */}
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-headline text-4xl md:text-5xl text-primary-foreground text-center mb-16" // Increased margin-bottom
        >
          Wedding Details
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16"> {/* Increased margin-bottom */}
          {details.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 * index, ease: "easeOut" }}
            >
              <Card className="h-full text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card rounded-lg">
                <CardHeader className="items-center pt-8 pb-4"> {/* Adjusted padding */}
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="font-headline text-2xl text-primary-foreground">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-8"> {/* Adjusted padding */}
                  <p className="font-body text-lg text-foreground">{item.text}</p>
                  {item.subtext && <p className="font-body text-sm text-muted-foreground mt-1">{item.subtext}</p>}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mb-16" // Increased margin-bottom
        >
          <Card className="shadow-lg overflow-hidden bg-card rounded-lg">
            <CardHeader className="pt-8"> {/* Adjusted padding */}
              <CardTitle className="font-headline text-2xl text-primary-foreground text-center">Location Map</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-4"> {/* Adjusted padding for map responsiveness */}
            <div className="aspect-w-16 aspect-h-9"> {/* Maintain aspect ratio for map */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322223!2d106.8195613!3d-6.1947413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4289bad4bad%3A0x112f08550fad31f0!2sMonumen%20Nasional!5e0!3m2!1sen!2sid!4v1620808228782!5m2!1sen!2sid"
                width="100%"
                height="100%" /* Adjusted for aspect ratio div */
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Map"
                className="rounded-md w-full h-full"
              ></iframe>
            </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <FloralDivider className="my-12" /> {/* Adjusted margin */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="font-headline text-3xl text-primary-foreground text-center"
        >
          We can&rsquo;t wait to celebrate with you!
        </motion.p>
      </div>
    </section>
  );
};

export default WeddingDetailsSection;
